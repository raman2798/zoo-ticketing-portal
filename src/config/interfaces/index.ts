import { ValidationError } from 'joi';

export interface IValidate {
  value: IEnvVars;
  error: ValidationError;
}

export interface IEnvVars {
  VITE_API_URL: string;
}

export interface IConfiguration {
  baseUrl: string;
}
