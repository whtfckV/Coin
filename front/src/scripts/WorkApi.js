import getCookie from "./getCookie";

export default class WorkApi {
  constructor() { }
  static async autorization(login, password) {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  };

  static async getAccounts() {
    return await fetch('http://localhost:3000/accounts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((res) => res.json());
  };

  static async createAccount() {
    return await fetch('http://localhost:3000/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((res) => res.json());
  };

  static async getAccount(id) {
    return await fetch(`http://localhost:3000/account/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((res) => res.json());
  };

  static async transferFunds(from, to, amount) {
    return await fetch('http://localhost:3000/transfer-funds', {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((res) => res.json());
  };

  static async getCurrencyAccounts() {
    return await fetch('http://localhost:3000/currencies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((data) => data.json());
  };

  static async getChangedCurrency() {
    return new WebSocket('ws://localhost:3000/currency-feed');
  };

  static async getKnownCurrencies() {
    return await fetch('http://localhost:3000/all-currencies').then((data) =>
      data.json()
    );
  };

  static async getBanksLocations() {
    return await fetch('http://localhost:3000/banks').then((data) =>
      data.json()
    );
  };

  static async exchangeCurrency(from, to, amount) {
    return await fetch('http://localhost:3000/currency-buy', {
      method: 'POST',
      body: JSON.stringify({
        from,
        to,
        amount,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Basic ${getCookie('auth')}`,
      },
    }).then((res) => res.json());
  };
};
