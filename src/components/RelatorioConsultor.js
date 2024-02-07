import React from "react";
import relatorioConsultorData from "./relatorioConsultor.json";

function RelatorioConsultor() {
  return (
    <div className="relatorio-consultor">
      <h1>Relatório Consultor</h1>
      {relatorioConsultorData.map((resultado, index) => (
        <div key={index} className="conteudoRelatorio">
          <p className="usuario">Usuário: <br/>{resultado.no_usuario}</p>
          <p>Sistema: <br/>{resultado.co_sistema}</p>
          <p>Ativo: <br/>{resultado.in_ativo}</p>
          <p>Tipo Usuário: <br/>{resultado.co_tipo_usuario}</p>
          <p>Receita: <br/>{resultado.receita_liquida}</p>
          <p>Custo: <br/>{resultado.custo_fixo}</p>
          <p>Comissão: <br/>{resultado.comissao}</p>
          <p>Lucro: <br/>{resultado.lucro}</p>
        </div>
      ))}
    </div>
  );
}

export default RelatorioConsultor;
