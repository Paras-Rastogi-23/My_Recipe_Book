import { Component, OnInit, OnDestroy } from '@angular/core';


import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  
  private igChangeSubject : Subscription;
  ingredients: Ingredient[];
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];

  constructor(private slService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSubject = this.slService.changedIngredients.subscribe(
         (ingredients : Ingredient[])  =>  {
          this.ingredients = ingredients;
          }
    );
  }

  ngOnDestroy() :void{
    this.igChangeSubject.unsubscribe();
  }

  onEditItem(index : number){
    this.slService.startedEditing.next(index);
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //}
}
