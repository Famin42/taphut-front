import { AmplifyService } from 'src/app/core/services/amplify.service';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CHAT_ID_KEY, TelegramDialogComponent } from '../telegram-dialog/telegram-dialog.component';
import {
  ConfirmationDialogComponent,
  ConfirmDialogModel,
} from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-telegram',
  templateUrl: './telegram.component.html',
  styleUrls: ['./telegram.component.scss'],
})
export class TelegramComponent {
  user: Observable<undefined | string>;
  loading: Observable<boolean>;

  constructor(
    private amplifyService: AmplifyService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {
    this.loading = this.loadingService.loading;
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
    const message = `Are you sure you want to disconnect telegram?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message, 'warn');

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: dialogData,
    });
    dialogRef
      .afterClosed()
      .pipe(
        switchMap((dialogResult: boolean) => {
          if (dialogResult) {
            this.loadingService.start();
            return this.amplifyService.updateUserAttributes({ [CHAT_ID_KEY]: '' });
          }
          return of(false);
        }),
        catchError((error: Error) => {
          this.loadingService.stop();
          this.snackbarService.openSnackBar(error.message, 'Error');
          return of(undefined);
        }),
        tap((res: boolean | CognitoUser | undefined) =>
          res ? this.snackbarService.openSnackBar(`${name} was deleted successful`, '🎉') : null
        )
      )
      .subscribe(() => this.loadingService.stop());
  }
}
