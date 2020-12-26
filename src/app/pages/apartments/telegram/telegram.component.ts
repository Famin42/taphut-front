import { Component, AfterViewInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-telegram',
  template: `    
  <div #script style.display="none">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./telegram.component.scss']
})
export class TelegramComponent implements AfterViewInit {
  
  @ViewChild('script',{ static: true })
  script!: ElementRef;

  public constructor(private ngZone: NgZone) {
    (window as any)['loginViaTelegram'] = (loginData: unknown) => this.loginViaTelegram(loginData);
  }

  convertToScript() {
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

  ngAfterViewInit() {
    this.convertToScript();
  }

  private loginViaTelegram(loginData: unknown) {
    console.log(loginData);
    // If the login should trigger view changes, run it within the NgZone.
    // this.ngZone.run(() => console.log(loginRequest));
  }

}
