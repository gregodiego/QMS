import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  host: {
    '(document:click)': 'reset($event)',

  },
})
export class SideMenuComponent implements OnInit {


  selectedMenu: string = "other/form";


  dropDownExpanded: boolean = false;

  dropDownActive: boolean = false;

  collapse: boolean = false;
  @Input() isExpanded: boolean;


  constructor(private _eref: ElementRef) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const menus = document.querySelectorAll('.sdds-navbar-menu-hover');
    menus.forEach((menu) => {
      menu.addEventListener("mouseenter", this.onHoverMenu, false);
    });
  }

  changeMenu(value: MouseEvent): void {
    const menu = (value.target as HTMLInputElement).querySelector('a')?.innerHTML.toLowerCase()
      ? (value.target as HTMLInputElement).querySelector('a')?.innerHTML.toLowerCase()
      : (value.target as HTMLInputElement).innerHTML.toLowerCase()
    this.selectedMenu = "other/" + menu;
    (value.target as HTMLInputElement)?.closest('.sdds-navbar-menu-item-dropdown')?.classList.remove('opened');
    this.dropDownActive = true;
    this.dropDownExpanded = false;
    this.collapse = false;
  }

  onHoverMenu(event) {
    const tooltip = document.querySelectorAll("sdds-tooltip");
    if (!document.querySelector('.sdds-sidebar')?.classList.contains('sdds-sidebar-collapse')) {
      return
    }
    tooltip.forEach((tip) => {
      if (tip.getAttribute('text')?.toLowerCase() == event.target.id) {
        (tip as HTMLElement).style.display = "block";
      }
    })
  }
  dropdownClick(event) {
    if (document.querySelector('.sdds-sidebar')?.classList.contains('sdds-sidebar-collapse')) {
      this.collapse = true;
      this._eref.nativeElement.querySelector(".sdds-sidebar").classList.toggle('sdds-sidebar-collapse');
      event?.closest('.sdds-navbar-menu-item-dropdown')?.classList.add('opened');
      this.dropDownActive = false;
      this.dropDownExpanded = true;
      const tooltip = document.querySelectorAll("sdds-tooltip");
      tooltip.forEach((tip) => {
        (tip as HTMLElement).style.display = "none"
      });
    }
    else {
      this.collapse = false;
      const dropdownParent = document.querySelector("#other");
      dropdownParent?.classList.remove("active");
      if (!this.dropDownExpanded) {
        event?.closest('.sdds-navbar-menu-item-dropdown')?.classList.add('opened');
        this.dropDownActive = false;
        this.dropDownExpanded = true;
      }
      else {
        event?.closest('.sdds-navbar-menu-item-dropdown')?.classList.remove('opened');
        const classExpande = document.querySelectorAll('.sdds-navbar-menu__dropdown-item');
        classExpande.forEach(element => {
          if (element.classList.contains('active')) {
            this.dropDownActive = true;
            this.dropDownExpanded = false;
          }
          else {
            this.dropDownActive = false;
            this.dropDownExpanded = false;
          }
        });
      }
    }
  }

  clickCollapse() {
    if (document.querySelector('.sdds-sidebar')?.classList.contains('sdds-sidebar-collapse')) {
      const tooltip = document.querySelectorAll("sdds-tooltip");
      tooltip.forEach((tip) => {
        (tip as HTMLElement).style.display = "none"
      });
    }
    this._eref.nativeElement.querySelector(".sdds-sidebar").classList.toggle('sdds-sidebar-collapse');
    return false;
  }

  reset(event) {
    const dropdownRef = this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown');
    if (!event.target.closest(".sdds-navbar-menu-item-dropdown-parent") && this.collapse) {
      this.collapse = false;
    }
    if (

      !event.target.closest(".sdds-navbar-menu__dropdown-item")
      && !event.target.closest(".sdds-navbar-menu-item-bottom")
      && !this.collapse
    ) // or some similar check
    {
      this.collapse = false;
      if (this.dropDownExpanded) {
        const drop = (event.target as HTMLInputElement)?.closest(".sdds-navbar-menu-item-dropdown-parent");
        if (drop) {
          this.dropDownActive = false;
        }
        else {
          dropdownRef?.classList.remove('opened');
          this.dropDownExpanded = false;
          this.dropDownActive = false;
        }
      }
      else {
        this.dropDownActive = false;
      }
    }
  }



}
