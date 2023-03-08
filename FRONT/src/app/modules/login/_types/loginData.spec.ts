import { LoginData } from './loginData';

describe('LoginData', () => {
  it('should create a LoginData object with properties', () => {
    const loginData: LoginData = {
      login: 'LOGIN_MOCK',
      senha: 'SENHA_MOCK'
    };

    expect(loginData.login).toBe('LOGIN_MOCK');
    expect(loginData.senha).toBe('SENHA_MOCK');
  });
});