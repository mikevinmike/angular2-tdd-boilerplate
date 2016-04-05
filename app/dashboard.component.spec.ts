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
import {provide} from "angular2/core";
import {DashboardComponent} from "./dashboard.component";
import {HeroService} from "./hero.service";

class MockHeroService {
    public getHeroes() {
        return Promise.resolve([
            {id: 1, name: "Hercules"},
            {id: 2, name: "Jack"},
            {id: 3, name: "Claire"},
            {id: 4, name: "Victoria"},
            {id: 5, name: "Rick"},
            {id: 6, name: "Jessica"}
        ]);
    }
}

describe('DashboardComponent', () => {

    beforeEachProviders(() => [
        provide(HeroService, {useClass: MockHeroService}),
        DashboardComponent,
    ]);

    it('should exist', inject([DashboardComponent], (dashboardComponent:DashboardComponent) => {
        expect(dashboardComponent).toBeDefined();
    }));

    it('should not have more than four heroes', inject([DashboardComponent], fakeAsync((dashboardComponent:DashboardComponent) => {
        dashboardComponent.ngOnInit();// with inject ngOnInit does not get called
        tick(); // wait for the promise to be resolved (fakeAsync needed for tick())
        expect(dashboardComponent.heroes.length).toBeLessThan(5);
    })));

    it('should render a subheader', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(DashboardComponent)
            .then((fixture:ComponentFixture) => {
                let element = fixture.nativeElement;
                fixture.detectChanges();
                expect(element.querySelectorAll('h3').length).toBe(1);
            });
    }));

    it('should render a list of heroes', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(DashboardComponent)
            .then((fixture:ComponentFixture) => {
                let element:HTMLElement = fixture.nativeElement;
                let dashboardComponent:DashboardComponent = fixture.componentInstance;

                fixture.detectChanges();  // call detectChanges() to let ngOnInit be executed first
                dashboardComponent.heroes = [
                    {id: 5, name: 'Chris'},
                    {id: 6, name: 'Laura'},
                    {id: 5, name: 'Victoria'}
                ];
                fixture.detectChanges();
                let listElements = element.querySelectorAll('div.hero');
                expect(listElements.length).toBe(3);
            });
    }));

});