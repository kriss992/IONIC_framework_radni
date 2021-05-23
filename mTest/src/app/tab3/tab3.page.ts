import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  odgovor: any = null;
  posts: any = [null];

  constructor(private http: HttpClient) {  }
  mreza(){
    this.odgovor = null;
    var url1 = "http://192.168.1.103/zavrsnirad/test.php?id_pr=66&id_kor=1";
    this.http.get(url1).subscribe((response) => {
      this.odgovor = response;
      //this.odgovor = "response";
      console.log(response);
    },
      err => {
        this.odgovor = "err";
        console.log(err);
      });
  }
}
