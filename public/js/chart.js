document.addEventListener('DOMContentLoaded', function () {
  let chartInstance = null; // Variable to hold the chart instance
  
  document.querySelector('#bmiForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const weight = document.querySelector('input[name="weight"]').value;
    const height = document.querySelector('input[name="height"]').value;
    const response = await fetch('/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ weight, height })
    });
    const result = await response.json();
    console.log('Calculate Result:', result); // Log de los resultados del cálculo
    document.querySelector('#result').innerHTML = `
      <div class="result-container">
        <h1>Resultados de IMC</h1>
        <div class="result-details">
          <p>Tu IMC es <span class="result-value">${result.bmi}</span></p>
          <p>Estás en la categoría: <span class="result-category">${result.category}</span></p>
          <p>Recomendaciones: <span class="result-recommendations">${result.recommendations}</span></p>
        </div>
        <a class="button" href="/imc">Calcular de nuevo</a>
        <div class="chart-container">
          <canvas id="bmiChart"></canvas>
        </div>
      </div>
    `;
  
    // Mostrar el mensaje de información si el usuario no está logueado
    const infoMessage = document.getElementById('info-message');
    if (infoMessage) {
      infoMessage.style.display = 'block';
    }
  
    // Destroy the previous chart instance if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }
  
    const ctx = document.getElementById('bmiChart').getContext('2d');
    chartInstance = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: 'Rango de IMC',
            data: [
              { x: 13.5, y: 0 },
              { x: 18.5, y: 0 },
              { x: 25, y: 0 },
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
            label: 'Tu IMC',
            data: [{
              x: result.bmi < 13.5 ? 13.5 : (result.bmi > 30 ? 30 : result.bmi),
              y: 0
            }],
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
            min: 13.5,
            max: 30,
            title: {
              display: true,
              text: 'IMC'
            },
            grid: {
              display: false
            },
            ticks: {
              callback: function(value) {
                if (value === 13.5) return 'Bajo peso';
                if (value === 18.5) return 'Peso normal';
                if (value === 25) return 'Sobrepeso';
                if (value === 30) return 'Obesidad';
                return '';
              }
            }
          },
          y: {
            display: false,
            min: -1,
            max: 1
          }
        },
        plugins: {
          annotation: {
            annotations: {
              line1: {
                type: 'line',
                xMin: 13.5,
                xMax: 30,
                yMin: 0,
                yMax: 0,
                borderColor: 'black',
                borderWidth: 2
              },
              point1: {
                type: 'line',
                xMin: 13.5,
                xMax: 13.5,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Bajo peso',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point2: {
                type: 'line',
                xMin: 18.5,
                xMax: 18.5,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Peso normal',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point3: {
                type: 'line',
                xMin: 25,
                xMax: 25,
                yMin: -1,
                yMax: 1,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'Sobrepeso',
                  enabled: true,
                  position: 'end',
                  yAdjust: 10 // Ajusta la posición vertical de la etiqueta
                }
              },
              point4: {
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
  });
});
