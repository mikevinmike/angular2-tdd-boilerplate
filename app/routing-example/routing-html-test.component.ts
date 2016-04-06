import {Component} from 'angular2/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {TargetComponent} from "./target.component";

@Component({
    selector: 'my-router-test-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})
export class RoutingHtmlTestComponent {
}