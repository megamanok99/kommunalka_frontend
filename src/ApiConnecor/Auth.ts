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
  static postBill(
    coldWater: number,
    createDate: string,
    electric: number,
    hotWater: number,
    addPayment?: number[],
  ) {
    return RestClient.postAxios(cred + `/bills`, {
      coldWater,
      createDate,
      electric,
      hotWater,
      addPayment,
    });
  }
  static updateBill(obj: any, id: 'string') {
    return RestClient.patchAxios(cred + `/bills/${id}`, obj);
  }
  static getMultipleLinePlot() {
    return RestClient.getAxios(cred + '/multiple-line-plot');
  }

  static getMeterGaugePlot() {
    return RestClient.getAxios(cred + '/meter-gauge-plot');
  }
  static getLiquidElectric() {
    return RestClient.getAxios(cred + '/liquid-electric');
  }
  static getLiquidCold() {
    return RestClient.getAxios(cred + '/liquid-cold');
  }
  static getLiquidHot() {
    return RestClient.getAxios(cred + '/liquid-hot');
  }
}

export default Kommunalka;
