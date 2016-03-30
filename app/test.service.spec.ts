import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {TestService} from './test.service';

describe('TestService', () => {
    let testService:TestService;

    beforeEach(function () {
        testService = new TestService();
    });

    it('should have name property set', function() {
        expect(testService.name).toBe('Injected Service');
    });
});
