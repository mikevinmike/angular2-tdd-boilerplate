import {Component} from "angular2/core";
import {OnInit} from 'angular2/core';
import {Router} from "angular2/router";
import {Hero} from "./hero";
import {HeroService} from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: ['app/heroes.component.css']
})
export class HeroesComponent implements OnInit {
    public heroes: Hero[];
    public selectedHero:Hero;

    constructor(private _router:Router,
                private _heroService:HeroService) {
    }

    ngOnInit():void {
        this.getHeroes();
    }

    public onSelect(hero:Hero):void {
        this.selectedHero = hero;
    }

    private getHeroes():void {
        this._heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    public gotoDetail():void {
        this._router.navigate(['HeroDetail', {id: this.selectedHero.id}]);
    }
}