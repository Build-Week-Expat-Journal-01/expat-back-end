const storyValidation = require('../middleware/storyValidation');

describe("validate story request body", () => {
  it("image_url and desc are missing.", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { image_url: 'Story 01' };
    expect(storyValidation.validatePhotoReq(req, null, next)).toEqual({
      status: "fail",
      statusCode: 400,
      message: "Photo fields are missing or invalid."
    });
  });

  it("there are all requirement fields", () => {
    const next = (obj) => {
      if (obj) { 
        return obj 
      } else { return 'valid' }
    };
    let req = {};
    req.body = { image_url: 'image 01', desc: 'desc 01' };
    expect(storyValidation.validatePhotoReq(req, null, next)).toBe('valid');
  });
});