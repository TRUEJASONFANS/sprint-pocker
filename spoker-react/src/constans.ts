import api from 'mock/api';

const IS_PRODUCTION_ENV: boolean = process.env.NODE_ENV === 'production';
export const hostUrl = IS_PRODUCTION_ENV ? '' : 'http://localhost:8111';
export const API_ROOT = "/sprint/api"