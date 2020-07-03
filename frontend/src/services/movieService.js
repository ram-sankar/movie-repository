import http from './httpService';

const url = '/movies'

export function getMovies(){
    return http.get(url);
}

export function getMovie(id){
    return http.get(url + '/' + id);
}

export function editMovie(param){
    const data = { ...param }
    delete data._id
    return http.put(url + '/' + param._id, data)
}

export function addMovie(param){
    const data = { ...param }
    delete data._id
    return http.post(url, data)
}

export function deleteMovies(id){
    return http.delete(url+'/'+id)
}