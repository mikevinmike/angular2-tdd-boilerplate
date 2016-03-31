import {it, describe, expect, beforeEachProviders, inject} from "angular2/testing";
import {Hero} from "./hero";

describe('Hero', () => {

    beforeEachProviders(() => [
        Hero
    ]);

    it('should exist', inject([Hero], (hero:Hero) => {
        expect(hero).toBeDefined();
    }));

});