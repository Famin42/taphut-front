import { AmplifyService } from 'src/app/core/services/amplify.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { CHAT_ID_KEY, TelegramDialogComponent } from '../telegram-dialog/telegram-dialog.component';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss'],
})
export class TelegramComponent {
  user: Observable<undefined | string>;

  constructor(private amplifyService: AmplifyService, private dialog: MatDialog) {
    this.user = this.amplifyService.currentUserSubj.pipe(
      map((user: CognitoUser | undefined) =>
        user ? (user as any).attributes[CHAT_ID_KEY] : undefined
      )
    );
  }
  connect(): void {
    this.dialog.open(TelegramDialogComponent, {
      minHeight: 185,
    });
  }

  disconnect(): void {
    this.amplifyService.updateUserAttributes({ [CHAT_ID_KEY]: '' }).subscribe();
  }
}
