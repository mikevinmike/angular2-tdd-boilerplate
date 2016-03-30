import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {AppComponent} from './app.component';

describe("AppComponent", function () {

   let appComponent:AppComponent;

   beforeEach(function() {
      appComponent = new AppComponent()
   });

   it("should exist", function () {
      expect(appComponent).toBeDefined();
   });
});
