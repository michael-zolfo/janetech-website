import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [],
  declarations: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FooterComponent
  ],
})
export class CoreModule { }