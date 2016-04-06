import {
    it,
    describe,
    expect,
    beforeEach,
    beforeEachProviders,
    inject,
    injectAsync,
    TestComponentBuilder,
    ComponentFixture
} from "angular2/testing";
import {MockApplicationRef} from 'angular2/src/mock/mock_application_ref';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {provide, ApplicationRef} from "angular2/core";
import { APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, RouteRegistry, Location, Router } from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {AppComponent} from './app.component';

describe('AppComponent', () => {

    beforeEachProviders(() => [
        AppComponent,
        RouteRegistry,
        provide(Location, {useClass: SpyLocation}),
        provide(Router, {useClass: RootRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
        provide(ApplicationRef, {useClass: MockApplicationRef}),
        provide(APP_BASE_HREF, {useValue: '/'}),
    ]);

    beforeEach(() => {
        // change MockApplicationRef to return AppComponent as componentType
        Object.defineProperty(MockApplicationRef.prototype, "componentTypes", {
            value: [AppComponent],
            enumerable: true,
            configurable: true
        });
    });

    it('should be able to navigate to Heroes', injectAsync([Router, Location], (router:Router, location:Location) => {
        return router.navigate(['Heroes']).then(() => {
            expect(location.path()).toBe('/heroes');
        });
    }));

    it('should include a router-outlet tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let routerOutlets = element.querySelectorAll('router-outlet');
                expect(routerOutlets.length).toBe(1);
            });
    }));

});