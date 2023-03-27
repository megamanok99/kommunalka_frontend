import axios from 'axios';
class RestClient {
  static getAxios(url: string) {
    const config = {
      method: 'get',
      url: `${url}`,
      headers: {
        Authorization: 'Bearer ' + sessionStorage?.getItem('token'),
      },
    };
    return axios(config);
  }

  static postAxiosLog(url: string, data: any) {
    const config = {
      method: 'post',
      url: `${url}`,

      headers: {
        // Authorization: 'Bearer ' + localStorage.getItem('authenticatedToken'),
        // accept: 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:105.0) Gecko/20100101 Firefox/105.0',
        Accept: 'application/json',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      data: data,
    };
    return axios(config);
  }
  static postAxios(url: string, data: any) {
    const config = {
      method: 'post',
      url: `${url}`,

      headers: {
        Authorization: 'Bearer ' + sessionStorage?.getItem('token'),
      },
      data: data,
    };
    return axios(config);
  }

  static patchAxios(url: string, data: any) {
    const config = {
      method: 'patch',
      url: `${url}`,

      headers: {
        Authorization: 'Bearer ' + sessionStorage?.getItem('token'),
      },
      data: data,
    };
    return axios(config);
  }
}

export default RestClient;
