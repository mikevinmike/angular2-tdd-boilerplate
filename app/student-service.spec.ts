import {
    describe,
    expect,
    beforeEach,
    it,
    inject,
    injectAsync,
    beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {StudentService} from "./student-service";
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';
import {ResponseOptions} from 'angular2/http';
import {Student} from "./student";

describe('StudentService', function () {

    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            StudentService
        ]
    });

    it('should get students',
        inject([XHRBackend, StudentService], (mockBackend:MockBackend, studentService:StudentService) => {

            // Erzeugung der simulierten Connection (Backend Mock)
            mockBackend.connections.subscribe(
                (connection:MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                body: {
                                    "data": [
                                        {"id": 123123123, "name": "Christian Gruber"},
                                        {"id": 14101235123, "name": "Michael Dabernig"},
                                        {"id": 234623412, "name": "Sebastian Danninger"}
                                    ]
                                }
                            }
                        )));
                });

            // Aufruf der simulierten Connection
            studentService.getStudents().subscribe((students:Student[]) => {

                // TODO

            });

        }));

    it('should add one student',
        inject([XHRBackend, StudentService], (mockBackend:MockBackend, studentService:StudentService) => {

            // Erzeugung der simulierten Connection (Backend Mock)
            mockBackend.connections.subscribe(
                (connection:MockConnection) => {
                    let name:string = JSON.parse(String(connection.request.text())).name;
                    let id:number = Math.random() * 1000;
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                body: {
                                    "id": id, "name": name
                                }
                            }
                        )));
                });

            // Aufruf der simulierten Connection
            let name:string = 'Sebastian Danninger';
            studentService.addStudent(name).subscribe((student:Student) => {

                // TODO

            });

        }));
})
