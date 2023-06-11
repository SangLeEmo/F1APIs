# F1 APIs - Formula 1 Custom APIs
Express | MongoDB | Mongoose | Cheerio | Swagger

Please make sure all of these programs are installed on your machine
| Program | Version | Note/Download Link |
| --- | --- | --- |
| NodeJS | 18.60.0 LTS | Recommend to use newest version (not necessarily LTS) https://nodejs.org/en |
| MongoDB | >=4.2.3 | It can be used in higher version https://www.mongodb.com/docs/manual/installation/ |

## How to setup this project
### Install node packages
```cmd
npm install
```

### Create environment file
Clone .env.std into .env

Keep the current environment for the local run or update inside the .env file that can fit with your machine

### Connect to BD
Create new database under the name "f1_race_results"

If you use your DB, please replace the connection string to that DB inside the .env file at MONGO_URI

*In some case "localhost" may didn't work, that you can change to the IP of your (Common internal IP: 127.0.0.1)

### Start the project
```cmd
npm run start
```

## Migrate data from F1 Race Results
Migration will run from 1950 to the current year (at the year you are start this project) and save into the database

### Run migration command
```cmd
npm run migrate

...
Migrate F1 Race Results from 1950 to 2023
Confirm to migrate? [yes/no]:
# press yes or y then press Enter to confirm migration

```
This migration will do both jobs create new data if it does not exist and update all existing data
