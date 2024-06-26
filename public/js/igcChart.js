import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const resultDiv = document.getElementById('result');

  if (resultDiv) {
    const { igc } = resultDiv.dataset;

    const ctx = document.getElementById('igcChart').getContext('2d');
    new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Rango de IGC',
            data: [
              { x: 6, y: 0 },
              { x: 13, y: 0 },
              { x: 17, y: 0 },
              { x: 24, y: 0 },
              { x: 30, y: 0 }
            ],
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            showLine: true,
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Tu IGC',
            data: [{ x: parseFloat(igc), y: 0 }],
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointRadius: 10,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'IGC'
            },
            min: 0,
            max: 40,
            grid: {
              display: false
            },
            ticks: {
              callback: function(value) {
                if (value === 6) return 'Esencial para la vida';
                if (value === 13) return 'Atletas';
                if (value === 17) return 'Fitness';
                if (value === 24) return 'Aceptable';
                if (value === 30) return 'Obesidad';
                return '';
              }
            }
          },
          y: {
            display: false
          }
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: 6,
                xMax: 30,
                yMin: 0,
                yMax: 0,
                borderColor: 'black',
                borderWidth: 2
              },
              point1: {
                type: 'line',
                xMin: 6,
                xMax: 6,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Esencial para la vida',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point2: {
                type: 'line',
                xMin: 13,
                xMax: 13,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Atletas',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point3: {
                type: 'line',
                xMin: 17,
                xMax: 17,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Fitness',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point4: {
                type: 'line',
                xMin: 24,
                xMax: 24,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Aceptable',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point5: {
                type: 'line',
                xMin: 30,
                xMax: 30,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Obesidad',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              }
            }
          }
        }
      }
    });
  }
});
