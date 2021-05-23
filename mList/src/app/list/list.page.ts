import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ datum: string; naslov: string; id: any, status: any, boja: any, kategorija: any,
    korisnik: any}> = [];
  
  constructor(private alertController: AlertController) {
    for (let i = 0; i < 20; i++) {
      if(i % 2 == 0){
        this.items.push({
          datum: "datum datum datum datum",
          naslov: "Naslov Naslov Naslov Naslov Naslov Naslov Naslov " + i,
          id: i,
          status: "status status status",
          korisnik: "korisnik korisnik korisnik",
          kategorija: "Kategorija Kategorija Kategorija",
          boja: "red",
        });  
      }
      if(i % 2 != 0){
        this.items.push({
          datum: "datum datum datum datum",
          naslov: "Naslov Naslov Naslov Naslov Naslov Naslov Naslov " + i,
          id: i,
          status: "status status status",
          korisnik: "korisnik korisnik korisnik",
          kategorija: "Kategorija Kategorija Kategorija",
          boja: "green",
        });
      }
    }
  }
  async alarm(data) {
    const alert = await this.alertController.create({
      message: 'Kliknuto: '+data,
      buttons: ['OK']
    });
    await alert.present();
  }
  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
