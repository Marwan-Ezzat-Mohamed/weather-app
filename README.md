# Assignment Version Number: FE-2023-04-ii

## API Choices

So, for this assignment, I had to fetch data about the top 15 largest cities in the world by population. I had a choice here: I could have simply used a static array of these top 15 cities, but I decided to take a more dynamic approach and went with using an API to obtain this data. The API I used for this purpose can be found at the following URL: [http://api.geonames.org/](http://api.geonames.org/).

One of the main reasons I opted for this API was its handy auto-complete feature, which I believed would greatly enhance the user experience.

Now, when it came to fetching weather data, I chose to work with the weatherapi.com API. This API offered a couple of appealing features, including providing free forecast data for 3 days and allowing 1 million requests per month. In comparison, another option I considered, the weatherstack API, only allowed 1000 requests per month, which I found insufficient for testing purposes.

## Libraries

In terms of libraries, here's what I used:

- To make API calls, I relied on **axios**. It's a dependable choice, handling errors gracefully and boasting user-friendly usage.

- For data caching to enable offline functionality, I turned to **tanstack react-query**. This library is a breeze to work with, offering features such as caching, refetching, and pagination. It's smart enough to use cached results when available and automatically refetches data when the user is online, refreshing the cache every 5 minutes.

- For styling, I went with **tailwindcss**. This library is an absolute gem, known for its ease of use and packed with useful features like dark mode and responsive design, didn't use any components library.

- When it came to icons, I used **react-icons**, which offers an extensive collection of icons.

## Testing

To ensure the reliability of the application, I employed **jest** and wrote unit tests for the most components.

## How to Run the Project

To get this project up and running, follow these simple steps:

1. Clone the project to your local environment.
2. Run `npm install` to install all the necessary dependencies.
3. Execute `npm start` to launch the project.
4. For running tests, use `npm test`.

Alternatively, you can also access the deployed version of the project on Netlify by clicking [here](https://weather-app-ahmed.netlify.app/).

## Screenshots

### Dark Mode

- **Home Page**
  ![Dark Home](./screenshots/dark-mode-home.jpeg)

- **Search Results**
  ![Dark Search](./screenshots/dark-mode-search.jpeg)

- **Weather Details and Notes**
  ![Dark Search Results](./screenshots/dark-mode-weather-details.jpeg)

### Light Mode

- **Home Page**
  ![Light Home](./screenshots/light-mode-home.jpeg)

- **Weather Details and Notes**
  ![Light Search](./screenshots/light-mode-weather-details.jpeg)
