import {Injectable}     from 'angular2/core';
import {Http, Response, Headers, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Student}        from './student';

@Injectable()
export class StudentService {
    constructor(private http:Http) {
    }

    private _studentsUrl = 'http://localhost:3000/students';  // URL, die aufgerufen werden soll -> JSON Server

    // Beispiel: Methode, welche ein JSON vom Server läd
    getStudents():Observable<Student[]> {
        return this.http.get(this._studentsUrl) // URL, die aufgerufen wird
            .map(res => <Student[]> res.json())
            .catch(this.handleError) // Falls ein Fehler auftritt
    }

    addStudent(name:string):Observable<Student> {
        let body = JSON.stringify({name});
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this._studentsUrl, body, options)
            .map(res => <Student> res.json())
            .catch(this.handleError)
    }

    private handleError(error:Response):Observable<any> {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
