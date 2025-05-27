# Token Price Explorer

This web app is a simple interface for users to get a sense for token exchange rates between a source and target token.

### Running the app locally
1. Clone the app to a local directory, and install the dependencies to prepare for a local run:
```shell
npm install
```
2. This app makes use of the [`@funkit/api-base`](https://www.npmjs.com/package/@funkit/api-base) API/package, and requires an API key, accessed by the app through an environment variable. The Vercel deployment handles this variable on the production side. For running the app locally, create a `.env` file (I used `.env.local`), at the root of the project folder, with the API key in a variable named `VITE_FUNKIT_API_KEY` before proceeding.

3. Run the app with the script:
```shell
npm run dev
```
4. The terminal window will display the local URL the app is running at. Visit the link in your browser to view.
