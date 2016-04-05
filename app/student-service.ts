import {Injectable}     from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Student}        from './student';
import {Observable}     from 'rxjs/Rx';

@Injectable()
export class StudentService {
    constructor(private http:Http) {
    }

    private _studentsUrl = 'http://localhost:3000/students';  // URL, die aufgerufen werden soll -> JSON Server

    getStudents() : Observable<Student[]> {
        return this.http.get(this._studentsUrl)
            .map(res => <Student[]> res.json())
            .catch(this.handleError)
    }

    addStudent (name: string) : Observable<Student> {
        let body = JSON.stringify({ name });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._studentsUrl, body, options)
            .map(res =>  <Student> res.json())
            .catch(this.handleError)
    }

    private handleError (error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
