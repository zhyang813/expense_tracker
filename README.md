# Expense Tracker

## Description
Expense Tracker tracks user's expenses, using MEAN stack along with Gulp, NPM, Karma, Mochai, Chai.

### Installation

From within the root directory:

```sh
npm install
```

To run the code locally you need to run Mongod:

 ```sh
mongod
```

You will also need a localserver on port 1337. You can launch the local server with:

```sh
npm start
```

To run tests

```sh
npm test
```

### Notes
- Basic functions are done
- Allow two types of users: regular users and admins
- Expense record consists of datetime, owned by one user, amount and description
- Report view is functional but lacks of by week view, more time and data needed
- Truly SPA
- Some tests are provided
