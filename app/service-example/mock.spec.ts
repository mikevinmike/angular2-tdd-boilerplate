import {it, describe, expect, beforeEach, inject, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';
import {TestService} from './test.service';

class MockTestService {
    public name: string = 'Mocked Service';
}

describe('TestService with Mock', () => {

    beforeEachProviders(() => [
            provide(TestService, {useClass: MockTestService})
    ]);

    it('should have name property set', inject([TestService], (testService: TestService) => {
        expect(testService.name).toBe('Mocked Service');
    }));

});

