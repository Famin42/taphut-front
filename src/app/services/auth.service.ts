import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AmplifyService} from './amplify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private amplifyService: AmplifyService) { }
}
