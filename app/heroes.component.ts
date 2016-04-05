import {Component} from "angular2/core";
import {OnInit} from 'angular2/core';
import {Hero} from "./hero";
import {HeroDetailComponent} from "./hero-detail.component";
import {HeroService} from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css'],
    directives: [HeroDetailComponent],
    providers: [HeroService]
})
export class HeroesComponent implements OnInit {
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