import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil} from 'rxjs';
import { AzureAuthSharedService } from 'src/app/services/azure-auth-shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  isUserLoggedin:boolean = false;
  private readonly _destroy = new Subject<void>();

  constructor(private azureAuthSharedService: AzureAuthSharedService) { }

  ngOnInit(): void {
    this.azureAuthSharedService.isUserLoggedIn
    .pipe(takeUntil(this._destroy))
    .subscribe(
      x=>{
        this.isUserLoggedin = x;
      }
    )
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

}
