# Backend Setup Guide by Jeffrey M. Aspiras

## Prerequisites  
- Node.js v18+  
- MySQL installed  

## Installation  
1. Navigate to the `./backend` folder.  
2. Run in Terminal:  
`npm install`

## Configuration  
Create a `.env` file in `./backend` with these variables:

`DB_USERNAME=`  
`DB_PASSWORD=`  
`DB_NAME=` (Database will be automatically created if it doesn't exist, including all required tables)  
`DB_HOST=localhost`  
`DB_DIALECT=mysql`  
`DB_PORT=3306` (default for MySQL)  
`HTTP_PORT=3000`  
`SESSION_SECRET=` (generate a strong random string)  
`NODE_ENV=development`  

### Stripe API Configuration:
Get your API keys from:  
https://dashboard.stripe.com/dashboard  
(Login/Signup required to access Dashboard)  

`STRIPE_WEBHOOK_SECRET=` (from Stripe Dashboard)  
`STRIPE_KEY=` (from Stripe Dashboard)  

## Running the Server  
Start the backend from `./backend`:  
`node server.js`  

or (with auto-restart for development):  
`nodemon server.js`

### Notes:  
- Database connection settings can be modified in `./Config/database.js`  
- Ensure MySQL service is running before starting the server  
- For production deployment:  
  - Set `NODE_ENV=production`  
  - Use proper SSL certificates  
  - Configure firewall rules appropriately