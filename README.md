# VOIP

## pre requisite

1. Install Node (LTS) version

   [NodeJs](https://nodejs.org/en/)

2. Install MongoDB Community Edition.

   [MongoDB Community Edition](https://www.mongodb.com/docs/manual/administration/install-community/)
3. Create .env file in the root directory at the same level of package.json and add system environment variables

   ```sh
    PROJECT=""
    PORT=""
    MONGO_DB_URI="your/local/mongodb/path" e.g "mongodb://0.0.0.0:27017/VOIP"
    COMPANY_JWT_SECRET=""
    COMPANY_JWT_EXPIRES_IN=""
    USER_JWT_SECRET=""
    USER_JWT_EXPIRES_IN=""
    SERVER_URL=""
    AWS_ACCESS_KEY=""
    AWS_ACCESS_SECRET=""
    AWS_BUCKET_NAME=""
    AWS_BUCKET_FOLDER=""
    AWS_REGION=""
   ```
## Build from source

1. Clone the repo

   git clone [Repo](https://bitbucket.org/AyazCibakPersonal/voip.git)
   cd voip

2. Install dependencies.

   ```sh
   yarn install
   ```

3. Run the dev server.

   ```sh
   yarn dev
   ```
4. Build the production server.

   ```sh
   yarn build
   ```

5. Run the server.
   ```sh
   yarn start
   ```

## Build Docker image locally

```sh
docker build -t voip .
```

## Run tests

```sh
yarn test
```
