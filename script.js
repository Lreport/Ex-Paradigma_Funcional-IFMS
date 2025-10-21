
const TOTAL_EMBARCACOES = 50;
let embarcacoes = [];


class Embarcacao {
    constructor(id, comprimento, motorizacao, possuiConvesAberto, possuiCabineHabitavel) {
        this.id = id;
        this.comprimento = comprimento;
        this.motorizacao = motorizacao;
        this.possuiConvesAberto = possuiConvesAberto;
        this.possuiCabineHabitavel = possuiCabineHabitavel;
    }
}


function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function boolAleatorio() {
    return Math.random() < 0.5;
}


function gerarEmbarcacoes() {
    embarcacoes = [];
    
    for (let i = 0; i < TOTAL_EMBARCACOES; i++) {
        const NOVA_EMBARCACAO = new Embarcacao(
            i + 1,
            numAleatorio(3, 12),
            numAleatorio(10, 150),
            boolAleatorio(),
            boolAleatorio()
        );
        
        embarcacoes.push(NOVA_EMBARCACAO);
    }
    
    console.log('As 50 embarcações foram geradas com sucesso!');
    exibirEmbarcacoes();
}


function exibirEmbarcacoes() {
    const container = document.getElementById('dadosEmbarcacoes');
    
    let html = `
        <h3>Dados das ${embarcacoes.length} Embarcações:</h3>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Comprimento (m)</th>
                    <th>Motorização (HP)</th>
                    <th>Convés Aberto</th>
                    <th>Cabine Habitável</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    embarcacoes.forEach(emb => {
        html += `
            <tr>
                <td>${emb.id}</td>
                <td>${emb.comprimento}</td>
                <td>${emb.motorizacao}</td>
                <td>${emb.possuiConvesAberto ? 'Sim' : 'Não'}</td>
                <td>${emb.possuiCabineHabitavel ? 'Sim' : 'Não'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}


function filtrarCriterioA(embarcacoes) {
    return embarcacoes.filter(emb => emb.comprimento <= 5);
}

function filtrarCriterioB(embarcacoes) {
    return embarcacoes.filter(emb => 
        emb.comprimento <= 8 && 
        emb.possuiConvesAberto && 
        emb.motorizacao <= 50 && 
        !emb.possuiCabineHabitavel
    );
}

function filtrarCriterioC(embarcacoes) {
    return embarcacoes.filter(emb => 
        emb.comprimento <= 8 && 
        !emb.possuiConvesAberto && 
        emb.motorizacao <= 50
    );
}


function filtrarLegalizadas() {
    if (embarcacoes.length === 0) {
        alert('Primeiro gere as embarcações!');
        return;
    }
    
    const criterioA = filtrarCriterioA(embarcacoes);
    const criterioB = filtrarCriterioB(embarcacoes);
    const criterioC = filtrarCriterioC(embarcacoes);
    
    const todasLegalizadas = [...new Set([...criterioA, ...criterioB, ...criterioC])];
    

    exibirResultados(criterioA, criterioB, criterioC, todasLegalizadas);
    

    console.log('Critério A:', criterioA.length);
    console.log('Critério B:', criterioB.length);
    console.log('Critério C:', criterioC.length);
    console.log('Total legalizadas:', todasLegalizadas.length);
}


function exibirResultados(criterioA, criterioB, criterioC, todas) {
    const container = document.getElementById('resultados');
    
    let html = `
        <div class="resultado">
            <h3>Resultados dos Filtros de Legalização</h3>
            
            <h4>Critério A (≤5m, qualquer motorização): ${criterioA.length} embarcações</h4>
            ${criterioA.length > 0 ? criarTabelaResultado(criterioA) : '<p>Nenhuma embarcação atende este critério.</p>'}
            
            <h4>Critério B (≤8m, convés aberto, ≤50HP, sem cabine): ${criterioB.length} embarcações</h4>
            ${criterioB.length > 0 ? criarTabelaResultado(criterioB) : '<p>Nenhuma embarcação atende este critério.</p>'}
            
            <h4>Critério C (≤8m, convés fechado, ≤50HP): ${criterioC.length} embarcações</h4>
            ${criterioC.length > 0 ? criarTabelaResultado(criterioC) : '<p>Nenhuma embarcação atende este critério.</p>'}
            
            <h4>Total de Embarcações Legalizadas: ${todas.length}</h4>
            ${todas.length > 0 ? criarTabelaResultado(todas) : '<p>Nenhuma embarcação foi legalizada.</p>'}
        </div>
    `;
    
    container.innerHTML = html;
}


function criarTabelaResultado(embarcacoes) {
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Comprimento (m)</th>
                    <th>Motorização (HP)</th>
                    <th>Convés Aberto</th>
                    <th>Cabine Habitável</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    embarcacoes.forEach(emb => {
        html += `
            <tr>
                <td>${emb.id}</td>
                <td>${emb.comprimento}</td>
                <td>${emb.motorizacao}</td>
                <td>${emb.possuiConvesAberto ? 'Sim' : 'Não'}</td>
                <td>${emb.possuiCabineHabitavel ? 'Sim' : 'Não'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    return html;
}


function limparResultados() {
    document.getElementById('resultados').innerHTML = 
        '<p>Clique em "Filtrar Legalizadas" para ver os resultados</p>';
    document.getElementById('dadosEmbarcacoes').innerHTML = 
        '<p>Clique em "Gerar 50 Embarcações" para começar</p>';
    embarcacoes = [];
}
