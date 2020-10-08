import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { puppeteer } from 'puppeteer';
import { Observable } from 'rxjs';
// import * as data from '../../../data.json';
@Injectable({
  providedIn: 'root',
})
export class DataScrapperService {
  constructor(private http: HttpClient ) {
    // this.getJSON().subscribe((data) => {
    //   console.log(data);
    // });
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  public getCases(): Observable<any> {
    return this.http.get('https://corona.lmao.ninja/v2/countries');
  }

  // get() {
  //   const url =
  //     'https://en.wikipedia.org/wiki/List_of_countries_and_dependencies_by_population_density';

  //   (async () => {
  //     const browser = await puppeteer.launch();
  //     const page = await browser.newPage();
  //     await page.goto(url);
  //     const table = await page.$eval('table', (el) => {
  //       console.log(el);
  //       return el.innerText;
  //     });

  //     //   console.log(table);
  //     const rows = table
  //       .split(/\n/)
  //       .map((el) => el.split(/\t/))
  //       .filter((el) => el.length === 9);
  //     // .map(el => el[5].split('.')[0]);
  //     console.log(rows[3]);

  //     const result = rows.map((element) => {
  //       const density = Number(element[5].split('.')[0].replace(',', ''));
  //       return {
  //         name: element[1],
  //         density,
  //       };
  //     });

  //     console.log(JSON.stringify(result));

  //     await browser.close();
  //   })();
  // }
}
