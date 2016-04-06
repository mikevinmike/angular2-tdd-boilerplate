import {Component} from 'angular2/core';
import {Router} from "angular2/router";
import {TargetComponent} from "./target.component";

@Component({
    selector: 'my-router-test-app',
    template: '...'
})
export class RoutingTestComponent {
    constructor(private _router:Router) {
    }

    public goToTarget():void {
        this._router.navigate(['Target']);
    }
}