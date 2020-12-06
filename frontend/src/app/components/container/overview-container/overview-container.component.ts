import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-overview-container',
  templateUrl: './overview-container.component.html',
  styleUrls: ['./overview-container.component.css']
})
export class OverviewContainerComponent implements OnInit {

  constructor(
    public titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Overview")
  }

}
