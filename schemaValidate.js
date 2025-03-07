const joi = require("joi");

const schema = joi.object({
  name: joi.string().min(2).max(100).required(),
  address: joi.string().min(2).max(100).required(),
  latitude: joi.number().required(),
  longitude: joi.number().required(),
});

module.exports = schema;
