import Joi, { Schema } from 'joi';
import { get, map } from 'lodash';
import { IConfiguration, IValidate } from './interfaces';

// Define the schema for the environment variables
const envVarsSchema: Schema = Joi.object({
  VITE_API_URL: Joi.string().required().description('Base url of the API'),
}).unknown();

// Validate and extract environment variables
const { value: envVars, error } = envVarsSchema.validate(import.meta.env, {
  errors: { label: 'key' },
}) as IValidate;

// Throw an error if validation fails
if (error) {
  const errorMessage: string = map(get(error, 'details'), 'message').join(', ');

  throw new Error(`Config validation error: ${errorMessage}`);
}

// Build the configuration object
const appConfiguration: IConfiguration = {
  baseUrl: get(envVars, 'VITE_API_URL'),
};

export default appConfiguration;
