import { Component } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  odgovor: any = null;
  greska: any = [null];

  constructor(/*private http: HttpClient,*/ private http: HTTP) {  }
  mreza_get(){
    this.odgovor = null;
    this.http.get("http://192.168.1.103/zavrsnirad/test.php?id_pr_get=1&id_kor_get=2", {}, {})
    .then(data => {
      this.odgovor = data.data;
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
    })
    .catch(error => {
      this.greska = error;
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
  mreza_post(){
    this.odgovor = null;
    this.http.post("http://192.168.1.103/zavrsnirad/test.php", {id_pr_post: "3", id_kor_post: "4"}, {})
    .then(data => {
      this.odgovor = data.data;
      console.log(data.status);
      console.log(data.data); // data received by server
      console.log(data.headers);
    })
    .catch(error => {
      this.greska = error;
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    });
  }
}
