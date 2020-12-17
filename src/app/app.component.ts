import { Component } from '@angular/core';

import { AmplifyService } from './services/amplify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public constructor(public amplify: AmplifyService) {}

  title = 'taphut';

  public logout(): void {
    this.amplify.logout().subscribe()
  }
}
