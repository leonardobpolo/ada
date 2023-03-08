import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ UserService ]
    });
    service = TestBed.inject(UserService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('canActivate function', () => {
    it('should return true if token exists', () => {
      spyOn(localStorage, 'getItem').and.returnValue('token');

      expect(service.canActivate()).toBeTrue();
    });

    it('should return false if token does not exist', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(router, 'navigateByUrl');

      expect(service.canActivate()).toBeFalse();
    });

    it('should navigate to /login if token does not exist', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      spyOn(router, 'navigateByUrl');

      service.canActivate()

      expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
    });
  });
});