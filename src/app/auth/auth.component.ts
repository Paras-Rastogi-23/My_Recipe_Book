import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/Placeholder/placeholder.directive';

@Component({
    selector    : 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent implements OnDestroy{
 isLoginMode : boolean = true;
 isLoading   : boolean = false;
 error       : string  = null;
 private closeSub : Subscription;
 @ViewChild(PlaceholderDirective) alertHost : PlaceholderDirective;
 
 constructor(private authService : AuthService,
   private router : Router,
   private componentFactoryResolver : ComponentFactoryResolver){}
 on_Switching_Mode(){
    this.isLoginMode = !this.isLoginMode;
 }
 onSubmit(form : NgForm){
    if(!form.valid){ return;  }

    const email    = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs  : Observable<AuthResponseData>

    if(this.isLoginMode){
     authObs =  this.authService.signIn(email,password);
    }
    else{
      authObs = this.authService.signUp(email,password);
    }
      
    authObs.subscribe(resdata => {
         console.log(resdata);
         this.router.navigate(['/recipes']);
         this.isLoading = false;
      },errorMsg => {
          console.log(errorMsg);
          this.error    = errorMsg
          this.showErrorAlert(errorMsg);
          this.isLoading = false;
          });
      form.reset();
    }
    // onHandledError(){
    //   this.error = null;
    // }
    private showErrorAlert(message :  string){
        //const alertCmp = new AlertComponent();
        const alertCmpFactory =  this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerReference;
        hostViewContainerRef.clear();
        const ComponentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        ComponentRef.instance.message = message;
        this.closeSub = ComponentRef.instance.close.subscribe(() => {
           this.closeSub.unsubscribe();
           hostViewContainerRef.clear();
        });
    }

    ngOnDestroy(){
      if(this.closeSub){
        this.closeSub.unsubscribe();
      }
    }
}