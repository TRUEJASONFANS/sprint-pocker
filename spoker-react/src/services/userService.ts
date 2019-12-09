import {request} from '@/utils/request';
export function fetch(url) {
    return request('api/user', {});
}

export function whoAmI() {
    return request('/api/users/whoAmI', {});
}