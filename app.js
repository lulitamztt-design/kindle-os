function abrirTela(nomeTela) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => tela.classList.remove('ativa'));
  document.getElementById('tela-' + nomeTela).classList.add('ativa');
}

// Bloco de Notas
const campoNota = document.getElementById('campo-nota');
campoNota.value = localStorage.getItem('minha_nota') || '';

function salvarNota() {
  localStorage.setItem('minha_nota', campoNota.value);
  alert('Nota salva!');
}

// Lista de Tarefas
let tarefas = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

function renderizarTarefas() {
  const lista = document.getElementById('lista-tarefas');
  lista.innerHTML = '';

  tarefas.forEach((tarefa, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <span>${tarefa}</span>
      <button onclick="removerTarefa(${index})">X</button>
    `;
    lista.appendChild(item);
  });
}

function adicionarTarefa() {
  const input = document.getElementById('nova-tarefa');
  if (input.value.trim() === '') return;

  tarefas.push(input.value);
  localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
  input.value = '';
  renderizarTarefas();
}

function removerTarefa(index) {
  tarefas.splice(index, 1);
  localStorage.setItem('minhas_tarefas', JSON.stringify(tarefas));
  renderizarTarefas();
}

// --- LÓGICA DA CALCULADORA ---
function digitarCalc(valor) {
  document.getElementById('visor-calc').value += valor;
}

function limparCalc() {
  document.getElementById('visor-calc').value = '';
}

function calcularResultado() {
  const visor = document.getElementById('visor-calc');
  try {
    visor.value = eval(visor.value);
  } catch {
    visor.value = 'Erro';
  }
}

// --- LÓGICA DO JOGO JOKENPÔ ---
function jogar(escolhaUsuario) {
  const opcoes = ['Pedra', 'Papel', 'Tesoura'];
  const escolhaKindle = opcoes[Math.floor(Math.random() * 3)];
  let resultado = '';

  if (escolhaUsuario === escolhaKindle) {
    resultado = 'Empate!';
  } else if (
    (escolhaUsuario === 'Pedra' && escolhaKindle === 'Tesoura') ||
    (escolhaUsuario === 'Papel' && escolhaKindle === 'Pedra') ||
    (escolhaUsuario === 'Tesoura' && escolhaKindle === 'Papel')
  ) {
    resultado = 'Você venceu!';
  } else {
    resultado = 'O Kindle venceu!';
  }

  document.getElementById('resultado-jogo').innerText = 
    `Você: ${escolhaUsuario} | Kindle: ${escolhaKindle} -> ${resultado}`;
}

renderizarTarefas();
