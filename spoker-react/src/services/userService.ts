import {request} from '@/utils/request';
export function fetch(url) {
    return request('/user', {});
}

export function whoAmI() {
    return request('/users/whoAmI', {});
}