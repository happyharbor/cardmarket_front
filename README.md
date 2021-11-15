# Cardmarket backoffice UI

## Features
### Login
The back end supports authorization/authentication.

### Homepage

#### Normal User
- Get Addresses: The addresses of all the paid, but not shipped orders will be generated and saved in a csv.
- Shipped Cards Per Month: A matrix will appear will the cards shipped during the last 12 months.

#### Super User
You get all the options of the Normal Users plus:
- Update prices: You manually update the prices of the stock.
- Register a user.

## Setting up development environment
1. `npm install`
2. `npm run start`
3. In order to have a functional website, please follow the relative instructions in [cardmarket back](https://github.com/happyharbor/cardmarket_back)