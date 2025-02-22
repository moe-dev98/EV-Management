# Getting Started with Create React App

The front end of the EV-Management project is a React application that uses Zustand to manage the state of one entity called "stations". It also uses Leaflet as a map library and rescharts for building charts.

## Available Scripts

In the project directory, you can run:

### `npm i`

Installs all the needed dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Pages

The app contains three main pages:

1. **Daily Overview**
     This page answers the following questions:
      - You are tasked with visualizing the output
      - The charging values (in kW) per chargepoint at a useful aggregation level
      - An exemplary day
      - The total energy charged (in kWh)
      
     Please note that the data used is generated randomly and is just mocked

2. **Analytics**
      This page answers the following questions:
      - You are tasked with visualizing the output
      - The number of charging events per year/month/week/day.
      - The deviation of the concurrency factor from the bonus task could be displayed (if
the previous bonus task was completed).

3. **Charging Stations**
This page answers the following questions
      - You are tasked with visualizing the input parameters.
      - Create a UI to allow creating different types of chargepoints (e.g. 5 x 11kW, 3 x
22kW, 1 x 50kW).

### Improvements

If this was a real task I would consider also:

     - Using a UI library to have more appealing forms and input UI's
     - Make the model closeable when clicking outside
     - Introduce a form and validation library for better code quality and easier development 
     - Adding success / failure snack bar as part of an HTTP interceptor when the DELETE , POST .. fail or succeed
     - Add NameExists , every charge station requires one charge Point at least , other field validation on the server side etc ..
     - Add data Export feature / pdf for every chart
     - Include page guarding with proper authentication (requires backend implementation , can be easily done with something like firebase if the task had more time)
     - Look into introducing an e2e test library like cypress
