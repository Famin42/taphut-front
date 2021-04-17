import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';

import { AmplifyService, CHAT_ID_KEY } from 'src/app/core/services/amplify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-telegram-dialog',
  templateUrl: 'telegram-dialog.component.html',
  styleUrls: ['telegram-dialog.component.scss'],
})
export class TelegramDialogComponent implements AfterViewInit {
  @ViewChild('script', { static: true })
  script!: ElementRef;

  constructor(
    private ngZone: NgZone,
    private amplifyService: AmplifyService,
    private dialogRef: MatDialogRef<TelegramDialogComponent>
  ) {
    (window as any)['loginViaTelegram'] = (loginData: ITelegramCallbackResutl) =>
      this.loginViaTelegram(loginData);
  }

  ngAfterViewInit(): void {
    this.convertToScript();
  }

  private loginViaTelegram({ id }: ITelegramCallbackResutl) {
    this.amplifyService
      .updateUserAttributes({ [CHAT_ID_KEY]: id.toString() })
      .pipe(
        tap(() =>
          this.ngZone.run(() => {
            this.dialogRef.close();
          })
        )
      )
      .subscribe();
    // If the login should trigger view changes, run it within the NgZone.
    // this.ngZone.run(() => console.log(loginRequest));
  }

  private convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';
    script.setAttribute('data-telegram-login', environment.telegramBotName);
    script.setAttribute('data-size', 'large');
    // Callback function in global scope
    script.setAttribute('data-onauth', 'loginViaTelegram(user)');
    script.setAttribute('data-request-access', 'write');
    element.parentElement.replaceChild(script, element);
  }
}
