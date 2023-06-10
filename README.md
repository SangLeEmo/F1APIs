# F1 APIs - Formula 1 Custom APIs

Express | MongoDB | Mongoose | Swagger

## How to setup project
### Install node packages
```cmd
npm install
```
### Create environment file
Clone .env.std into .env

Keep the current environment for the local run or update inside the .env file that can fit with your machine

### Start the project
```cmd
npm run start
```
## Migrate data from F1 Race Results
Migration will run from 1950 to the current year and save into the database

### Create database or/and replace the connection string inside .env file at MONGO_URI
### Run migration command
```cmd
npm run migrate

#
Migrate F1 Race Results from 1950 to 2023
Confirm to migrate? [yes/no]:
# press yes or y then press Enter to confirm migration

```
This migration will do both jobs create a new record if it does not exist and update all existing data
