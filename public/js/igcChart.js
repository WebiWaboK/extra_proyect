import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const igcForm = document.querySelector('form[action="/igc/calculate"]');

  if (igcForm) {
    igcForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const weight = document.querySelector('input[name="weight"]').value;
      const height = document.querySelector('input[name="height"]').value;
      const waist = document.querySelector('input[name="waist"]').value;
      const hip = document.querySelector('input[name="hip"]').value;
      const neck = document.querySelector('input[name="neck"]').value;
      const gender = document.querySelector('select[name="gender"]').value;
      const age = document.querySelector('input[name="age"]').value;

      try {
        const response = await fetch('/igc/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ weight, height, waist, hip, neck, gender, age })
        });

        if (!response.ok) {
          throw new Error('Error en el cálculo');
        }

        const result = await response.json();
        const resultDiv = document.getElementById('result');

        resultDiv.innerHTML = `
          <p>Tu IGC es ${result.igc}%</p>
          <p>Estás en la categoría: ${result.category}</p>
          <p>Recomendaciones: ${result.recommendations}</p>
        `;

        // Crear gráfico
        const ctx = document.getElementById('igcChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Esencial para la vida', 'Atletas', 'Fitness', 'Aceptable', 'Obesidad'],
            datasets: [{
              label: 'IGC',
              data: [6, 13, 17, 24, 30], // Ejemplo de datos
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});
