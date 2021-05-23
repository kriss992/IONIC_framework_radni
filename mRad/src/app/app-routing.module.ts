import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'postavke', loadChildren: './postavke/postavke.module#PostavkePageModule' },
  { path: 'registracija', loadChildren: './registracija/registracija.module#RegistracijaPageModule' },
  { path: 'obrazac', loadChildren: './obrazac/obrazac.module#ObrazacPageModule' },
  { path: 'lista', loadChildren: './lista/lista.module#ListaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
