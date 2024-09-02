import axios from 'axios';
import output from '../../../shared/output.json';

export const api = axios.create({
    baseURL: output['SecureVault-ApiStack'].RestApiEndpoint0551178A,
});
