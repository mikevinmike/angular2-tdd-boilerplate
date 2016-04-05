import {Component} from "angular2/core";
import {OnInit} from 'angular2/core';
import {Hero} from "./hero";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from './hero.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})
export class AppComponent implements OnInit {
    public title = 'Tour of Heroes';
    public heroes: Hero[];
    public selectedHero:Hero;

    constructor(private _heroService: HeroService) { }

    ngOnInit():void {
        this.getHeroes();
    }

    public onSelect(hero:Hero):void {
        this.selectedHero = hero;
    }

    private getHeroes():void {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
}