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
import {AppComponent, Hero} from "./app.component";

describe('AppComponent', () => {

    beforeEachProviders(() => [
        AppComponent
    ]);

    it('should exist', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent).toBeDefined();
    }));

    it('should have title', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.title).toBeDefined();
    }));

    it('should have selectedHero', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.title).toBeDefined();
    }));

    it('should have an array heroes', inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.heroes).toBeDefined();
        expect(appComponent.heroes instanceof Array).toBe(true);
    }));

    it('should change the selectedHero through onSelect()', inject([AppComponent], (appComponent:AppComponent) => {
        let hero = {id: 48, name: 'Frederic'};
        appComponent.onSelect(hero);
        expect(appComponent.selectedHero).toBe(hero);
    }));

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));

    it('should render a subheader containing the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;

                appComponent.selectedHero = {id: 5, name: 'George'};
                fixture.detectChanges();
                let subheaders = element.querySelectorAll('h2');
                expect(subheaders.length).toBeGreaterThan(0);
                expect(subheaders.item(0).innerText.includes('George')).toBe(true);
            });
    }));

    it('should render an input bound to the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;
                // look if the binding into the DOM works
                appComponent.selectedHero = {id: 5, name: 'George'};
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
                // expect(appComponent.selectedHero.name).toEqual('Lara');
            });
    }));

    it('should render a list of heroes', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;

                appComponent.heroes = [
                    {id: 5, name: 'Chris'},
                    {id: 6, name: 'Laura'},
                    {id: 5, name: 'Victoria'}
                ];
                fixture.detectChanges();
                let listElements = element.querySelectorAll('li');
                expect(listElements.length).toBe(3);
            });
    }));

});

describe('Hero', () => {

    beforeEachProviders(() => [
        Hero
    ]);

    it('should exist', inject([Hero], (hero:Hero) => {
        expect(hero).toBeDefined();
    }));

});