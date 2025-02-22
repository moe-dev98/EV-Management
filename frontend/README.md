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