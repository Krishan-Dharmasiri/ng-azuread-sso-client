import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';

import { AzureAuthSharedService } from './services/azure-auth-shared.service';


const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident') > -1

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'8d256971-308b-4757-9106-34af4fa5d387',
            redirectUri:'http://localhost:4201',
            authority:'https://login.microsoftonline.com/6a8a138c-226d-4b0e-9d39-8ec14d8b44a1'
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:isIE
          }
        }
    ),
    {
      interactionType:InteractionType.Redirect,
      authRequest:{
        scopes:['user.read']
      }
    },
    {
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map(
        [
          ['https://graph.microsoft.com/v1.0/me',['user.Read']]        
        ]
      )
    }
    )
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:MsalInterceptor,
    multi:true
  },MsalGuard, AzureAuthSharedService],
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
