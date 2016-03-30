import {it, describe, expect, beforeEach, inject, beforeEachProviders} from 'angular2/testing';
import {provide} from 'angular2/core';
import {CustomerService} from './customer.service';
import {ProductService} from './product.service';

class ProductServiceMock {
    public getProductsByCustomerId():string[] {
        return ["potatoe", 'honey'];
    }
}

describe('TestService with Mock', function() {

    beforeEachProviders(() => [
        provide(ProductService, {useClass: ProductServiceMock}),
        CustomerService
    ]);

    it('should get customer details', inject([CustomerService], (customerService:CustomerService) => {
        let customerDetails = customerService.printCustomerDetails(1);
        expect(customerDetails).toBe('Customer purchased: potatoe,honey');
    }));

});

