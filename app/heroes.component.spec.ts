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
import {HeroDetailComponent} from "./hero-detail.component";

class MockHeroService {
    public getHeroes() {
        return Promise.resolve([ { id: 1, name: "Hercules" } ]);
    }
}
@Component({
    selector: 'my-hero-detail',
    template: ''
})
class MockHeroDetailComponent {

}

describe('HeroesComponent', () => {

    beforeEachProviders(() => [
        provide(HeroService, {useClass: MockHeroService}),
        HeroesComponent,
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

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent)
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));

    it('should render a list of heroes', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent)
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

    it('should include a my-hero-detail tag', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent)
            .createAsync(HeroesComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                let myHeroDetails = element.querySelectorAll('my-hero-detail');
                expect(myHeroDetails.length).toBe(1);
            });
    }));

    it('should change selectedHero on list item click', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb
            .overrideDirective(HeroesComponent, HeroDetailComponent, MockHeroDetailComponent)
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