import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
    selector : '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;
    
    @HostListener('click') toggleOpen(){ //here toggleOpen is just an example of a funcion which must be needed here
        this.isOpen = !this.isOpen;
    }

    /*@HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
      constructor(private elRef: ElementRef) {}*/

      //the above commented script is for closing the dropdown by clicking anywhere
}