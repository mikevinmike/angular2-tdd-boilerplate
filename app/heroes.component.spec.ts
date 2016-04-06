import {
    it,
    describe,
    expect,
    beforeEachProviders,
    inject,
    TestComponentBuilder,
    ComponentFixture,
    injectAsync,fakeAsync, tick
} from "angular2/testing";
import {provide, Component} from "angular2/core";
import {HeroesComponent} from "./heroes.component";
import {HeroService} from "./hero.service";
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, APP_BASE_HREF, ROUTER_PRIMARY_COMPONENT, RouteRegistry, Location, Router } from 'angular2/router';
import {RootRouter} from 'angular2/src/router/router';
import {SpyLocation} from 'angular2/src/mock/location_mock';
import {HeroDetailComponent} from "./hero-detail.component";

class MockHeroService {
    public getHeroes() {
        return Promise.resolve([ { id: 1, name: "Hercules" } ]);
    }
}

//// just needed when <my-hero-detail> tag is present
//@Component({
//    selector: 'my-hero-detail',
//    template: ''
//})
//class MockHeroDetailComponent { }

class MockRouter extends RootRouter {
    constructor(registry:any, location:any, primaryComponent:any) {
        super(registry, location, primaryComponent);
    }
}

describe('HeroesComponent', () => {

    beforeEachProviders(() => [
        provide(HeroService, {useClass: MockHeroService}),
        HeroesComponent,
        RouteRegistry,
        provide(Router, {useClass: MockRouter}),
        provide(ROUTER_PRIMARY_COMPONENT, {useValue: HeroesComponent}),
        provide(Location, {useClass: SpyLocation})
    ]);

    it('should exist', inject([HeroesComponent], (heroesComponent:HeroesComponent) => {
        expect(heroesComponent).toBeDefined();
    }));

    it('should have an array heroes', inject([HeroesComponent], fakeAsync((heroesComponent:HeroesComponent) => {
        heroesComponent.ngOnInit(); // with inject ngOnInit does not get called
        tick(); // wait for the promise to be resolved (fakeAsync needed for tick())
        expect(heroesComponent.heroes).toBeDefined();
        expect(heroesComponent.heroes instanceof Array).toBe(true);
    })));

    it('should change the selectedHero through onSelect()', inject([HeroesComponent], (heroesComponent:HeroesComponent) => {
        let hero = {id: 48, name: 'Frederic'};
        heroesComponent.onSelect(hero);
        expect(heroesComponent.selectedHero).toBe(hero);
    }));

    describe('goToDetail()', () => {
        let navigateToLink:any;

        beforeEach(() => {
            navigateToLink = undefined;
            Object.defineProperty(MockRouter.prototype, 'navigate', {
                value: (link:any) => navigateToLink = link
            });
        });

        it('should navigate to the hero detail', inject([HeroesComponent], (heroesComponent:HeroesComponent) => {
            heroesComponent.selectedHero = {id: 89, name: "Jeremy"};
            heroesComponent.gotoDetail();
            expect(navigateToLink[0]).toBe("HeroDetail");
            expect(navigateToLink[1].id).toBe(89);
        }));
    });

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
        //.overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent) // just needed when <my-hero-detail> tag is present
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));

    it('should render a list of heroes', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
        //.overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent) // just needed when <my-hero-detail> tag is present
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroesComponent = fixture.componentInstance;

                fixture.detectChanges();  // call detectChanges() to let ngOnInit be executed first
                heroesComponent.heroes = [
                    {id: 5, name: 'Chris'},
                    {id: 6, name: 'Laura'},
                    {id: 5, name: 'Victoria'}
                ];
                fixture.detectChanges();
                let listElements = element.querySelectorAll('li');
                expect(listElements.length).toBe(3);
            });
    }));

    //// just needed when <my-hero-detail> tag is present
    //it('should include a my-hero-detail tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    //    return tcb
    //        .overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent)
    //        .createAsync(HeroesComponent)
    //        .then((fixture:ComponentFixture) => {
    //            let element = fixture.nativeElement;
    //            let myHeroDetails = element.querySelectorAll('my-hero-detail');
    //            expect(myHeroDetails.length).toBe(1);
    //        });
    //}));

    it('should show selected hero and detail button', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroesComponent = fixture.componentInstance;
                fixture.detectChanges();

                let aHero = {id: 23, name: 'Terry'};
                heroesComponent.selectedHero = aHero;
                fixture.detectChanges();

                let selectedHeroElement = element.querySelector('div');
                let selectedHeroHeader = selectedHeroElement.querySelector('h2');
                let selectedHeroDetailButton = selectedHeroElement.querySelector('button');
                expect(selectedHeroHeader.innerHTML.includes(aHero.name.toUpperCase())).toBe(true);
                expect(selectedHeroDetailButton.innerHTML.includes("Detail")).toBe(true);
            });
    }));

    it('should change selectedHero on list item click', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
        //.overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent) // just needed when <my-hero-detail> tag is present
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let heroesComponent = fixture.componentInstance;

                fixture.detectChanges();  // call detectChanges() to let ngOnInit be executed first
                let aHero = {id: 53, name: 'Jack'};
                heroesComponent.heroes = [aHero];
                fixture.detectChanges();
                let listElement = element.querySelector('li');
                listElement.dispatchEvent(new Event('click'));
                fixture.detectChanges();
                expect(heroesComponent.selectedHero).toBe(aHero);
            });
    }));

});