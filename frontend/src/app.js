import "./styles/styles.scss";
import "./styles/freelancers.scss";
import "./styles/orders.scss";
import {Router} from "./router";

class App {
    constructor() {
        new Router();
    }
}

(new App());