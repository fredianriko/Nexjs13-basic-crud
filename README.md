# Intro

This project is following tutorial for Next.js Indonesian version, Thanks to this [Creator](https://www.youtube.com/watch?v=A4XsMMiNb40&ab_channel=CoderMedia)

<!-- Installation -->

1. Go to the `first` directory from terminal, and run `npm install` to install all the dependencies
2. Make sure to install manually `json-server` globally on your machine as a fake server for this project purpose
3. Make sure the `json-server` already installed by check to the terminal with command `json-server -v`, this will tell you the version of json server you're installing

4. Then, open new terminal from your IDE (mine vscode), and run the `db.json` from `/first` with below command
5. Make sure the `port` to run the fake server is different than the port for running the `Next.js` project

```json

json-server -w db.json -5000

```

# Command explanation

1. `json-server` calling the fake server
2. `-w` watch mode
3. `db.json` the fake database
4. `-5000` the port to run the fake server

<!-- Running the project -->

Run below command adjusting the package manager your are using, I'm using `npm` and make sure to run this from seperate terminal, so you now have 2 open terminal, which 1 running the fake server, and the second one running the Next.js project

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Extra Dependencies

This project use daisyUI + Tailwind Css

# Next step

- Deploy to Vercel

- Read other feature available in Nextjs
