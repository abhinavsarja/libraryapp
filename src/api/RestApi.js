import axios from 'axios';

export default class restApi {
    static request(url, method, data, responseType) {
        return axios({
            method: method || 'POST',
            responseType: responseType || null,
            url,
            data,
            withCredentials: false,
        }).then((response) => this.handleResponse(response))
          .catch((error) => { return this.handleServerError(error);
        });
    }

    static handleResponse(response) {
        return response.data;
    }

    static handleServerError(error) {
        //Error can be handled in different ways depending on the returned http code.
        // For simplicity just returning the json to identify its an error.
        console.log(error);
        return { status: "error" };
    }
}