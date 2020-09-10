import {
  Component,
  OnInit,                 //,ElementRef,ViewChild
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f',{static:false}) slForm : NgForm;
  editMode         = false;
  editedItemIndex  : number; 
  editedItem       : Ingredient;
  constructor(private slService : ShoppingListService) { }
  subscription     : Subscription;
  ngOnInit() {
   this.subscription   = this.slService.startedEditing.subscribe(
      (index : number) => {
        this.editedItemIndex  = index;
        this.editMode         = true;
        this.editedItem       = this.slService.getIngredient(index);
        this.slForm.setValue({
          name     : this.editedItem.name,
          amount   : this.editedItem.amount
        });
        }
    );
  }

  ngOnDestroy(){
    this.slService.startedEditing.unsubscribe();
  }

  onSubmit(form : NgForm) {
    const value = form.value;                                                            // const ingName = this.nameInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name,value.amount);                      // const ingAmount = this.amountInputRef.nativeElement.value; 
    if(this.editMode){                                                                 //ingName, ingAmount 
      this.slService.onUpdateIngredients(this.editedItemIndex,newIngredient);         // this.ingredientAdded.emit(newIngredient);
    }else{
      this.slService.AddIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.slService.DeleteIngredieint(this.editedItemIndex);
    this.onClear();
  }

}
