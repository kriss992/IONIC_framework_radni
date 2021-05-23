import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.page.html',
  styleUrls: ['./registracija.page.scss'],
})
export class RegistracijaPage implements OnInit {

  constructor(public platform: Platform, public router: Router) { 
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login']);
    });

  }

  ngOnInit() {
  }

}
