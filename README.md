A03: Functional Code — Mode Share Dashboard (City of Vancouver)
_____________________________________________________________________________________
_____________________________________________________________________________________
#Overview

This project represents the functional version of the Mode Share Dashboard within the City of Vancouver’s Healthy City Dashboard.

It connects back-end JSON data to the front-end interface, implementing interactive charts and expanding content for the selected persona — a city data analyst reviewing transportation mode share trends.

The dashboard was created using HTML, CSS, JavaScript (Chart.js), and JSON data.

_____________________________________________________________________________________
_____________________________________________________________________________________

#Online Version

You can view the hosted version of the functional dashboard here:

[Online Functional Dashboard Link]

https://functionalcode.netlify.app/

GitHub link: https://github.com/papjihaihumaapke/CITY-DASHBOARD-CODE

Figma Design Reference: https://www.figma.com/design/y4abRzZtr21u61JcTXvMoE/Hi-fi-Design-Char-Hilal?node-id=1-1843&t=reje4niLMNcoJTsV-1
_____________________________________________________________________________________
_____________________________________________________________________________________

#Running Locally
---
1. Requirements


1.a: A modern web browser (Chrome, Firefox, or Edge)

1.b: A local server to properly load JSON data (recommended: VS Code Live Server or Python HTTP Server)

2. Steps

2.a: Extract all files in the same directory:

index.html
style.css
index.js
data.json
____________________________________
2.b: Run a local server (because fetch() requires one):

Using VS Code Live Server

Using Python:
____________________________________
python -m http.server 8000

Open your browser and go to:

http://localhost:8000

_____________________________________________________________________________________
_____________________________________________________________________________________


You should see the fully functional dashboard that dynamically fetches JSON data and displays it in charts.

Alternatively, use the deployed version online:
https://functionalcode.netlify.app/



_____________________________________________________________________________________
_____________________________________________________________________________________



#Core Functionalities

Fetches and displays real data from data.json

Renders interactive bar charts using Chart.js

Includes expandable accordion sections for contextual information

Responsive layout and clean styling

_____________________________________________________________________________________
_____________________________________________________________________________________


#Limitations

Map visualization and navigation links are placeholders

The JSON dataset is limited and not connected to a live database

Chart interactivity is limited to hover and tooltip responses
_____________________________________________________________________________________
_____________________________________________________________________________________


#File Structure

├── index.html      # Main UI
├── style.css       # Visual styles and layout
├── index.js        # JavaScript logic for chart and interaction
├── data.json       # JSON data source
├── logo            # City of Vancouver logo (placeholder)
└── README.md       # Documentation and usage instructions
_____________________________________________________________________________________
_____________________________________________________________________________________



Author: Hilal and Char
Course: FDIT 2140 - Design and Development Integration Studio
Instructor: Gil Barros
Date: 04 November 2025