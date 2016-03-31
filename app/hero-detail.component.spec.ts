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

describe('HeroDetailComponent', () => {

    beforeEachProviders(() => [
        HeroDetailComponent
    ]);

    it('should exist', inject([HeroDetailComponent], (heroDetailComponent:HeroDetailComponent) => {
        expect(heroDetailComponent).toBeDefined();
    }));

    it('should render a subheader containing the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(HeroDetailComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroDetailComponent = fixture.componentInstance;

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

});