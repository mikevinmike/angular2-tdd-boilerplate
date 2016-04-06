import {
    it,
    describe,
    expect,
    beforeEachProviders,
    inject,
    injectAsync
} from "angular2/testing";
import {MockApplicationRef} from 'angular2/src/mock/mock_application_ref';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {provide, ApplicationRef} from "angular2/core";
import { APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, RouteRegistry, Location, Router } from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {TestComponent} from "./test.component";

describe('TestComponent', () => {

    beforeEachProviders(() => [
        TestComponent,
        RouteRegistry,
        provide(Location, {useClass: SpyLocation}),
        provide(Router, {useClass: RootRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: TestComponent})

    ]);

    it('should exist', inject([TestComponent], (testComponent:TestComponent) => {
        expect(testComponent).toBeDefined();
    }));

    it('should be able to navigate to Target', injectAsync([Router, Location], (router:Router, location:Location) => {
        return router.navigate(['Target']).then(() => {
            expect(location.path()).toBe('/target');
        });
    }));

});