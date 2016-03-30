import {it, describe, expect, beforeEach, beforeEachProviders, inject} from 'angular2/testing';
import {TestService} from './test.service';

describe('TestService', () => {

    beforeEachProviders(() => [
        TestService
    ]);

    it('should have name property set', inject([TestService], (testService:TestService) => {
        expect(testService.name).toBe('Injected Service');
    }));
});
