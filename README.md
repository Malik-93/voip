# VOIP

## pre requisite

1. Install Node (LTS) version

   ```sh
   https://nodejs.org/en/
   ```

2. Install MongoDB Community Edition.

   ```sh
   https://www.mongodb.com/docs/manual/administration/install-community/
   
   ```
3. Create .env file in the root directory at the same level of package.json and add system environment variables

   ```sh
    PROJECT=project_name e.g VOIP
    PORT=server_port e.g 8080
    MONGO_DB_URI=mongodb local path e.g mongodb://0.0.0.0:27017/VOIP
   ```
## Build from source

1. Clone the repo

   ```sh
   git clone https://Mudassir_Malik_93@bitbucket.org/Mudassir_Malik_93/voip.git
   cd voip
   ```

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
