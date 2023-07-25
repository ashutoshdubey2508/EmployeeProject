import axios from 'axios';

export function registermanager(){
    return axios.post('')
    .then(response => response.data )
}