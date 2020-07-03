import http from './httpService'

const url = '/users'

export async function registerUser(data){
    delete data.phone
    return await http.post(url, data)
}