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
import {HeroDetailComponent} from "./hero-detail.component";
import {provide} from "angular2/core";
import {HeroService} from "./hero.service";
import { RouteParams } from 'angular2/router';


class MockHeroService {
    public getHero() {
        return Promise.resolve({id: 1, name: "Hercules"});
    }
}

describe('HeroDetailComponent', () => {

    beforeEachProviders(() => [
        provide(HeroService, {useClass: MockHeroService}),
        HeroDetailComponent,
        provide(RouteParams, {useValue: new RouteParams({id: '1'})})
    ]);

    it('should exist', inject([HeroDetailComponent], (heroDetailComponent:HeroDetailComponent) => {
        expect(heroDetailComponent).toBeDefined();
    }));

    it('should go back in browser history on goBack()', inject([HeroDetailComponent], (heroDetailComponent:HeroDetailComponent) => {
        let hasCalled = false;
        window.history.back = () => hasCalled = true;
        heroDetailComponent.goBack();
        expect(hasCalled).toBe(true);
    }));

    it('should render a subheader containing the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(HeroDetailComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroDetailComponent = fixture.componentInstance;

                fixture.detectChanges();
                heroDetailComponent.hero = {id: 5, name: 'George'};
                fixture.detectChanges();
                let subheaders = element.querySelectorAll('h2');
                expect(subheaders.length).toBe(1);
                expect(subheaders.item(0).innerText.includes('George')).toBe(true);
            });
    }));

    it('should render an input bound to the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(HeroDetailComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroDetailComponent = fixture.componentInstance;
                fixture.detectChanges();
                // look if the binding into the DOM works
                heroDetailComponent.hero = {id: 5, name: 'George'};
                fixture.detectChanges();
                let input = element.querySelector('input');
                expect(input.value).toEqual('George');

                // CURRENTLY NOT WORKING (external HTML (templateUrl) and fakeAsync
                // leads to jasmine timeout (Async callback was not invoked ...)
                // look if the binding back from the DOM into the Compontent works
                // input.value = 'Lara';
                // input.dispatchEvent(new Event('input'));
                // fixture.detectChanges();
                // tick();
                // expect(heroDetailComponent.hero.name).toEqual('Lara');
            });
    }));

    it('should render a back button', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(HeroDetailComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroDetailComponent = fixture.componentInstance;

                fixture.detectChanges();
                heroDetailComponent.hero = {id: 5, name: 'George'};
                fixture.detectChanges();
                let backButton = element.querySelector('button');
                expect(backButton).not.toBe(null);
                expect(backButton.innerText.includes('Back')).toBe(true);
            });
    }));

});