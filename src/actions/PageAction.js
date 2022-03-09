import RestApi from './../api/RestApi';
import { urls } from '../utils/Constants';

class PageAction {
    
    static loadDataFromApi(invalid) {
        let url = invalid ? urls.errorUrl : urls.validUrl;
        const res = RestApi.request(url, "GET", null)
            .then((response) => response ? response : []);
        return res;
    }
}

export default PageAction;