import moment from 'moment';

class Transactions {
  constructor() {
    this.transactions = [];
  }

  debitAccount(data, accNumber, balance) {
    const debit = {
      transactionId: this.transactions.length + 1,
      accountNumber: accNumber,
      amount: data.amount,
      cashier: data.cashier,
      transactionType: 'debit',
      createdOn: moment().format('LL'),
      accountBalance: balance,
    };
    this.transactions.push(debit);
    return debit;
  }

  creditAccount(data, accNumber, balance) {
    const credit = {
      transactionId: this.transactions.length + 1,
      accountNumber: accNumber,
      amount: data.amount,
      cashier: data.cashier,
      transactionType: 'credit',
      createdOn: moment().format('LL'),
      accountBalance: balance,
    };
    this.transactions.push(credit);
    return credit;
  }
}

export default new Transactions();
