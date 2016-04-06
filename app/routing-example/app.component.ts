import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from 'angular2/router';

@Component({
    selector: 'my-gh',
    template: ''
})
export class HeroListComponent {
}


@Component({
    selector: 'my-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS
    ]
})
@RouteConfig([
    {path: '/heroes', name: 'Heroes', component: HeroListComponent}
])
export class AppComponent {
}


