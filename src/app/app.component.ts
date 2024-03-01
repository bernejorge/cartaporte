import { Component } from '@angular/core';
import * as cheerio from 'cheerio';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'proyecto-prueba';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {

  }
  ngOnInit() {

  }

}
