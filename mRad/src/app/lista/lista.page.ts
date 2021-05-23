import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Network } from '@ionic-native/network/ngx';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit{

  split: any = null;  odgovor: any = null;  test: any = null;  greska: any = null; user: any = null;

  nema_prijava: any = false;
  ima_prijava: any = false;
  public items: Array<{ datum: string; naslov: string; id: any, status: any, boja: any, kategorija: any,
  korisnik: any, adresa: any}> = [];

  constructor(private platform: Platform, private router: Router, private alertController: AlertController, 
  private network: Network, public http: HTTP) {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login']);
    });
    //this.rad();
  }
  rad();
  rad(){
    if(this.network.type != "none" && this.network.type != "null" && this.network.type != "unknown" 
    && this.network.type != "undefined"){
      var id_kor = null;
      var url1 = "http://192.168.1.103/zavrsnirad/dohvat.php";
      var url2 = "http://localhost/zavrsnirad/dohvat.php";
      var tip = null;
      tip = "dohvat_lista";
      id_kor = 1;
      this.split = null;
      this.odgovor = null;
      this.http.post(url1, {tip: tip, id: id_kor}, {})
      .then(data => {
        this.odgovor = data.data;
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
        this.test = this.odgovor.split("//")
        if(this.test[0] == "uspjesno_dohvat_lista"){
          this.odgovor = JSON.parse(this.test[1]);
          /*this.alarm(this.odgovor[0][0]+"***"+this.odgovor[0][1]+"***"+this.odgovor[0][2]+"***"+
          this.odgovor[0][3]+"***"+this.odgovor[0][4]+"***"+this.odgovor[0][5]+"***"+this.odgovor[0][6]+
          "***"+this.odgovor[0][7]+"***"+this.odgovor[0][8]+"***"+this.odgovor[0][9]+"***"+this.odgovor[0][10]
          +"***"+this.odgovor[0][11]+"***"+this.odgovor[0][12]+"***"+this.odgovor[0][13]);*/
          this.puni_listu(this.odgovor);
        }
        else{
          this.alarm("Učitavanje prijava nije uspjelo!!!")
        }
        //var str = this.test[1];
        //this.odgovor = JSON.parse(this.test[1]);
        //this.odgovor = this.odgovor[2][6];
        //this.odgovor = this.split[1];
      })
      .catch(error => {
        this.greska = error;
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
        this.alarm("Učitavanje prijava nije uspjelo desila se greška!!!")
      });  
    }else{
      this.alarm("Nemate pristup mreži!!!")
    }
  }
  size(){
    return this.odgovor.length;
  }
  puni_listu(data){
    //var tmp: number = this.odgovor.lenght / 13;
    //this.alarm(this.size());
    if(this.size() != 0){
      this.nema_prijava = false;
      this.ima_prijava = true;
    }else{
      this.nema_prijava = true;
      this.ima_prijava = false;
    }
    for(let i = 0; i < (this.size()); i++){
      var add = "";
      var naslov = "";
      var kategorija = "";
      var boja = "";

      if(this.odgovor[i][6] == ""){
        add = "Nema adrese";
      }
      if(this.odgovor[i][7] == ""){
        add = this.odgovor[i][6];
      }
      if(this.odgovor[i][7] != "" && this.odgovor[i][6] != ""){
        add = this.odgovor[i][6] + ", " + this.odgovor[i][7];
      }
      if(this.odgovor[i][7] == "" && this.odgovor[i][6] == ""){
        add = "Nema adrese";
      }
      if(this.odgovor[i][10] == ""){
        naslov = "Naslov nije zadan"
      }else{
        naslov = this.odgovor[i][10];
      }
      if(this.odgovor[i][9] == 0){
        kategorija = "Kategorija nije zadana";
      }else{
        kategorija = this.odgovor[i][9];
      }
      if(this.odgovor[i][13] == "Zaprimljeno"){
        boja = "red";
      }
      if(this.odgovor[i][13] == "U obradi"){
        boja = "gold";
      }
      if(this.odgovor[i][13] == "Obrađeno"){
        boja = "green";
      }
      this.items.push({
        datum: this.odgovor[i][3],
        naslov: naslov,
        kategorija: kategorija,
        id: this.odgovor[i][0],
        status: this.odgovor[i][13],
        boja: boja,
        korisnik: "user" + this.odgovor[i][2],
        adresa: add
      });  

      ////////////////////////////////////////////////////////////////////////////////////////////
      /*
      if(this.odgovor[i][13] == "Zaprimljeno"){
        this.items.push({
          datum: this.odgovor[i][3],
          naslov: naslov,
          kategorija: kategorija,
          id: this.odgovor[i][0],
          status: this.odgovor[i][13],
          boja: boja,
          korisnik: "user" + this.odgovor[i][2],
          adresa: add
        });  
      }
      if(this.odgovor[i][13] == "U obradi"){
        this.items.push({
          datum: this.odgovor[i][3],
          naslov: naslov,
          kategorija: kategorija,
          id: this.odgovor[i][0],
          status: this.odgovor[i][13],
          boja: boja,
          korisnik: "user" + this.odgovor[i][2],
          adresa: add
        });  
      }
      if(this.odgovor[i][13] == "Obrađeno"){
        this.items.push({
          datum: this.odgovor[i][3],
          naslov: naslov,
          kategorija: kategorija,
          id: this.odgovor[i][0],
          status: this.odgovor[i][13],
          boja: boja,
          korisnik: "user" + this.odgovor[i][2],
          adresa: add
        });  
      }
      */
    }
  }
  async alarm(data) {
    const alert = await this.alertController.create({
      message: data,
      buttons: ['Uredu']
    });
    await alert.present();
    }
    ngOnInit() {
      this.rad();
    }  
}
