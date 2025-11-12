// ==========================
// Accordion Behavior
// ==========================
const accItems = document.querySelectorAll(".accordian-item");
accItems.forEach(item => {
  const header = item.querySelector(".accordian-header");
  header?.addEventListener("click", () => {
    const isActive = item.classList.toggle("active");
    header.setAttribute("aria-expanded", String(isActive));
  });
});

// ==========================
// Leaflet Map Setup
// ==========================
const map = L.map("map").setView([49.25, -123.1], 11);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
}).addTo(map);

const COLORS = ["#1f78b4", "#33a02c", "#e31a1c", "#ff7f00"];
const zoneLayers = new Map();
const zoneNameById = new Map();
const zoneDataById = new Map();
let selectedIds = [];

// ==========================
// Load and Render Map + Indicator Data (indicator-data.json)
// ==========================
fetch("indicator-data.json")
  .then(res => res.json())
  .then(data => {
    const features = Array.isArray(data) ? data : data.records || [];

    features.forEach(record => {
      const id = +record.geographyid;
      const name = record.geographyname;
      const year = +record.periodend?.slice(0, 4) || +record.periodlabel || null;
      const val = record.actualvalue != null ? +record.actualvalue : null;
      const geom = record.geom?.geometry || record.geometry;

      if (!id || !name || !geom) return;

      // Store data for each zone
      if (!zoneDataById.has(id)) zoneDataById.set(id, []);
      if (val !== null) zoneDataById.get(id).push({ year, value: val });
      zoneNameById.set(id, name);

      // Draw map polygons
      if (!zoneLayers.has(id)) {
        const layer = L.geoJSON(geom, {
          style: { color: "#555", weight: 1, fillColor: "#ddd", fillOpacity: 0.5 }
        }).addTo(map);

        layer.bindTooltip(name, { sticky: true });
        layer.on("click", () => onPolygonClick(id));
        zoneLayers.set(id, layer);
      }
    });

    // Fit all polygons into initial map view
    const allBounds = L.featureGroup([...zoneLayers.values()]).getBounds();
    map.fitBounds(allBounds, { padding: [10, 10] });
  })
  .catch(err => console.error("Error loading indicator-data.json:", err));

// ==========================
// Chart 1: Region Chart (indicator-data.json)
// ==========================
const ctxRegion = document.getElementById("regionChart").getContext("2d");
let regionChart = null;

function renderRegionChart(years, datasets) {
  if (regionChart) regionChart.destroy();
  regionChart = new Chart(ctxRegion, {
    type: "bar",
    data: { labels: years, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        title: {
          display: true,
          text: "Mode Share by Year (% Walking, Biking, or Transit)"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { stepSize: 10 },
          title: { display: true, text: "Percent" }
        },
        x: { title: { display: true, text: "Year" } }
      }
    }
  });
}

function updateRegionChart(selectedIds) {
  if (!selectedIds.length) {
    if (regionChart) regionChart.destroy();
    return;
  }

  const allYears = new Set();
  const datasets = selectedIds.map((id, i) => {
    const records = zoneDataById.get(id) || [];
    records.forEach(r => allYears.add(r.year));
    return { id, color: COLORS[i], records };
  });

  const years = Array.from(allYears).sort((a, b) => a - b);
  const chartData = datasets.map(ds => ({
    label: zoneNameById.get(ds.id),
    data: years.map(y => ds.records.find(r => r.year === y)?.value ?? null),
    backgroundColor: ds.color,
    borderColor: "#333",
    borderWidth: 1
  }));

  renderRegionChart(years, chartData);
}

// ==========================
// Map Click Behavior
// ==========================
function onPolygonClick(id) {
  // Toggle selection
  if (selectedIds.includes(id)) {
    selectedIds = selectedIds.filter(x => x !== id);
  } else {
    if (selectedIds.length >= 4) {
      alert("You can only compare up to 4 areas at once.");
      return;
    }
    selectedIds.push(id);
  }

  highlight(selectedIds);
  updateRegionChart(selectedIds);
}

function highlight(selectedIds) {
  zoneLayers.forEach((layer, id) => {
    const idx = selectedIds.findIndex(x => x === id);
    const color = idx >= 0 ? COLORS[idx] : "#555";
    layer.setStyle({
      color,
      weight: idx >= 0 ? 3 : 1,
      fillColor: idx >= 0 ? color : "#ddd",
      fillOpacity: idx >= 0 ? 0.8 : 0.5
    });
  });
}

// ==========================
// Chart 2: Mode Share Comparison (data.json)
// ==========================
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.x.year);
    const actualData = data.map(item => item["serie1-1"] ?? null);
    const targetData = data.map(item => item["serie1-2"] ?? null);

    const ctxMode = document.getElementById("modeShareChart").getContext("2d");

    new Chart(ctxMode, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Actual Trips",
            data: actualData,
            backgroundColor: "#278CD4"
          },
          {
            label: "Target Trips",
            data: targetData,
            backgroundColor: "#16853E"
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          title: { display: true, text: "Trip Comparison (Actual vs Target)" },
          tooltip: {
            callbacks: {
              label: ctx => ctx.parsed.y + "%"
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => value + "%"
            },
            title: { display: true, text: "Percent" }
          },
          x: {
            title: { display: true, text: "Year" }
          }
        }
      }
    });
  })
  .catch(error => console.error("Error loading data.json:", error));
