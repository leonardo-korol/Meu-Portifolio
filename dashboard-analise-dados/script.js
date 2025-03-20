document.addEventListener("DOMContentLoaded", () => {
    let salesData = [100, 200, 150, 300, 250, 400, 450]; // Dados iniciais
    let salesSum = salesData.reduce((a, b) => a + b, 0);
    
    const usersCount = document.getElementById("usersCount");
    const salesCount = document.getElementById("salesCount");
    const profitCount = document.getElementById("profitCount");
    const salesForm = document.getElementById("salesForm");
    const newSaleValue = document.getElementById("newSaleValue");

    // Atualiza os valores no painel
    function updateDashboard() {
        usersCount.innerText = Math.floor(Math.random() * 500);
        salesCount.innerText = salesData.length;
        profitCount.innerText = `R$ ${salesSum}`;
    }

    // Criação do gráfico
    const ctx = document.getElementById("salesChart").getContext("2d");
    let salesChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"],
            datasets: [{
                label: "Vendas",
                data: salesData,
                borderColor: "#3498db",
                backgroundColor: "rgba(52, 152, 219, 0.2)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Evento para adicionar uma nova venda
    salesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const saleValue = parseInt(newSaleValue.value);
        if (!isNaN(saleValue) && saleValue > 0) {
            salesData.push(saleValue);
            salesSum += saleValue;

            // Atualiza gráfico
            salesChart.data.labels.push(`Mês ${salesData.length}`);
            salesChart.data.datasets[0].data.push(saleValue);
            salesChart.update();

            // Atualiza painel
            updateDashboard();
        }

        // Limpa o campo
        newSaleValue.value = "";
    });

    // Alternância de tema
    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️ Modo Claro" : "🌙 Modo Escuro";
    });

    // Atualiza os valores iniciais do dashboard
    updateDashboard();
});
