### Assignment Version Number: FE-2023-04-ii

## Api choices

- For getting the top 15 largest cities in the world by population i could have used a static array of the top 15 cities but i decided to use an api to get the data which is more dynamic and can be updated easily
  **api url: http://api.geonames.org/**

another reason i used this api is because it has an auto complete feature which is very useful for the user

- For getting the weather data i used the weatherapi.com api as it provides free forecast data for 3 days and allow 1M requests per month
  unlike the weatherstack api which only allows 1000 requests per month which is not enough for testing purposes

## Libraries

- to call the api i used the **axios** as it handles the errors very well and it is very easy to use

- for the data caching for offline use i used the **tanstack react-query** library as it is very easy to use and it has a lot of features like caching, refetching, pagination, etc. it uses the latest result from the cache and refetches in the when the user is online and it refetches the data every 5 minutes

- for the styling i used the **tailwindcss** library as it is very easy to use and it has a lot of features like dark mode, responsive design, etc.

- for the icons i used the **react-icons** library as it has a lot of icons

## Testing

- for testing i used the **jest** library as it is very easy to use and it has a lot of features like snapshot testing, etc.

## How to run the project

- clone the project
- run `npm install` to install the dependencies
- run `npm start` to start the project
- run `npm test` to run the tests

or you can visit the deployed version on netlify [here](https://weather-app-ahmed.netlify.app/)

## Screenshots

### dark mode

- home page
  ![dark home](./screenshots/dark-mode-home.jpeg)

- search results
  ![dark search](./screenshots/dark-mode-search.jpeg)

- weather details and notes
  ![dark search results](./screenshots/dark-mode-weather-details.jpeg)

### light mode

- home page
  ![light home](./screenshots/light-mode-home.jpeg)

- weather details and notes
  ![light search](./screenshots/light-mode-weather-details.jpeg)

#
