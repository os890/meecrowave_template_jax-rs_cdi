import {html, render} from 'https://unpkg.com/lit-html?module';

class ServerMetricsProvider extends HTMLElement {
    constructor() {
        super();
        this.valueFromServer = '';
        this.root = this.attachShadow({mode: "open"});
        setInterval(_ => this.serverMetrics(), 1000);
    }

    serverMetrics() {
        var component = this;

        let request = new XMLHttpRequest();
        request.open('GET', '/demo/metrics');
        request.responseType = 'text';
        request.onload = function() {
            console.debug(request.responseText);
            component.valueFromServer = request.responseText;
            render(component.template(), component.root);
        };
        request.onerror = function() {
            component.valueFromServer = '???';
            render(component.template(), component.root);
        };

        request.send();
    }

    template() {
        return html `<div><pre>${this.metrics}</pre></div>`;
    }

    get metrics() {
        return this.valueFromServer;
    }
}

customElements.define('server-metrics', ServerMetricsProvider);