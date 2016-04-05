import {Component, OnInit}  from 'angular2/core';
import {StudentService}     from "./student-service";
import {Student}            from "./student";
import {HTTP_PROVIDERS}     from 'angular2/http';
@Component({
    selector: 'student-list',
    templateUrl: 'app/student-list.html',
    styles: ['.error {color:red;}'],
    providers: [
        HTTP_PROVIDERS,
        StudentService,
    ]
})
export class StudentListComponent implements OnInit {
    constructor(private _studentService:StudentService) {
    }

    errorMessage:string;
    students:Student[] = [];

    ngOnInit() {
        this.getStudents();
    }

    getStudents() {
        this._studentService.getStudents()
            .subscribe(
                students => this.students = students,
                error => this.errorMessage = <any>error);
    }

    addStudent(name:string) {
        if (!name) {
            return;
        }
        this._studentService.addStudent(name)
            .subscribe(
                student => this.students.push(student),
                error => this.errorMessage = <any>error);
    }
}