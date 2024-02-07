import "../App.css";

function Home() {
  return (
    <div className="App">
      <main className="Caol">
        <h1>Informações do site Caol</h1>

        <div class="botoes">
          <h2>Aba consultor</h2>
          <div className="botoes-consultor">
          <div className="conteudo-botao">
            <a href="/resultado-do-botao-relatorio">
              <button>Relatório consultor</button>
            </a>
          </div>

          <div className="conteudo-botao-grafico">
            <a href="/resultado-do-botao-grafico">
              <button>Gráfico consultor</button>
            </a>
          </div>
          </div>
        </div>

        <div class="botoes">
          <h1>Aba cliente</h1>
          <div className="botoes-cliente">
          <div className="conteudo-botao">
            <a href="/resultado-do-botao-relatorio-cliente">
              <button>Relatório cliente</button>
            </a>
          </div>

          <div className="conteudo-botao-grafico">
            <a href="/resultado-do-botao-grafico-cliente">
              <button>Gráfico cliente</button>
            </a>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
