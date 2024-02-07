import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function GraficoCliente() {
    const chartLineRef = useRef(null);
    const chartPieRef = useRef(null);

    useEffect(() => {
        // Função para criar e destruir o gráfico de pizza
        const createAndDestroyPieChart = (ctx, data, options) => {
            const myPieChart = new Chart(ctx, {
                type: 'pie',
                data: data,
                options: options
            });

            return () => {
                myPieChart.destroy();
            };
        };

        // Dados fictícios para os gráficos
        var resultados = [];
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'];

        // Gerar dados fictícios para cada cliente em cada mês
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < meses.length; j++) {
                resultados.push({
                    no_contato: "Cliente " + String.fromCharCode(65 + i),
                    mes_referencia: meses[j],
                    receita: Math.floor(Math.random() * 10000) + 1000
                });
            }
        }

        // Organizando os dados por mês e cliente
        var dataPorMes = {};
        resultados.forEach(cliente => {
            var mes = cliente.mes_referencia;
            if (!dataPorMes[mes]) {
                dataPorMes[mes] = [];
            }
            dataPorMes[mes].push({
                cliente: cliente.no_contato,
                receita: cliente.receita
            });
        });

        // Obtendo a referência para o elemento canvas do gráfico de linhas
        var ctxLine = chartLineRef.current.getContext('2d');

        // Dados do gráfico de linhas
        var datasetsLine = Object.keys(dataPorMes).map((mes, index) => ({
            label: mes,
            data: dataPorMes[mes].map(cliente => cliente.receita),
            borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
            borderWidth: 2
        }));

        var dataLine = {
            labels: Object.keys(dataPorMes).map((mes, index) => `Cliente ${String.fromCharCode(65 + index)}`),
            datasets: datasetsLine
        };

        // Configurações do gráfico de linhas
        var optionsLine = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: dataLine.labels
                },
                y: {
                    beginAtZero: true
                }
            }
        };

        // Criando o gráfico de linhas
        var myLineChart = new Chart(ctxLine, {
            type: 'line',
            data: dataLine,
            options: optionsLine
        });

        // Dados do gráfico de pizza
        var dataPie = {
            labels: Object.keys(dataPorMes).map(mes => mes),
            datasets: [{
                data: Object.keys(dataPorMes).map(mes => {
                    // Calcula o total de receita para cada mês
                    var totalReceita = dataPorMes[mes].reduce((acc, cliente) => acc + cliente.receita, 0);
                    return totalReceita;
                }),
                backgroundColor: ['MistyRose', 'Honeydew', 'LightCyan', 'PeachPuff', 'Lavender', 'Thistle', 'LemonChiffon', 'Cornsilk', 'PaleTurquoise'],
            }]
        };

        // Configurações do gráfico de pizza
        var optionsPie = {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        var total = dataPie.datasets[0].data.reduce((acc, val) => acc + val, 0);
                        var percentage = ((value / total) * 100).toFixed(2) + '%';
                        return `${ctx.chart.data.labels[ctx.dataIndex]}: ${percentage}`;
                    },
                    color: '#fff',
                    anchor: 'end',
                    align: 'start',
                }
            }
        };

        // Criar o gráfico de pizza
        const pieCleanup = createAndDestroyPieChart(chartPieRef.current.getContext('2d'), dataPie, optionsPie);

        return () => {
            myLineChart.destroy();
            pieCleanup();
        };
    }, []); // Executar apenas uma vez na montagem do componente

    return (
        <div className="grafico-cliente">
            <h1>Grafico Cliente</h1>

            {/* Gráfico de Linhas */}
            <div style={{ width: '90%', height: '400px', margin: 'auto' }}>
                <canvas ref={chartLineRef}></canvas>
            </div>

            {/* Gráfico de Pizza */}
            <div style={{ width: '74%', marginTop: '5%', marginLeft: '14%' }}>
                <canvas ref={chartPieRef}></canvas>
            </div>
        </div>
    );
}

export default GraficoCliente;
