function abrirTela(nomeTela) {
  var telas = document.querySelectorAll('.tela');
  for (var i = 0; i < telas.length; i++) {
    telas[i].classList.remove('ativa');
  }
  document.getElementById('tela-' + nomeTela).classList.add('ativa');
}

// --- BLOCO DE NOTAS ---
var campoNota = document.getElementById('campo-nota');
if (campoNota) {
  campoNota.value = localStorage.getItem('minha_nota') || '';
}

function salvarNota() {
  localStorage.setItem('minha_nota', campoNota.value);
  alert('Nota salva!');
}

// --- LISTA DE TAREFAS ---
var tarefas = JSON.parse(localStorage.getItem('minhas_tarefas')) || [];

function renderizarTarefas() {
  var lista = document.getElementById('lista-tarefas');
  if (!lista) return;
  lista.innerHTML = '';

  for (var i = 0; i < tarefas.length; i++) {
    var item = document.createElement('li');
    item.innerHTML = '<span>' + tarefas[i] + '</span><button onclick="removerTarefa(' + i + ')">X</button>';
    lista.appendChild(item);
  }
}

function adicionarTarefa() {
  var input = document.getElementById('nova-tarefa');
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

renderizarTarefas();

// --- CALCULADORA ---
function digitarCalc(valor) {
  var visor = document.getElementById('visor-calc');
  if (visor.value === 'Erro') visor.value = '';
  visor.value = visor.value + valor;
}

function limparCalc() {
  document.getElementById('visor-calc').value = '';
}

function calcularResultado() {
  var visor = document.getElementById('visor-calc');
  try {
    visor.value = eval(visor.value);
  } catch (e) {
    visor.value = 'Erro';
  }
}

// --- JOGO JOKENPÔ ---
function jogar(escolhaUsuario) {
  var opcoes = ['Pedra', 'Papel', 'Tesoura'];
  var escolhaKindle = opcoes[Math.floor(Math.random() * 3)];
  var resultado = '';

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
    'Você: ' + escolhaUsuario + ' | Kindle: ' + escolhaKindle + ' -> ' + resultado;
}
