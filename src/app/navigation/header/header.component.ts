import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Language } from './language';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class HeaderComponent implements OnInit {

  isExpanded: boolean = false;

  selectedCode: string = "EN"
  languages: Language[] = [
    { "code": "EN", "lang": "English" },
    { "code": "SV", "lang": 'Swedish' }
  ];

  @Output() onMobile = new EventEmitter<any>();

  constructor(private router: Router, private _eref: ElementRef) { }

  ngOnInit(): void {
    this.reset();
  }

  onMobileExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.onMobile.emit(this.isExpanded)
  }

  selectLang(value: number): void {
    this.selectedCode = this.languages[value].code
  }

  reset(): void {
    const dropdownRef = this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown.opened');
    dropdownRef ? dropdownRef.classList.remove("opened") : "";

  }

  onClick(event: MouseEvent): void {

    if (!this._eref.nativeElement.contains(event.target) || 'sdds-navbar-menu-list' === ((event.target as HTMLInputElement).className)) // or some similar check
    {
      this.reset();
    }
    else if (((event.target as HTMLInputElement).closest('li')?.classList.contains("sdds-navbar-menu-item"))
      || (event.target as HTMLInputElement).classList.contains("sdds-navbar-menu-item")) {
      this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown.opened') ?
        this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown.opened').classList.remove("opened") : "";
    }
    else if ((event.target as HTMLInputElement).closest('.sdds-navbar-menu-item-dropdown')?.classList.contains("sdds-navbar-menu-item-dropdown")) {

      const dropdown = this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown.opened');
      if (dropdown) {
        this._eref.nativeElement.querySelector('.sdds-navbar-menu-item-dropdown.opened') === (event.target as HTMLInputElement).parentElement
          ? "" : (event.target as HTMLInputElement).closest('.sdds-navbar-menu-item-dropdown')?.classList.add("opened");

        dropdown.classList.remove("opened");
      }
      else {
        (event.target as HTMLInputElement).closest('.sdds-navbar-menu-item-dropdown')?.classList.add("opened")
      }
    }
  }


}
