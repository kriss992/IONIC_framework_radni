import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  imageResponse: any;
  public photos: Photo[] = [];
  public slike: Slika[] = [];

  constructor(private camera: Camera, private storage: Storage, private alertController: AlertController,
    private clipboard: Clipboard) { }

  takePicture(sourceType) {
    const optionsFoto: CameraOptions = {
      sourceType: sourceType,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(optionsFoto).then((imageData) => {
      // Add new photo to gallery
      this.spremanjeSlike(imageData);
      // Save all photos for later viewing
      //this.storage.set('photos', this.photos);
    }, (err) => {
     // Handle error
     console.log("Camera issue: " + err);
    });

  }
  spremanjeSlike(imageData){
    this.slike.unshift({ data: imageData });
    this.photos.unshift({ data: 'data:image/jpeg;base64,' + imageData });
  }
  async alarm(data) {
    this.clipboard.copy(data);
    const alert = await this.alertController.create({
      message: 'Poruka: '+data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async klikBrisanje(index) {
    this.photos.splice(index, 1);
    this.slike.splice(index, 1);
  }
  size(){
    return this.photos.length;
  }
  async klikSalji() {
    let br = 0;
    for(var i = 0; i < this.slike.length; i++){ 
      br++;
    }
    const alert = await this.alertController.create({
      message: 'Poruka: '+br+" "+this.slike[0].data,
      buttons: ['OK']
    });
    await alert.present();
  }
}
class Photo {
  data: any;
}
class Slika {
  data: any;
}