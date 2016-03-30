import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {AppComponent} from './app.component';
import {Hero} from './app.component';

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



   //it('should render', injectAsync([TestComponentBuilder], (tcb: TestComponentBuilder) => {
   //   return tcb.createAsync(AppComponent).then((componentFixture: ComponentFixture) => {
   //      const element = componentFixture.nativeElement;
   //      let appComponentInstance = componentFixture.componentInstance;
   //
   //      componentFixture.detectChanges();
   //      expect(element.querySelectorAll('h1').length).toBe(1);
   //   });
   //}));

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

});

describe("Hero", () => {

   beforeEachProviders(() => [
      Hero
   ]);

   it("should exist", inject([Hero], (hero:Hero) => {
      expect(hero).toBeDefined();
   }));

});