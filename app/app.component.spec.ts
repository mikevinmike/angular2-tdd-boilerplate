import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {AppComponent} from './app.component';

describe("AppComponent", function () {

   let appComponent:AppComponent;

   beforeEach(function() {
      appComponent = new AppComponent()
   });

   it('should have name property', function() {
      expect(appComponent.name).toBe('John');
   });

   it('should say hello with name property', function() {
      expect(appComponent.sayHello()).toBe('Hello John');
   });

});
