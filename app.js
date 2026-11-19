document.addEventListener('DOMContentLoaded', () => {
    // Lógica para la página principal (index.html)
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionList = document.getElementById('transaction-list');
    const btnClear = document.getElementById('btn-clear');
    const errorMsg = document.getElementById('error-msg');

    if (form) {
        // Cargar movimientos guardados previamente en localStorage (opcional pero útil)
        loadTransactions();

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const description = descriptionInput.value.trim();
            const amount = amountInput.value.trim();

            if (!description || !amount) {
                errorMsg.style.display = 'block';
                return;
            }

            errorMsg.style.display = 'none';
            addTransactionToDOM(description, amount);
            saveTransaction(description, amount);

            form.reset();
        });

        if (btnClear) {
            btnClear.addEventListener('click', () => {
                transactionList.innerHTML = '';
                localStorage.removeItem('transactions');
            });
        }
    }

    function addTransactionToDOM(description, amount) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${description}</span> <strong>$${parseFloat(amount).toFixed(2)}</strong>`;
        transactionList.appendChild(li);
    }

    function saveTransaction(description, amount) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.push({ description, amount });
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function loadTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.forEach(t => addTransactionToDOM(t.description, t.amount));
    }

    // Lógica para la página de Tasas y API (tasas.html)
    const btnFetchApi = document.getElementById('btn-fetch-api');
    const apiStatus = document.getElementById('api-status');
    const apiData = document.getElementById('api-data');

    if (btnFetchApi) {
        btnFetchApi.addEventListener('click', async () => {
            apiStatus.textContent = 'Consultando...';
            apiData.textContent = '';

            try {
                // Usamos una API pública y gratuita (RestCountries para buscar información de moneda)
                const response = await fetch('https://restcountries.com/v3.1/currency/dop');
                
                if (!response.ok) {
                    throw new Error(`Error en la petición: ${response.status}`);
                }

                const data = await response.json();
                apiStatus.textContent = `Éxito (Status: ${response.status} OK)`;
                apiData.innerHTML = `País consultado: <strong>${data[0].name.common}</strong><br>Moneda: ${data[0].currencies.DOP.name} (${data[0].currencies.DOP.symbol})`;
            } catch (error) {
                apiStatus.textContent = 'Fallido';
                apiData.textContent = `Error: ${error.message}`;
            }
        });
    }
});