import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { RxJSModule } from './rxjs/rxjs.module';
import { CoreModule } from './core/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MenuItemComponent } from './side-menu/menu-item/menu-item.component';
import { MaterialModule } from './material/material.module';
import { SandboxModule } from './sandbox/sandbox.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideMenuComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    RxJSModule,
    CoreModule,
    MaterialModule,
    SandboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
