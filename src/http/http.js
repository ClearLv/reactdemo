import axios from 'axios'
// import axios from './myAxios'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
export const login = (data) => {
    return axios.get('/api/login' , {params : data})
}

export const getAllBookInfo = () => {
    return axios.get('/api/getAllBook')
}
