import Joi from "joi";
import objectId from "joi-objectid";

export default function setupJoi() {
  Joi.objectId = objectId(Joi);
}
