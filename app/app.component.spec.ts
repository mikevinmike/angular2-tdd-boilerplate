import {
    it,
    describe,
    expect,
    beforeEach,
    beforeEachProviders,
    inject,
    TestComponentBuilder,
    ComponentFixture,
    injectAsync,
    fakeAsync,
    tick
} from "angular2/testing";
import {MockApplicationRef} from 'angular2/src/mock/mock_application_ref';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {provide, ApplicationRef} from "angular2/core";
import { APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, RouteRegistry, Location, Router } from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {AppComponent} from "./app.component";
import {HeroService} from "./hero.service";
import {HeroesComponent} from "./heroes.component";

class MockHeroService {
    public getHeroes() {
        return Promise.resolve([{id: 1, name: "Hercules"}]);
    }
}

describe('AppComponent', () => {

    beforeEachProviders(() => [
        provide(HeroService, {useClass: MockHeroService}),
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

    it('should exist', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent).toBeDefined();
    }));

    it('should have title', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.title).toBeDefined();
    }));

    it('should be able to navigate to Heroes', injectAsync([Router, Location], (router:Router, location:Location) => {
        return router.navigate(['Heroes']).then(() => {
            expect(location.path()).toBe('/heroes');
        });
    }));

    it('should be able to navigate to Dashboard', injectAsync([Router, Location], (router:Router, location:Location) => {
        return router.navigate(['Dashboard']).then(() => {
            expect(location.path()).toBe('/dashboard');
        });
    }));

    it('should be able to navigate to HeroDetail', injectAsync([Router, Location], (router:Router, location:Location) => {
        return router.navigate(['HeroDetail', {id: 45}]).then(() => {
            expect(location.path()).toBe('/detail/45');
        });
    }));

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));

    it('should include a router-outlet tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let myHeroDetails = element.querySelectorAll('router-outlet');
                expect(myHeroDetails.length).toBe(1);
            });
    }));

});