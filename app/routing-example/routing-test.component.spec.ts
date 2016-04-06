import {
    it,
    describe,
    expect,
    beforeEach,
    beforeEachProviders,
    inject,
    injectAsync
} from "angular2/testing";
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {provide} from "angular2/core";
import { ROUTER_PRIMARY_COMPONENT, RouteRegistry, Location, Router } from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {RoutingTestComponent} from "./routing-test.component";

class MockRouter extends RootRouter {
    constructor(registry:any, location:any, primaryComponent:any) {
        super(registry, location, primaryComponent);
    }
}

describe('RoutingTestComponent', () => {

    let navigateToLink:any;

    beforeEachProviders(() => [
        RoutingTestComponent,
        RouteRegistry,
        provide(Location, {useClass: SpyLocation}),
        provide(Router, {useClass: MockRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: RoutingTestComponent})
    ]);

    beforeEach(() => {
        navigateToLink = undefined;
        Object.defineProperty(MockRouter.prototype, 'navigate', {
            value: (link:any) => navigateToLink = link
        });
    });

    it('should exist', inject([RoutingTestComponent], (routingTestComponent:RoutingTestComponent) => {
        expect(routingTestComponent).toBeDefined();
    }));

    it('should navigate to Target on goToTarget()', inject([RoutingTestComponent], (routingTestComponent:RoutingTestComponent) => {
        routingTestComponent.goToTarget();
        expect(navigateToLink[0]).toEqual('Target');
    }));

});