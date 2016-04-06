import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {TargetComponent} from "./target.component";

@Component({
    selector: 'my-router-test-app',
    template: '...',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
@RouteConfig([
    {
        path: '/target',
        name: 'Target',
        component: TargetComponent
    }
])
export class TestComponent {
}