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
    tick,
    fakeAsync
} from "angular2/testing";
import {AppComponent, Hero} from "./app.component";

describe("AppComponent", () => {

    beforeEachProviders(() => [
        AppComponent
    ]);

    it("should exist", inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent).toBeDefined();
    }));

    it("should have title", inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.title).toBeDefined();
    }));

    it("should have hero", inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent.hero).toBeDefined();
    }));

    describe("hero", function () {

        let hero:Hero;

        beforeEach(inject([AppComponent], (appComponent:AppComponent) => {
            hero = appComponent.hero;
        }));

        it("should have id", () => {
            expect(hero.id).toBeDefined();
        });

        it("should have name", () => {
            expect(hero.name).toBeDefined();
        });

    });

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                fixture.detectChanges();
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));

    it('should render a subheader containing the hero name', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                fixture.detectChanges();
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;
                appComponent.hero.name = 'Sepp';
                fixture.detectChanges();
                let subheaders = element.querySelectorAll('h2');
                expect(subheaders.length).toBe(1);
                expect(subheaders.item(0).innerText.includes('Sepp')).toBe(true);
            });
    }));

    it('should render an input bound to the hero name', injectAsync([TestComponentBuilder], fakeAsync((tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                fixture.detectChanges();
                let element = fixture.debugElement.nativeElement;
                let appComponent = fixture.componentInstance;
                let input = element.querySelectorAll('input').item(0);
                // look if the binding into the DOM works
                appComponent.hero.name = 'Sepp';
                fixture.detectChanges();
                expect(input.value).toEqual('Sepp');
                // look if the binding back from the DOM into the Compontent works
                input.value = 'Hugo';
                input.dispatchEvent(new Event('input'));
                fixture.detectChanges();
                tick();
                expect(appComponent.hero.name).toEqual('Hugo');
            });
    })));

});

describe("Hero", () => {

    beforeEachProviders(() => [
        Hero
    ]);

    it("should exist", inject([Hero], (hero:Hero) => {
        expect(hero).toBeDefined();
    }));

});