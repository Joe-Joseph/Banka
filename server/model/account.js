import moment from 'moment';

class Accounts {
  constructor() {
    this.accounts = [];
  }

  createAccount(data, payload) {
    const randomNmber = Math.floor(Math.random() * 90000) + 10000;
    const userId = this.accounts.length + 1;

    const newAccount = {
      id: userId,
      accountNumber: parseInt(`${userId}${randomNmber}`, 10),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      type: data.type,
      openingBalance: 0,
      status: data.status || 'activate',
      createdOn: moment().format('LL'),
    };
    this.accounts.push(newAccount);
    return newAccount;
  }
}

export default new Accounts();
