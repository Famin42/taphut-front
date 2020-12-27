import { Component } from '@angular/core';

import { AmplifyService } from './common/services/amplify.service';
import { Router } from '@angular/router';
import { ROUTES } from './utils/routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public amplify: AmplifyService, private router: Router) {}

  title = 'taphut';

  logout(): void {
    this.amplify.logout().subscribe(() => {
      this.router.navigate([ROUTES.signin]);
    });
  }
}
