# Dummy social network

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_DUMMY_API_HOST` - url of dummy api.

`NEXT_PUBLIC_DUMMY_APP_ID` - You must go to https://dummyapi.io, register and generate an appId in the account view.

`NEXT_PUBLIC_GOOGLE_CLIENT_ID` - You must go to [google cloud](https://console.cloud.google.com/apis/credentials) and create a new OAuth client ID

`NEXT_PUBLIC_FACEBOOK_APP_ID` - You must go to [facebook developers](https://developers.facebook.com/apps), create a new app and configure the sign in with facebook

- Example based on the .env.example file, located in the root of the application.

  ```bash
      NEXT_PUBLIC_DUMMY_API_HOST=https://dummyapi.io/data/v1
      NEXT_PUBLIC_DUMMY_APP_ID=659985211f6d5eb5cc8abdd9
      NEXT_PUBLIC_GOOGLE_CLIENT_ID=302245518061-bipqbqecglcfbc7l389amec913t09tcp.apps.googleusercontent.com
      NEXT_PUBLIC_FACEBOOK_APP_ID=2262313775553039
  ```

## Installation

- Clone the project

  ```bash
    git clone https://github.com/fabiangzvo/dummy-social-network.git
  ```

- Go to the project directory

  ```bash
    cd ~/Documents/dummy-social-network
  ```

- Install dependencies

  ```bash
    npm install || yarn install
  ```

- Start app

  ```bash
    npm run dev || yarn dev
  ```

  And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

- [@fabiangzvo](https://www.github.com/fabiangzvo)
