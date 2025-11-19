# Mode Share Dashboard - City of Vancouver
## A03: Functional Code Implementation

---

## 🔗 Online Version

**View the live dashboard here:** [https://vancouverdashboard.netlify.app/](https://vancouverdashboard.netlify.app/)



---

## 📋 Overview

This project is the functional implementation of the Mode Share Dashboard for the City of Vancouver's Healthy City Dashboard. It displays transportation mode share data (trips made by foot, bike, or transit) through interactive visualizations and expanding content sections.

The dashboard was built using HTML, CSS, JavaScript, Chart.js for data visualization, and Leaflet.js for interactive mapping.

---

## 🚀 Running Locally

### Requirements

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A local server to properly load JSON data files
  - **Option 1:** VS Code with Live Server extension
  - **Option 2:** Python HTTP Server

### Steps to Run

1. **Download all project files** and place them in the same directory:
   ```
   index.html
   style.css
   index.js
   data.json
   indicator-data.json
   ```

2. **Start a local server**

   **Using VS Code Live Server:**
   - Open the project folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   Then open your browser and go to: `http://localhost:8000`

3. **View the dashboard** - You should see the fully functional dashboard with interactive charts and maps.

**Note:** A local server is required because the browser's fetch() API needs proper HTTP protocol to load JSON files.

---

## Core Functionalities

- **Interactive Map:** Click on different geographical regions within Vancouver to select and compare data (up to 4 regions at once)
- **Dynamic Charts:** Two Chart.js visualizations that display mode share data
  - Region comparison chart that updates based on map selections
  - Bar chart showing actual vs target trips over multiple years
- **Expandable Accordions:** Collapsible sections explaining why and how the data is measured
- **Data Integration:** Fetches and displays real data from two JSON sources (data.json and indicator-data.json)
- **Responsive Design:** Clean layout that adapts to different screen sizes

---

## Limitations

- The dataset is limited to available years and may contain null values for certain periods
- Map data is based on pre-loaded GeoJSON boundaries and is not connected to a live database
- Chart interactivity is limited to hover tooltips and click selections on map polygons
- Some navigation links in the header are placeholders and not fully functional
- The "Explore This Dataset" button is a placeholder

---

## File Structure

```
├── index.html              # Main HTML structure and layout
├── style.css              # Visual styling and responsive design
├── index.js               # JavaScript for charts, map, and interactions
├── data.json              # Mode share data (actual vs target by year)
├── indicator-data.json    # Geographic and regional indicator data
└── README.md              # Project documentation
```

---

## Project Information

**Authors:** Hilal Malik and Char  
**Course:** FDIT 2140 - Design and Development Integration Studio  
**Instructor:** Gil Barros  
**Institution:** Algonquin College  
**Date:** November 2025

---

## 🛠️ Technologies Used

- HTML5
- CSS3 (with Poppins font from Google Fonts)
- JavaScript (ES6)
- Chart.js (data visualization library)
- Leaflet.js (interactive mapping library)
- JSON (data storage)

---

## 📝 Notes

This dashboard is part of a larger project to redesign the City of Vancouver's Healthy City Dashboard with improved user experience and data visualization. The design focuses on clarity, accessibility, and interactive data exploration for city data analysts and residents.