// import {
//   HttpClientTestingModule,
//   HttpTestingController,
//   TestRequest,
// } from '@angular/common/http/testing';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { TestBed, async } from '@angular/core/testing';
// import { HttpRequest } from '@angular/common/http';
// import { ReplaySubject } from 'rxjs';
// import * as _ from 'lodash';

// import { HouseService, MOCK_HOUSES_CURSOR_PAGINATION, API_HOUSES_WEB } from 'src/app/common';
// import { LoadActiveHomes, HomesAction, LoadClosedHomes, HomesTypes } from '../actions';
// import { ApartmentsEffect } from './apartments.effects';

// describe('Apartments Effects', () => {
//   let actions: ReplaySubject<any>;
//   let homesEffects: HomesEffect;
//   let httpTestingController: HttpTestingController;

//   const error: ErrorEvent = new ErrorEvent('req is fell down');

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [HomesEffect, provideMockActions(() => actions), HouseService],
//     });

//     homesEffects = TestBed.inject(HomesEffect);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   it('should be created', () => {
//     expect(homesEffects).toBeTruthy();
//   });

//   it('#loadActiveHomes$ should dispatch LoadActiveHomesSuccess action with payload', async(() => {
//     actions = new ReplaySubject(1);
//     const params: IGetHousesQueryParams = {};
//     const action: LoadActiveHomes = new LoadActiveHomes(params);

//     actions.next(action);

//     homesEffects.loadActiveHomes$.subscribe((result: HomesAction) => {
//       expect(_.isEqual(result.payload, MOCK_HOUSES_CURSOR_PAGINATION)).toBeTruthy();
//       expect(result.type).toEqual(HomesTypes.GET_ACTIVE_HOMES_SUCCESS);
//     });

//     const testRequest: TestRequest = httpTestingController.expectOne((req: HttpRequest<any>) =>
//       req.url.includes(API_HOUSES_WEB)
//     );

//     expect(testRequest.request.method).toEqual('GET');

//     testRequest.flush(MOCK_HOUSES_CURSOR_PAGINATION);
//   }));

//   it('#loadActiveHomes$ should dispatch LoadActiveHomesFail action with payload', async(() => {
//     actions = new ReplaySubject(1);
//     const params: IGetHousesQueryParams = {};
//     const action: LoadActiveHomes = new LoadActiveHomes(params);

//     actions.next(action);

//     homesEffects.loadActiveHomes$.subscribe((result: HomesAction) => {
//       expect(result.type).toEqual(HomesTypes.GET_ACTIVE_HOMES_FAIL);
//     });

//     const testRequest: TestRequest = httpTestingController.expectOne((req: HttpRequest<any>) =>
//       req.url.includes(API_HOUSES_WEB)
//     );

//     expect(testRequest.request.method).toEqual('GET');

//     testRequest.error(error);
//   }));

//   it('#loadClosedHomes$ should dispatch LoadClosedHomesSuccess action with payload', async(() => {
//     actions = new ReplaySubject(1);
//     const params: IGetHousesQueryParams = {};
//     const action: LoadClosedHomes = new LoadClosedHomes(params);
//     actions.next(action);
//     homesEffects.loadClosedHomes$.subscribe((result: HomesAction) => {
//       expect(_.isEqual(result.payload, MOCK_HOUSES_CURSOR_PAGINATION)).toBeTruthy();
//       expect(result.type).toEqual(HomesTypes.GET_CLOSED_HOMES_SUCCESS);
//     });

//     const testRequest: TestRequest = httpTestingController.expectOne((req: HttpRequest<any>) =>
//       req.url.includes(API_HOUSES_WEB)
//     );

//     expect(testRequest.request.method).toEqual('GET');

//     testRequest.flush(MOCK_HOUSES_CURSOR_PAGINATION);
//   }));

//   it('#loadClosedHomes$ should dispatch LoadClosedHomesFail action with payload', async(() => {
//     actions = new ReplaySubject(1);
//     const params: IGetHousesQueryParams = {};
//     const action: LoadClosedHomes = new LoadClosedHomes(params);
//     actions.next(action);
//     homesEffects.loadClosedHomes$.subscribe((result: HomesAction) => {
//       expect(result.type).toEqual(HomesTypes.GET_CLOSED_HOMES_FAIL);
//     });

//     const testRequest: TestRequest = httpTestingController.expectOne((req: HttpRequest<any>) =>
//       req.url.includes(API_HOUSES_WEB)
//     );

//     expect(testRequest.request.method).toEqual('GET');

//     testRequest.error(error);
//   }));

//   afterEach(() => {
//     httpTestingController.verify();
//   });
// });
