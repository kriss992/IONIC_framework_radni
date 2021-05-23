import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.page.html',
  styleUrls: ['./postavke.page.scss'],
})
export class PostavkePage implements OnInit {

  constructor(public platform: Platform, public router: Router) { 
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.router.navigate(['/login']);
    });

  }

  ngOnInit() {
  }

}
