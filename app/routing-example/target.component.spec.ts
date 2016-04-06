import {
    it,
    describe,
    expect,
    beforeEachProviders,
    inject
} from "angular2/testing";
import {TargetComponent} from "./target.component";

describe('Component', () => {

    beforeEachProviders(() => [
        TargetComponent
    ]);

    it('should exist', inject([TargetComponent], (targetComponent:TargetComponent) => {
        expect(targetComponent).toBeDefined();
    }));

});