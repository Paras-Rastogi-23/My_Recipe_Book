import { Component, OnDestroy, OnInit } from '@angular/core';               //, EventEmitter, Output
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }
  private userSubscription : Subscription;
  subscription : Subscription;
  isAuthenticated : boolean = false;
  constructor(private dataStorageService : DataStorageService,
    private authService :AuthService){}
  
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
 
  onFetchData(){
    this.subscription= this.dataStorageService.fetchRecipes().subscribe();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnInit(){
  this.userSubscription =  this.authService.user.subscribe(user => {
             this.isAuthenticated = !!user; 
             console.log(!user); 
             console.log(!!user);      //  or we can use -->   !user ? false : true;
        });
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
