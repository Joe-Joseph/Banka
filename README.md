[![Build Status](https://travis-ci.com/Joe-Joseph/Banka.svg?branch=server)](https://travis-ci.com/Joe-Joseph/Banka) [![Coverage Status](https://coveralls.io/repos/github/Joe-Joseph/Banka/badge.svg?branch=server)](https://coveralls.io/github/Joe-Joseph/Banka?branch=server) [![Maintainability](https://api.codeclimate.com/v1/badges/c16e4658d5cef5b1e05f/maintainability)](https://codeclimate.com/github/Joe-Joseph/Banka/maintainability)
# Banka
**Banka** is a banking application that powers banking operations like account creation, customer deposit and withdrawals..

**Banka features**
  1. Users can sign up.
  2. Users can login.
  3. Logged in User can create bank account.
  4. Cahier can make debit transaction.
  5. Cahier can make credit transaction.
  6. Admin can change account status, make it draft, activate, or dormant.
  7. Admin or cashier can delete an account.

**Prerequisites**
  * Node
  * Postman
  
**Setup**
  1. Clone the repository
     ```https://github.com/Joe-Joseph/Banka.git```
     
  2. Install dependencies
  
     ```npm install```
     
  3. Start the server
  
     ```npm start```
  
  4. Use Postman to test api on ```localhost:4000```
  
 **Run test**
 To run the application test run the following command in terminal
 
 ```npm test```
 
 **Endpoints**
 
 Method | Endpoint | Functionality
 -------| -------- | -------------
 POST | /api/v1/auth/signup | Create user account
 POST | /api/v1/auth/login | User login
 GET | /api/v1/users | Get all the users
 GET | /api/v1/accounts | Get all the accounts
 POST | /api/v1/accounts | Create bank account
 PATCH | /api/v1/accounts/:accountNumber | Activate or desactivate bank account
 POST | /api/v1/accounts/:accountNumber/credit | Credit bank account
 POST | /api/v1/accounts/:accountNumber/debit | Debit bank account
 DELETE | /api/v1/accounts/:accountNumber | Delete bank accounts
 
 **Video demo**
 
https://youtu.be/linsVyg292E

** User Interface **
https://joe-joseph.github.io/Banka/UI/

**This is my link to Heroku**

https://banka-c-2.herokuapp.com
 
**Technology used**

**Frontend**
  * JavaScript
  * HTML
  * CSS

**Backend**
  * Node
  * Express
  * mocha
  * chai

**Author**
Nkurunziza Joseph
