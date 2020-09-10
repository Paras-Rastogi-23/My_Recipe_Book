import { Recipe } from './recipe.model';
import { Injectable} from '@angular/core';            // EventEmitter,
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
//import { Subject } from 'rxjs';
@Injectable()
export class RecipeService{
  recipesChanged   =  new Subject<Recipe[]>();
  //recipeSelected =  new EventEmitter<Recipe>();
  //recipeSelected =  new Subject<Recipe>();
   /*private recipes: Recipe[] = [
        new Recipe('Biryani', 
        'This is very tasty Dish', 
        'https://upload.wikimedia.org/wikipedia/commons/1/1f/Kolkata_Biryani.jpg',
        [
          new Ingredient('meat',20),
          new Ingredient('onion',2)
        ]),
        new Recipe('Burger', 
        'This is very Yummy Burger', 
        'https://c0.wallpaperflare.com/preview/364/469/165/burger-food-plate-hamburger.jpg',
        [
          new Ingredient('Bun',2),
          new Ingredient('meat',1)

        ])
      ];*/
      private recipes : Recipe[] = [];

      constructor(private slservice : ShoppingListService){}

      setRecipes(recipes){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
      
      getRecipes(){
          return this.recipes.slice();
      }
      getRecipe(index:number){
        return this.recipes[index];
      }
      addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.slservice.addIngredients(ingredients);
      }
      
      addRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index : number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
      deleteRecipe(index : number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
      
}