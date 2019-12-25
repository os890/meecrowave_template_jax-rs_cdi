import {html, render} from 'https://unpkg.com/lit-html?module';

class RandomValueProvider extends HTMLElement {
    constructor() {
        super();
        this.valueFromServer = 0;
        this.root = this.attachShadow({mode: "open"});
        setInterval(_ => this.nextValueFromServer(), 1000);
    }

    nextValueFromServer() {
        var component = this;

        let request = new XMLHttpRequest();
        request.open('GET', '/demo/random');
        request.responseType = 'json';
        request.onload = function() {
            component.valueFromServer = request.response['value'];
            render(component.template(), component.root);
        };
        request.onerror = function() {
            component.valueFromServer = '???';
            render(component.template(), component.root);
        };

        request.send();
    }

    template() {
        return html `<div><b>${this.label}</b> ${this.randomValue}</div>`;
    }

    get randomValue() {
        return this.valueFromServer;
    }

    get label() {
        return this.getAttribute('label');
    }
}

customElements.define('random-server-value', RandomValueProvider);