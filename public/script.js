document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operacion = document.getElementById('operation').value;

    fetch('http://localhost:3000/api/operacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ num1, num2, operacion })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById('result').innerHTML = `<span style="color: red;">${data.error}</span>`;
        } else {
            document.getElementById('result').innerHTML = `Resultado: ${data.result}`;
            document.getElementById('timestamp').innerHTML = `Timestamp: ${data.timestamp}`;
        }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<span style="color: red;">Hubo un error al calcular.</span>`;
    });
});
