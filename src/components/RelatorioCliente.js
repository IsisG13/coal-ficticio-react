import React from "react";
import resultados from "./relatorioCliente.json";
import "../styles/stylesComponents.css";

function RelatorioCliente() {
    return (
        <div className="relatorio-cliente">
            <h1> Relatorio Cliente</h1>
            {resultados.map(resultado => (
                <div key={resultado.co_cliente} className={`conteudoRelatorio ${resultado.is_champion === 1 ? 'bg-blue-200' : 'bg-transparent'}`}>
                    <h4>Nome de Contato: <br />{resultado.no_contato}</h4>
                    <h5>Número de Telefone: <br />{resultado.nu_telefone}</h5>
                    <h4>Mês de Emissão: <br />{resultado.mes_referencia}</h4>
                    <h5>Receita: <br />{resultado.receita}</h5>
                    <div className={`champion-badge ${resultado.is_champion === 1 ? 'champion-true' : 'champion-false'}`}></div>
                    {resultado.is_champion === 1 ? <h3 className="champion"></h3> : <h3 className="champion-false"></h3>}
                </div>
            ))}
        </div>
    );
}

export default RelatorioCliente;
