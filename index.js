const accItems = document.querySelectorAll(".accordian-item");

accItems.forEach(item => {
  const header = item.querySelector(".accordian-header");

  header.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});


fetch("./data.json")
  .then(response => response.json())
  .then(data => {
    
    const labels = data.map(item => item.x.year);
    const actualData = data.map(item => item["serie1-1"] ?? null);
    const targetData = data.map(item => item["serie1-2"] ?? null);

    const ctx = document.getElementById("modeShareChart").getContext("2d");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Actual Trips",
            data: actualData,
            backgroundColor: "#000000"
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
            }
          }
        }
      }
    });

  })
  .catch(error => console.error("Error loading JSON:", error));
