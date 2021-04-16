import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  //create an instance of MatSnackBar

  constructor(private snackBar: MatSnackBar) {}

  /* It takes three parameters 
    1.the message string 
    2.the action 
    3.the duration, alignment, etc. */

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}
