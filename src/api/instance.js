import axios from 'axios'

const instance = axios.create({ baseURL: "https://recruitment.dev.rollingglory.com/api/v2"});

export default instance 