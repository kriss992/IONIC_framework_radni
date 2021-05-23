import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild('input_kor', { static: false, }) inputKor;
  @ViewChild('input_pas', { static: false, }) inputPas;

  korisnickoimeTekst: String = "";
  lozinkaTekst: String = "";
  split: any;
  test: any;
  odgovor: any;
  greska: any;
  
  user_id: any; oib: any; ime: any; prezime: any; korisnicko_ime: any; pass: any; admin: any;

  constructor(public platform: Platform, private alertController: AlertController, 
    private network: Network, public http: HTTP, private storage: Storage) {
    this.platform.backButton.subscribeWithPriority(1, () => {
    navigator['app'].exitApp();
    });
    //storage.clear();
  }
   
  login(){
    if(this.network.type != "none" && this.network.type != "null" && this.network.type != "unknown" 
    && this.network.type != "undefined"){
      var url = "http://192.168.1.103/zavrsnirad/login.php";
      this.split = null;
      this.odgovor = null;
      this.http.post(url, {korisnicko_ime: this.korisnickoimeTekst, lozinka: this.lozinkaTekst}, {})
      .then(data => {
        this.odgovor = data.data;
        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
        this.test = this.odgovor.split("//")
        if(this.test[0] == "uspjesno_login"){
          this.odgovor = JSON.parse(this.test[1]);

          this.user_id = ""; this.oib = ""; this.ime = ""; this.prezime = ""; this.korisnicko_ime = ""; 
          this.pass = ""; this.admin = "";
      
          this.storage.set("user_id", this.odgovor[0]);
          this.storage.set("admin", this.odgovor[6]);
          this.storage.set("koriosnicko_ime", this.odgovor[4]);
          this.storage.set("pass", this.odgovor[5]);
          this.storage.set("ime", this.odgovor[2]);
          this.storage.set("prezime", this.odgovor[3]);
          this.storage.set("oib", this.odgovor[1]);

          /*this.user_id = this.odgovor[0];
          this.oib = this.odgovor[1];
          this.ime = this.odgovor[2];
          this.prezime = this.odgovor[3];
          this.korisnicko_ime = this.odgovor[4];
          this.pass = this.odgovor[5];
          this.admin = this.odgovor[6];*/

          /*this.alarm(this.odgovor[0][0]+"***"+this.odgovor[0][1]+"***"+this.odgovor[0][2]+"***"+
          this.odgovor[0][3]+"***"+this.odgovor[0][4]+"***"+this.odgovor[0][5]+"***"+this.odgovor[0][6]+
          "***"+this.odgovor[0][7]+"***"+this.odgovor[0][8]+"***"+this.odgovor[0][9]+"***"+this.odgovor[0][10]
          +"***"+this.odgovor[0][11]+"***"+this.odgovor[0][12]+"***"+this.odgovor[0][13]);*/
          this.radi1();
        }
        else{
          this.alarm("Prijava nije uspjela!")
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
        this.alarm("Prijava nije uspjela desila se greška!")
      });  
    }else{
      this.alarm("Nemate pristup mreži!")
    }

  }
  anon(){
    this.alarm("anon");
  }
  reg(){
    this.alarm("reg");
  }
  ngOnInit() {
  } 
  radi1(){
    this.storage.get("user_id").then((val) => { this.user_id = val; });
    this.storage.get("admin").then((val) => { this.admin = val; });
    this.storage.get("koriosnicko_ime").then((val) => { this.korisnicko_ime = val; });
    this.storage.get("pass").then((val) => { this.pass = val; });
    this.storage.get("ime").then((val) => { this.ime = val; });
    this.storage.get("prezime").then((val) => { this.prezime = val; });
    this.storage.get("oib").then((val) => { this.oib = val; this.alarm1();});
  }
  alarm1(){
    this.alarm("Korisnički id: " + this.user_id + "<br>" + "Admin status: " + this.admin + "<br>" +
    "Korisničko ime: " + this.korisnicko_ime + "<br>" + "Lozinka: " + this.pass + "<br>" +
    "Ime: " + this.ime + "<br>" + "Prezime: " + this.prezime + "<br>" + "OiB: " + this.oib + "<br>");
  }
  handleLogin(data){
    if(data == 1){
      this.inputPas.setFocus();
    }
    if(data == 2){
      this.login();
    }
  }
  async alarm(data) {
    const alert = await this.alertController.create({
      message: data,
      buttons: ['Uredu']
    });
    await alert.present();
  }
}
