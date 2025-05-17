import {HttpUtils} from "../utils/http-utils";

export class FreelancersService {
    static async getFreelancers() {
        const returnObject = {
            error: false,
            redirect: null,
            freelancers: null
        };

        const result = await HttpUtils.request('/freelancers');
        if (result.redirect || result.error || !result.response || (!result.response.freelancers && result.response.error)) {
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            returnObject.error = 'Возникла ошибка при запросе списка фрилансеров. Обратитесь в поддержку.';
            return returnObject;
        }

        returnObject.freelancers = result.response.freelancers;
        return returnObject;
    }

    static async createFreelancer(data) {
        const result = await HttpUtils.request('/freelancers', "POST", true, data);
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при добавлении фрилансера. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteFreelancer(id) {
        const result = await HttpUtils.request('/freelancers/' + id, "DELETE", true);
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при удалении фрилансера. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        return returnObject;
    }

    static async updateFreelancer(id, data) {
        const result = await HttpUtils.request('/freelancers/' + id, "PUT",
            true, data);
        const returnObject = {
            error: false,
            redirect: null
        };
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании фрилансера. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        return returnObject;
    }

    static async getFreelancer(id) {
        const returnObject = {
            error: false,
            redirect: null,
            freelancer: null
        };

        const result = await HttpUtils.request('/freelancers/' + id);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            returnObject.error = 'Возникла ошибка при запросе фрилансера. Обратитесь в поддержку.';
            return returnObject;
        }

        returnObject.freelancer = result.response;
        return returnObject;
    }
}