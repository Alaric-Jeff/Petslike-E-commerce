# Backend Setup Guide by me `Jeffrey M. Aspiras`

## Prerequisites  
- Node.js v18+  
- MySQL installed  

## Installation  
1. Navigate to the `./backend` folder.  
2. Run in Terminal:  
`npm install`

## Configuration  
Create a `.env` file in `./backend` with these variables (fill in your own values):  

`DB_USERNAME=`  
`DB_PASSWORD=`  
`DB_NAME=`  
`DB_HOST=localhost`  
`DB_DIALECT=mysql`  
`DB_PORT=3306` (default for MySQL)  
`HTTP_PORT=3000`  
`SESSION_SECRET=` (generate a strong random string)  
`NODE_ENV=development`  

(Stripe API keys can be obtained in https://dashboard.stripe.com/dashboard), you have to login/signup first before you can proceed to the Dashboard section.
`STRIPE_WEBHOOK_SECRET=` (from Stripe Dashboard) 
`STRIPE_KEY=` (from Stripe Dashboard)  

## Running the Server  
Start the backend from `./backend`:  
`node server.js`  

or 

`nodemon server.js`


### Notes:  
- Configure database settings in `./Config/database.js`.  
- Ensure your database server is running first.  
- For production, set `NODE_ENV=production`.  