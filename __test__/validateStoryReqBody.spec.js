const storyValidation = require('../middleware/storyValidation');

describe("validate story request body", () => {
  it("content, title and teaser are missing.", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { title: 'Story 01' };
    expect(storyValidation.validateReq(req, null, next)).toEqual({
      status: "fail",
      statusCode: 400,
      message: "Story fields are missing or invalid."
    });
  });

  it("there both username and password fields", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { title: 'story 01', teaser: 'teaser 01', content: 'content 01' };
    expect(storyValidation.validateReq(req, null, next)).toBe('valid');
  });
});