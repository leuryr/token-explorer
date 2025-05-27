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

## Notes:
### Token List
I assumed list support need not be limited to the inital tokens provided (which I added as a "featured tokens" list in the token selector modal). So I looked into fetching a token list from an external source.

Given the params of the `getAssetErc20ByChainAndSymbol` method `{ chainId, symbol, ...options }`, I knew I needed to find one that provided publicly availbale info with the `chainId` and `symbol` for each token, but most of them provided more than that (including icon URIs 🎉). Since it seemed like the method was only needed, in the path to getting price info, to get a token's blockchain address, I assumed it would be ok to forego the method entirely since the fetched token list I went with provided those details already.

Additionally, I implemented RTK Query to cache the returned list and prevent unnecessary refetching while using the app.

### Token Selector
The support for additional tokens would have been harder to achieve with the button selectors in the wireframe, or the initial dropdown I created, so I decided on a modal. Given the long list, and no filtering data, like 24H volume, for example, that Uniswap uses, I opted to instead just allow the user to search for a token symbol or address, with a featured list at the top to show the initial tokens provided. Unfortunately, there are some notable omissions from the fetched token list (ETH being the most glaring one), so definitely not perfect.

Also, I couldn't find a source that provided fetchable icon data on the different chains (Base, Polygon, etc.), so I instead included the `chainId` values in the search results to differentiate similar symbols.

### Misc
- Included a cleaning function for token value input sanitation, preventing unsupported symbols, or letters, for both typed and pasted inputs.
- Deboucing token search input, and manual canceling of already called function if input is cleared.
- As far as styling, token icons, resonsive design for mobile, light/dark mode colors based on system settings

## Additional libaries included
- [RTK (with Query)](https://redux-toolkit.js.org/) for easier state management, and token list caching/refetching control
- [Fuse.js](https://www.fusejs.io/) for token search support, and showing a filtered list
- [Tailwind CSS](https://tailwindcss.com/) for easier styling, and quick access to theme and breakpoint variants

## Things I didn't get to but would have liked to
- Better display of decimal precision in token values
- Styling: Custom fonts, better UI design, transitions/animations for certain actions
- Fetching pricing on an interval after user input value is entered, and token is selected (crypto unit prices irl don't stay static)
- I'm sure I'll think of some more later (there's never a shortage of things to improve on, but it's always good to be weary of scope creep, haha)
