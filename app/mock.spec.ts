import {it, describe, expect, beforeEach, inject, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';
import {TestService} from './test.service';

class MockTestService {
    public name: string = 'Mocked Service';
}

describe('TestService with Mock', function() {
    let testService: TestService;

    beforeEachProviders(() => [
            provide(TestService, {useClass: MockTestService})
    ]);

    beforeEach(inject([TestService], function (_testService_: TestService) {
        testService = _testService_;
    }));

    it('should have name property set', function() {
        expect(testService.name).toBe('Mocked Service');
    });

});

