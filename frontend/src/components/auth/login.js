import {AuthUtils} from "../../utils/authUtils";
import {HttpUtils} from "../../utils/http-utils";
import {ValidationUtils} from "../../utils/validation-utils";
import {AuthService} from "../../services/auth-service";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.findElements();

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));

        this.validations = [
            {element: this.emailElement, options: {pattern: /^\S+@\S+\.\S+$/}},
            {element: this.passwordElement},
        ];
    }

    findElements() {
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');
    }

    async login() {
        this.commonErrorElement.style.display = 'none';
        if (ValidationUtils.validateForm(this.validations)) {
            const loginResult = await AuthService.login({
                email: this.emailElement.value,
                password: this.passwordElement.value,
                rememberMe: this.rememberMeElement.checked
            });

            AuthUtils.setAuthInfo(loginResult.response.accessToken, loginResult.response.refreshToken,
                JSON.stringify({id: loginResult.response.id, name: loginResult.response.name}));

            this.openNewRoute('/');
        }
    }
}