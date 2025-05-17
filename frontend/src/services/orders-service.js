import {HttpUtils} from "../utils/http-utils";

export class OrdersService {
    static async getOrders() {
        const returnObject = {
            error: false,
            redirect: null,
            orders: null
        };

        const result = await HttpUtils.request('/orders');
        if (result.redirect || result.error || !result.response || (!result.response.orders && result.response.error)) {
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            returnObject.error = 'Возникла ошибка при запросе списка заказов. Обратитесь в поддержку.';
            return returnObject;
        }

        returnObject.orders = result.response.orders;
        return returnObject;
    }

    static async createOrder(data) {
        const result = await HttpUtils.request('/orders', "POST", true, data);
        const returnObject = {
            error: false,
            redirect: null,
            id: null
        };
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при добавлении заказа. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        returnObject.id = result.response.id;
        return returnObject;
    }

    static async deleteOrder(id) {
        const result = await HttpUtils.request('/orders/' + id, "DELETE", true);
        const returnObject = {
            error: false,
            redirect: null
        };

        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при удалении заказа. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }
        return returnObject;
    }

    static async updateOrder(id, data) {
        const result = await HttpUtils.request('/orders/' + id, "PUT",
            true, data);
        const returnObject = {
            error: false,
            redirect: null
        };
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            returnObject.error = 'Возникла ошибка при редактировании заказа. Обратитесь в поддержку.';
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            return returnObject;
        }

        return returnObject;
    }

    static async getOrder(id) {
        const returnObject = {
            error: false,
            redirect: null,
            order: null
        };

        const result = await HttpUtils.request('/orders/' + id);
        if (result.redirect || result.error || !result.response || (result.response && result.response.error)) {
            if (result.redirect) {
                returnObject.redirect = result.redirect;
            }
            returnObject.error = 'Возникла ошибка при запросе заказа. Обратитесь в поддержку.';
            return returnObject;
        }

        returnObject.order = result.response;
        return returnObject;
    }
}