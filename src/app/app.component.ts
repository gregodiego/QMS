import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isExpanded: boolean = false;
  sideItemHeight = "";

  ngOnInit(): void {
    console.log("Here", document.getElementById("side-menu"));

  }

  public expand(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    let sideMenu = document.getElementById("side-menu");
    this.isExpanded ? sideMenu.style.top = this.sideItemHeight + "px" : "0px"
    console.log("Here value", this.isExpanded);
  }
  public itemHeight(value): void {
    this.sideItemHeight = value;

  }

}
