import axios from 'axios';
import store from '../../store'

axios.interceptors.request.use(function (config) {
    config.headers.common['system'] = 'S11SU01';
    config.headers.common['token'] = store.state.hasToken;
    if (store.state.hasToken.length > 0) {}
    return config;
    }, function (err) {
    return Promise.reject(err);
});

export default axios;