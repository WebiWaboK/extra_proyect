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

        // Aquí puedes agregar el código para actualizar la gráfica con los resultados.
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
});
