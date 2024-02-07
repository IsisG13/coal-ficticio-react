import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function GraficoConsultor() {
    const chartBarRef = useRef(null);
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

        // Gerar dados fictícios para cada consultor em cada mês
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < meses.length; j++) {
                resultados.push({
                    no_usuario: "Consultor " + String.fromCharCode(65 + i),
                    mes_referencia: meses[j],
                    receita_liquida: Math.floor(Math.random() * 10000) + 1000
                });
            }
        }

        var dataPorMes = {};
        resultados.forEach(consultor => {
            var mes = consultor.mes_referencia;
            if (!dataPorMes[mes]) {
                dataPorMes[mes] = [];
            }
            dataPorMes[mes].push({
                consultor: consultor.no_usuario,
                receita: consultor.receita_liquida
            });
        });

        var ctxBar = chartBarRef.current.getContext('2d');

        // Dados do gráfico de barras
        var datasetsBar = Object.keys(dataPorMes).map((mes, index) => ({
            label: mes,
            data: dataPorMes[mes].map(consultor => consultor.receita),
            backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`,
            borderWidth: 1
        }));

        var dataBar = {
            labels: Object.keys(dataPorMes[Object.keys(dataPorMes)[0]])
                .slice(0, 3)
                .map(index => dataPorMes[Object.keys(dataPorMes)[0]][index].consultor),
            datasets: datasetsBar
        };

        var optionsBar = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    labels: dataBar.labels
                },
                y: {
                    beginAtZero: true
                }
            }
        };

        var myBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: dataBar,
            options: optionsBar
        });

        // Dados do gráfico de pizza
        var dataPie = {
            labels: Object.keys(dataPorMes).map(mes => mes),
            datasets: [{
                data: Object.keys(dataPorMes).map(mes => {
                    // Calcula o total de receita para cada mês
                    var totalReceita = dataPorMes[mes].reduce((acc, consultor) => acc + consultor.receita, 0);
                    return totalReceita;
                }),
                backgroundColor: ['MistyRose', 'Honeydew', 'LightCyan', 'PeachPuff', 'Lavender', 'Thistle', 'LemonChiffon', 'Cornsilk', 'PaleTurquoise'],
            }]
        };

        // Configurações do gráfico de pizza
        var optionsPie = {
            responsive: true,
            plugins: {
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
            myBarChart.destroy();
            pieCleanup();
        };
    }, []); // Executar apenas uma vez na montagem do componente

    return (
        <div className="grafico-consultor">
            <h1>Grafico consultor</h1>
            <div style={{ width: '90%', height: '400px', margin: 'auto' }}>
                <canvas ref={chartBarRef}></canvas>
            </div>

            <div style={{ width: '39%', marginTop: '8%', marginLeft: '27%' }}>
                <canvas ref={chartPieRef}></canvas>
            </div>
        </div>
    );
}

export default GraficoConsultor;
