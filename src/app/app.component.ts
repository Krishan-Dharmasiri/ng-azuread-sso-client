import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureAuthSharedService } from './services/azure-auth-shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isUserLoggedIn:boolean = false;
  private readonly _destroy = new Subject<void>();

  constructor(@Inject(MSAL_GUARD_CONFIG) private msalGuardConfig : MsalGuardConfiguration,
              private maslBrodacastService : MsalBroadcastService,
              private authService : MsalService,
              private azureAuthSharedService:AzureAuthSharedService)
              {

              }

  ngOnInit(): void {
    this.maslBrodacastService.inProgress$.pipe
    (
      filter((interactionStatus:InteractionStatus)=>
      interactionStatus == InteractionStatus.None),
      takeUntil(this._destroy)
    )
    .subscribe(x => {
      this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;
      this.azureAuthSharedService.isUserLoggedIn.next(this.isUserLoggedIn);
    })    
  }
  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login(){
    if(this.msalGuardConfig.authRequest){
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest as RedirectRequest})
    }
    else{
      this.authService.loginRedirect();
    }
  }

  logout(){
    this.authService.logoutRedirect({postLogoutRedirectUri:environment.postLogoutUrl});
  }
}
