import {Injectable}     from 'angular2/core';
// Hauptklasse, um HTTP Anfragen zu senden
import {Http, Response} from 'angular2/http';
import {Hero}           from './hero';
import {Observable}     from 'rxjs/Observable';

//  Service Deklaration
@Injectable()
export class HeroService {
    constructor (private http: Http) {}

    private _heroesUrl = 'app/heroes';  // URL, die aufgerufen werden soll

    getHeroes () {
// get = HTTP Request (GET)
        return this.http.get(this._heroesUrl)
            // Automatisches Mapping d. JSON-Files zu unseren Heroe-Objekten (bequem!)
            .map(res => <Hero[]> res.json().data)
    }

    handleError(): any {}
}
