

const IS_PRODUCTION_ENV: boolean = process.env.NODE_ENV === 'production';

export const PAGE_SIZE = 8;

export const DASHBOARD_PAGE_SIZE = 20;

export const ROOM_PAGE_SIZE = 10;

export const hostUrl = IS_PRODUCTION_ENV ? '' : 'http://localhost:8111';
export const API_ROOT = "/sprint/api"



