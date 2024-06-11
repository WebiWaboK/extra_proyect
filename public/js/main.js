document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

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
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const resultDiv = document.querySelector('#result');
            resultDiv.innerHTML = `
                <p>Tu IMC es ${result.bmi}</p>
                <p>Estás en la categoría: ${result.category}</p>
                <p>${result.recommendations}</p>
            `;
        } catch (error) {
            console.error('Error:', error);
            const resultDiv = document.querySelector('#result');
            resultDiv.innerHTML = `<p>Hubo un error al calcular el IMC. Por favor, inténtelo de nuevo.</p>`;
        }
    });
});
