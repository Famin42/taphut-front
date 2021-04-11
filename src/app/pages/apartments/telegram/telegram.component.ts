import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { AmplifyService } from 'src/app/core/services/amplify.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-telegram',
  template: ` <div #script style.display="none">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./telegram.component.scss'],
})
export class TelegramComponent implements AfterViewInit {
  @ViewChild('script', { static: true })
  script!: ElementRef;

  constructor(private ngZone: NgZone, private amplifyService: AmplifyService) {
    (window as any)['loginViaTelegram'] = (loginData: ITelegramCallbackResutl) =>
      this.loginViaTelegram(loginData);
  }

  public ngAfterViewInit(): void {
    this.convertToScript();
  }

  private loginViaTelegram({ id }: ITelegramCallbackResutl) {
    this.amplifyService.updateUser({ 'custom:chatId': id.toString() }).then();
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
