const IS_PRODUCTION_ENV: boolean = process.env.NODE_ENV === 'production';
export const hostUrl = IS_PRODUCTION_ENV ? '' : 'https://localhost:8111';