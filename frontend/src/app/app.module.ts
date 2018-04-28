import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {FormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import rootReducer from './store/reducers';
import {RouterModule} from '@angular/router';
import {RouterEffects} from './store/effects/router.effects';
import {HomeComponent} from './components/home/home.component';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from '@angular/common/http';
import {LoginModule} from './login/login.module';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {routes} from './routes';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AdminComponent } from './components/admin/admin.component';
import { PlayerComponent } from './components/player/player.component';
import {PlaylistEffects} from "./store/effects/playlist.effects";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlaylistComponent,
    AdminComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({...rootReducer, routerReducer}),
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    EffectsModule.forRoot([RouterEffects, PlaylistEffects]),
    // StoreDevtoolsModule.instrument({maxAge: 25}),
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
