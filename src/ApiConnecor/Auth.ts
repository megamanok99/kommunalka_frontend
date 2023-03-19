import RestClient from './RestClient';
const cred = 'https://api.kommunalka.flareon.ru';
class Kommunalka {
  // static verifyAuth() {
  //   return RestClient.postAxios(cred + `/auth/verify`, {
  //     token: localStorage.getItem('authenticatedToken'),
  //   });
  // }
  static Authme() {
    return RestClient.getAxios(cred + '/auth/me');
  }
  static Auth(password: string, email: string) {
    return RestClient.postAxios(cred + `/auth/login`, {
      password: password,
      email: email,
    });
  }
  static getBills() {
    return RestClient.getAxios(cred + '/bills');
  }
}

export default Kommunalka;
