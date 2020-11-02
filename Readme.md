**FT Multiple Fetch Example**

  `src/fetchHelper.js`
  -  Accepts multiple URLs in Array or single URL String
  -  Process all URLS and return response 
  -  If any URL failed it will not interrupt or throw error , captures error in errors array and returns along with all other APIs response
  - Setting  `throwErrorIfOneFails =true ` throws error immediately on any API call fails

`src/fetchHelper.test.js`

    - Unit Test coverage fro FetchHelper
  `src/index.js`
    -  Simple Script that calls FX API USD, GBP and EUR base price and append them to table in index.html 
  
  **Running App**
    - `npm start`  to start the app in development open browser in  `http://localhost:9100/`
    - `npm run build`  for production build 
    - `npm run test`  for run Unit tests

 **Frameworks Used** 

 - `jest` framework for unit tests
 - `jest-fetch-mock` to mock Fetch
 - `regenerator-runtime/runtime.js` for enabling runtime `async await`
 - `webpack` for app production build packaging and running in development mode