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

describe("AppComponent", () => {

    beforeEachProviders(() => [
        AppComponent
    ]);

    it("should exist", inject([AppComponent], (appComponent:AppComponent) => {
        expect(appComponent).toBeDefined();
    }));

    it('should render a header', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        return tcb.createAsync(AppComponent)
            .then((fixture:ComponentFixture) => {
                fixture.detectChanges();
                let element = fixture.nativeElement;
                let appComponent = fixture.componentInstance;
                fixture.detectChanges();
                expect(element.querySelectorAll('h1').length).toBe(1);
            });
    }));
    
});
