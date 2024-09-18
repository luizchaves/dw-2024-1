import Chart from 'chart.js/auto';

let chart;

export function create(canvasId) {
  const ctx = document.getElementById(canvasId);

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          borderWidth: 2,
          borderColor: '#1e293b',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      maintainAspectRatio: false,
    },
  });

  return chart;
}

export function update(times) {
  chart.data.labels = Object.keys(times);

  chart.data.datasets[0].data = times;

  chart.update();
}
