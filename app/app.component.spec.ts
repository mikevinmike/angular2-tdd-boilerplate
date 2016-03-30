import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {TestComponentBuilder, ComponentFixture, injectAsync, MockXHR} from 'angular2/testing';
import {MockDirectiveResolver, MockViewResolver} from 'angular2/testing';
import {provide, DirectiveResolver, ViewResolver} from 'angular2/core';
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

   // not working...
   // solution? http://chariotsolutions.com/blog/post/testing-angular-2-components-unit-tests-testcomponentbuilder/
   it('should update text', injectAsync([TestComponentBuilder], (tcb:TestComponentBuilder) => {
      return tcb.createAsync(AppComponent)
          .then((fixture: ComponentFixture) => {
             //fixture.detectChanges();
             //let element = fixture.elementRef.nativeElement;
             //fixture.detectChanges();
             //expect(element.querySelectorAll('h1').length).toBe(1);
          });
   }));

});

describe("Hero", () => {

   beforeEachProviders(() => [
      Hero
   ]);

   it("should exist", inject([Hero], (hero:Hero) => {
      expect(hero).toBeDefined();
   }));

});