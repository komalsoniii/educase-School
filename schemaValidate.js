const joi = require("joi");

const schema = joi.object({
  name: joi.string().alphanum().min(2).max(20).required(),
  address: joi.string().alphanum().min(2).max(100).required(),
  latitude: joi.number().required(),
  longitude: joi.number().required(),
});

module.exports = schema;
