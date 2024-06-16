import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

document.addEventListener('DOMContentLoaded', () => {
    const bmiForm = document.querySelector('form[action="/calculate"]');
  
    if (bmiForm) {
      bmiForm.addEventListener('submit', async (e) => {
        e.preventDefault();
  
        const weight = document.querySelector('input[name="weight"]').value;
        const height = document.querySelector('input[name="height"]').value;
  
        try {
          const response = await fetch('/calculate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ weight, height })
          });
  
          if (!response.ok) {
            throw new Error('Error en el cálculo');
          }
  
          const result = await response.json();
          const resultDiv = document.getElementById('result');
  
          resultDiv.innerHTML = `
            <p>Tu IMC es ${result.bmi}</p>
            <p>Estás en la categoría: ${result.category}</p>
            <p>Recomendaciones: ${result.recommendations}</p>
          `;
        } catch (error) {
          console.error('Error:', error);
        }
      });
    }
  });
  