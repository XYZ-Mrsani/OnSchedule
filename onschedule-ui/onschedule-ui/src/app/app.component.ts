import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private page_title:Title){}

  ngOnInit(): void {
    this.page_title.setTitle(this.title);
  }
  title = 'OnSchedule';
}
