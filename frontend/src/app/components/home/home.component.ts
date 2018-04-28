import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('wrapper') wrapper: ElementRef;

  newVideoLink: string;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

  }
}
