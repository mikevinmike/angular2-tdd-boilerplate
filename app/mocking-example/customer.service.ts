import {Injectable} from 'angular2/core'



// customer.service
import {Injectable} from 'angular2/core'
import {ProductService} from './product.service'

@Injectable() // nötig, da ProductService injiziert wird
export class CustomerService {
    constructor(
        private productService:ProductService
    ) {}
    public printCustomerDetails(id:number) {
        let products:string[] = this.productService.getProductsByCustomerId(id);
        return "Customer purchased: " + products.toString();
    }
}