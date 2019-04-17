import jwt from 'jsonwebtoken';
import validate from '../helpers/account-validation';
import AccountsModel from '../model/account';

const Accounts = {
//  CREATE ACCOUNT
  createAccount(req, res) {
    const { error } = validate.validateAccount(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    const account = AccountsModel.createAccount(req.body, req.user);
    const token = jwt.sign(req.user, 'YOU_OWN_YOUR_OWN');
    return res.header('Authorization', `${token}`).status(201).json({
      status: 201, message: 'Account created successfully', data: account,
    });
  },

  // UPDATE ACCOUNT
  updateAccount(req, res) {
    if (req.user.isAdmin !== 'true' && req.user.type !== 'cashier') {
      return res.status(401).json({ status: 401, error: 'Only Admin and staff can change account status' });
    }
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const account = AccountsModel.accounts.find(acc => acc.accountNumber === accountNumber);
    if (!account) return res.status(404).json({ status: 404, error: 'Account with the given account number is not found' });

    const { error } = validate.validateUpdate(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });

    account.status = req.body.status;
    return res.status(200).json({ status: 200, message: 'Updated successfully', data: account });
  },

  // DELETE ACCOUNT
  deleteAccount(req, res) {
    if (req.user.isAdmin !== 'true' && req.user.type !== 'cashier') {
      return res.status(401).json({ status: 401, error: 'Only Admin and staff can delete an account' });
    }

    const accountNumber = parseInt(req.params.accountNumber, 10);
    const account = AccountsModel.accounts.find(acc => acc.accountNumber === accountNumber);

    if (!account) return res.status(404).json({ status: 404, error: 'Account with the given account number is not found' });
    const index = AccountsModel.accounts.indexOf(account);
    AccountsModel.accounts.splice(index, 1);

    return res.status(200).json({ status: 200, message: 'Account successfully deleted' });
  },

  getAllAccounts(req, res) {
    if (!AccountsModel.accounts.length) return res.status(404).json({ status: 404, message: 'There is no account' });
    return res.status(200).json({ status: 200, data: AccountsModel.accounts });
  },

};

export default Accounts;
