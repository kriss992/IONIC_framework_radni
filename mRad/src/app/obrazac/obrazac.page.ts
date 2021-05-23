import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhotoService } from '../services/photo.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder,NativeGeocoderResult, NativeGeocoderOptions } 
  from '@ionic-native/native-geocoder/ngx';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

declare var google;
var info;
@Component({
  selector: 'app-obrazac',
  templateUrl: './obrazac.page.html',
  styleUrls: ['./obrazac.page.scss'],
})
export class ObrazacPage  {
  @ViewChild('map', { static: false, }) mapElement: ElementRef;
  @ViewChild('naslovInput', { static: false, }) inputNas;
  @ViewChild('tekstInput', { static: false, }) inputTekst;

  map: any;
  address:string;
  currentImage: any;
  tipPrijave: any = 0;
  sakrijMe: any;
  kartaSkrivena: any;
  porukaSkrivena: any;
  currentHero: any;
  poruka: string;
  ulica: string = ""; k_broj: string = ""; p_broj: string = ""; naselje: string = ""; opcina: string = ""; 
  zupanija: string = ""; drzava: string = ""; drzava_k: string = ""; lat: any = ""; lon: any = "";
  naslovTekst: string = "";
  sadrzajTekst: string = "";

  posts: any;
  odgovor: any = null;
  greska: any = [null];
  public split: item[] = [];

  test: any = null;

  constructor(private platform: Platform, private router: Router, private photoService: PhotoService, 
    private geolocation: Geolocation, private alertController: AlertController, 
    private nativeGeocoder: NativeGeocoder, private network: Network, public http: HTTP, 
    private storage: Storage) {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login']);
    });
  }
  izabranaPrijava(tip){
    this.tipPrijave=tip;
  }
  lociraj(){
    if(this.network.type != "none" && this.network.type != "null" && this.network.type != "unknown" 
      && this.network.type != "undefined"){
        this.loadMap();
        this.kartaSkrivena = true;  
        this.porukaSkrivena = false;
    }else{
      this.kartaSkrivena = false;  
      this.porukaSkrivena = true;
      this.poruka = "Lokaciju se ne može dohvatiti i vizualizirati bez pristupa mreži.";
    }
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.lat = resp.coords.latitude;       this.lon = resp.coords.longitude; 
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      info="LAT: "+resp.coords.latitude+" LON: "+resp.coords.longitude;
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker(this.map);
    }).catch((error) => {
      console.log('Ne može se dohvatiti lokaciju.', error);
    });
  }
  addMarker(map:any){

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
    
    let content = info;
    
    this.addInfoWindow(marker, content);
    }
  addInfoWindow(marker, content){
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value);
 
        }
        this.ulica = responseAddress[6]; this.k_broj = responseAddress[7]; this.naselje = responseAddress[5];
        this.p_broj = responseAddress[2]; this.opcina = responseAddress[4]; this.zupanija = responseAddress[3];
        this.drzava = responseAddress[1]; this.drzava_k = responseAddress[0];

        this.address = this.ulica+" "+this.k_broj+", "+this.p_broj+", "+this.naselje+", "+this.opcina+", "+
        this.zupanija+", "+this.drzava;
      })
      .catch((error: any) =>{ 
        this.address = "Adresa nije dostupna!";
      });
  }

  async klikSalji() {
    if(this.photoService.slike.length>0){
      let br = 0;
      for(var i = 0; i < this.photoService.slike.length; i++){ 
        br++;
      }
      const alert = await this.alertController.create({
        message: 'Poruka: '+br+" "+this.photoService.slike[0].data,
        buttons: ['OK']
      });
      await alert.present();  
    }
    else{
      const alert = await this.alertController.create({
        message: 'Poruka: '+this.tipPrijave+"***"+this.naslovTekst+"***"+this.sadrzajTekst,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
  mreza(){
    if(this.network.type != "none" && this.network.type != "null" && this.network.type != "unknown" 
      && this.network.type != "undefined"){
        this.split = null;
        this.odgovor = null;
        this.http.post("http://192.168.1.103/zavrsnirad/test.php", {id_pr_post: "3", id_kor_post: "4"}, {})
        .then(data => {
          this.odgovor = data.data;
          console.log(data.status);
          console.log(data.data); // data received by server
          console.log(data.headers);
          this.test = this.odgovor.split("//")
          //var str = this.test[1];
          this.odgovor = JSON.parse(this.test[1]);
          this.odgovor = this.odgovor[2][6];
          //this.odgovor = this.split[1];
        })
        .catch(error => {
          this.greska = error;
          console.log(error.status);
          console.log(error.error); // error message as string
          console.log(error.headers);
        });  
      }else{
        this.alarm("Nemate pristup mreži!!!")
      }
  }
  async alarm(data) {
    const alert = await this.alertController.create({
      message: data,
      buttons: ['Uredu']
    });
    await alert.present();
  }
  handleLogin(){
    this.inputTekst.setFocus();
  }
}
class item {
  data: any
}