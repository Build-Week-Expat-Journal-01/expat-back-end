const authValidation = require('../middleware/authValidation');

describe("validate user request body", () => {
  it("username and password are missing", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { username: 'paulsmith' };
    expect(authValidation.validateReq(req, null, next)).toEqual({
      status: 'fail',
      statusCode: 400,
      message: 'username or password field is missing.'
    });
  });

  it("username is more than 128 characters", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    const username = Array(130).join('x');
    req.body = { username, password: '12345678' };
    expect(authValidation.validateReq(req, null, next)).toEqual({
      status: 'fail',
      statusCode: 400,
      message: 'Username is NO more than 128 characters.'
    });
  });

  it("there both username and password fields", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { username: 'paulsmith', password: '12345678' };
    expect(authValidation.validateReq(req, null, next)).toBe('valid');
  });
});