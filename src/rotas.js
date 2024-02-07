import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/App";
import RelatorioConsultor from "./components/RelatorioConsultor";
import RelatorioCliente from "./components/RelatorioCliente";
import GraficoConsultor from "./components/GraficoConsultor";
import GraficoCliente from "./components/GraficoCliente";

function Rotas() {
    return (
        <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resultado-do-botao-relatorio" element={<RelatorioConsultor />} />
          <Route path="/resultado-do-botao-relatorio-cliente" element={<RelatorioCliente />} />
          <Route path="/resultado-do-botao-grafico" element={<GraficoConsultor />} />
          <Route path="/resultado-do-botao-grafico-cliente" element={<GraficoCliente />} />
        </Routes>
      </Router>
    )
}

export default Rotas;