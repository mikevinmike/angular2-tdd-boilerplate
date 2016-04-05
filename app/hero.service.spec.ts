import {it, describe, expect, beforeEachProviders, inject, fakeAsync, tick} from "angular2/testing";
import {HeroService} from "./hero.service";

describe('HeroService', () => {

    beforeEachProviders(() => [
        HeroService
    ]);

    it('should exist', inject([HeroService], (heroService:HeroService) => {
        expect(heroService).toBeDefined();
    }));

    it('should have method getHeroes()', inject([HeroService], (heroService:HeroService) => {
        expect(typeof heroService.getHeroes === 'function').toBe(true);
    }));

    describe('getHeroes()', () => {

        it('should return a promise with an array of heroes', inject([HeroService], fakeAsync((heroService:HeroService) => {
            let promise = heroService.getHeroes();
            expect(promise instanceof Promise).toBe(true);
            Promise.resolve(promise).then(function (heroes) {
                expect(heroes instanceof Array).toBe(true);
            });
        })));

    });

    describe('getHeroesSlowly()', () => {

        it('should return a promise with an array of heroes', inject([HeroService], fakeAsync((heroService:HeroService) => {
            let promise = heroService.getHeroesSlowly();
            expect(promise instanceof Promise).toBe(true);
            Promise.resolve(promise).then(function (heroes) {
                expect(heroes instanceof Array).toBe(true);
            });
            tick(2000); // wait 2 seconds
        })));

    });


});