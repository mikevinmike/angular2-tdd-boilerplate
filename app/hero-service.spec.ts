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
import {HeroService} from "./hero-service";
import {Headers, HTTP_PROVIDERS, BaseRequestOptions, XHRBackend, Response} from 'angular2/http';
import {MockBackend} from 'angular2/http/testing';
import {MockConnection} from 'angular2/src/http/backends/mock_backend';
import {ResponseOptions} from 'angular2/http';
import {Hero} from "./hero";

describe('HeroService', function () {

    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            HeroService
        ]
    })

    it('should get heroes',
        inject([XHRBackend, HeroService], (mockBackend:MockBackend, heroService:HeroService) => {

            // Erzeugung der simulierten Connection (Backend Mock)
            mockBackend.connections.subscribe(
                (connection:MockConnection) => {
                    connection.mockRespond(new Response(
                        new ResponseOptions({
                                body: {
                                    data: [ { id: 26, name: 'Superman' },
                                        {id: 23,name: 'Batman'}
                                    ]
                                }
                            }
                        )));
                });

            // Aufruf der simulierten Connection
            heroService.getHeroes().subscribe((heroes:Hero[]) => {
                expect(heroes.length).toBe(2);
                expect(heroes[0].id).toBe(26);
            });

        }));
})
