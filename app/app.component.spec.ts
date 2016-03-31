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
import {AppComponent} from "./app.component";

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

    it('should include a my-hero-detail tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let myHeroDetails = element.querySelectorAll('my-hero-detail');
                expect(myHeroDetails.length).toBe(1);
            });
    }));

    it('should change selectedHero on list item click', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;
                let aHero = {id: 53, name: 'Jack'};
                appComponent.heroes = [aHero];
                fixture.detectChanges();
                let listElement = element.querySelector('li');
                listElement.dispatchEvent(new Event('click'));
                fixture.detectChanges();
                expect(appComponent.selectedHero).toBe(aHero);
            });
    }));

});