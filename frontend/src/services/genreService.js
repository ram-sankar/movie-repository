import http from './httpService';

const url = '/genres'

export function getGenres(){
    return http.get(url);
}