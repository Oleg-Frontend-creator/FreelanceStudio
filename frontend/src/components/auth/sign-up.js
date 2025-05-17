import {AuthUtils} from "../../utils/authUtils";
import {ValidationUtils} from "../../utils/validation-utils";
import {AuthService} from "../../services/auth-service";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.findElements();

        this.validations = [
            {element: this.nameElement},
            {element: this.lastNameElement},
            {element: this.emailElement, options: {pattern: /^\S+@\S+\.\S+$/}},
            {element: this.passwordElement, options: {pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/}},
            {element: this.passwordRepeatElement, options: {compareTo: this.passwordElement.value}},
            {element: this.agreeElement, options: {checked: this.agreeElement.checked}},
        ];

        document.getElementById('process-button').addEventListener('click', this.signup.bind(this));
    }

    findElements() {
        this.emailElement = document.getElementById('email');
        this.nameElement = document.getElementById('name');
        this.lastNameElement = document.getElementById('last-name');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.agreeElement = document.getElementById('agree');
        this.commonErrorElement = document.getElementById('common-error');
    }

    async signup() {
        this.commonErrorElement.style.display = 'none';

        for (let i = 0; i < this.validations.length; i++) {
            if (this.validations[i].element === this.passwordRepeatElement)
                this.validations[i].options.compareTo = this.passwordElement.value;
            if (this.validations[i].element === this.agreeElement)
                this.validations[i].options.checked = this.agreeElement.checked;
        }

        if (ValidationUtils.validateForm(this.validations)) {
            const signUpResult = await AuthService.signUp({
                name: this.nameElement.value,
                lastName: this.lastNameElement.value,
                email: this.emailElement.value,
                password: this.passwordElement.value
            });

            if (signUpResult) {
                AuthUtils.setAuthInfo(signUpResult.accessToken, signUpResult.refreshToken,
                    JSON.stringify({id: signUpResult.id, name: signUpResult.name}));

                return this.openNewRoute('/');
            } else {
                this.commonErrorElement.style.display = 'block';
            }
        }
    }
}