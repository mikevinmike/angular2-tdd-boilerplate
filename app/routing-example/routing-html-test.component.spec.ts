import {
    it,
    describe,
    expect,
    beforeEachProviders,
    inject,
    TestComponentBuilder,
    ComponentFixture,
    injectAsync
} from "angular2/testing";
import {MockApplicationRef} from 'angular2/src/mock/mock_application_ref';
import {provide, ApplicationRef} from "angular2/core";
import { APP_BASE_HREF } from 'angular2/router';
import {RoutingHtmlTestComponent} from "./routing-html-test.component";

// change MockApplicationRef to return AppComponent as componentType
Object.defineProperty(MockApplicationRef.prototype, "componentTypes", {
    value: [RoutingHtmlTestComponent],
    enumerable: true,
    configurable: true
});

class MockHeroService {
    public getHeroes() {
        return Promise.resolve([{id: 1, name: "Hercules"}]);
    }
}

describe('RoutingHtmlTestComponent', () => {

    beforeEachProviders(() => [
        RoutingHtmlTestComponent,
        provide(ApplicationRef, {useClass: MockApplicationRef}),
        provide(APP_BASE_HREF, {useValue: '/'}),

    ]);

    it('should exist', inject([RoutingHtmlTestComponent], (routingHtmlTestComponent:RoutingHtmlTestComponent) => {
        expect(routingHtmlTestComponent).toBeDefined();
    }));

    it('should include a router-outlet tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(RoutingHtmlTestComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let routerOutlets = element.querySelectorAll('router-outlet');
                expect(routerOutlets.length).toBe(1);
            });
    }));

});