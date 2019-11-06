import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../../environments/environment';
import { NavigationModule } from '../navigation/navigation.module';
import { PlaylistComponent } from '../playlist/playlist.component';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';
import { PlayerModule } from '../player/player.module';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    SubscriptionsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NavigationModule,
    PlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
