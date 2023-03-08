import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { LoginService } from './login.service';

import { LoginData } from '../_types/loginData';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ LoginService ]
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login function', () => {
    it('should do a POST call', () => {
      const loginData: LoginData = {
        login: 'LOGIN_MOCK',
        senha: 'PASSWORD_MOCK'
      };
  
      service.login(loginData).subscribe();
  
      const req = httpMock.expectOne('login');

      expect(req.request.method).toBe('POST');
      
      req.flush({});
    });

    it('should call /login endpoint', () => {
      const loginData: LoginData = {
        login: 'LOGIN_MOCK',
        senha: 'PASSWORD_MOCK'
      };
  
      service.login(loginData).subscribe();
  
      const req = httpMock.expectOne('login');
  
      expect(req.request.url).toBe('login');
      
      req.flush([]);
    });
  });
});