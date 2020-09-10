import { Ingredient } from '../shared/ingredient.model';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService{
  //changedIngredients = new EventEmitter<Ingredient[]>()
    changedIngredients = new Subject<Ingredient[]>();
    startedEditing     = new Subject<number>();
  private  ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];
      getIngredients(){
          return this.ingredients.slice();
      }
      
      getIngredient(index : number){
        return this.ingredients[index];
      }

      AddIngredient(ingredient : Ingredient){
          this.ingredients.push(ingredient);
          this.changedIngredients.next(this.ingredients.slice());
      }
      addIngredients(ingredients:Ingredient[]){
         /* for(let ingredient of ingredients){
              this.AddIngredient(ingredients);
          }*/
          this.ingredients.push(...ingredients);
          this.changedIngredients.next(this.ingredients.slice());
        }
      onUpdateIngredients(index : number , newIngredient : Ingredient){
        this.ingredients[index] = newIngredient;
        this.changedIngredients.next(this.ingredients.slice());
      }
      DeleteIngredieint(index:number){
        this.ingredients.splice(index,1);
        this.changedIngredients.next(this.ingredients.slice());
      }
      
}