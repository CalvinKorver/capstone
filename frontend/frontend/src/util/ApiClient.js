// file: src/util/ApiClient.js
import axios from 'axios';
import store from '../store';
import * as utils from './Functions';

export const apiClient = function() {
        const token = store.getState().token;
        const params = {
            baseURL: utils.globalURL,
            headers: {'Authorization': 'Token ' + token}
        };
        return axios.create(params);
}