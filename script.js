function CalcularValores(event) {
  event.preventDefault();
  let dadosUsuario = CapturaValores();
  let imc = CalcularImc(dadosUsuario.altura, dadosUsuario.peso);
  let classificacao = ClassificarImc(imc);
  let dadosUsuarioscompleto = OrganizarDados(dadosUsuario, imc, classificacao);
  CadastrarUsuario(dadosUsuarioscompleto);
  window.location.reload();
}

function CapturaValores() {
  const nome = document.getElementById("name").value;
  const altura = document.getElementById("height").value;
  const peso = document.getElementById("weight").value;

  const dadosUsuario = {
    nome: nome,
    altura: altura,
    peso: peso,
  };
  return dadosUsuario;
}

function CalcularImc(altura, peso) {
  const imc = peso / (altura * altura);
  return imc;
}

function ClassificarImc(imc) {
  if (imc < 18.5) {
    return "abaixo do peso";
  } else if (imc < 25) {
    return "Peso normal";
  } else if (imc < 30) {
    return "Sobrepeso";
  } else {
    return "Obsidade";
  }
}

function OrganizarDados(dadosUsuario, valorImc, ClassificacaoImc) {
  const dataHoraAtual = Intl.DateTimeFormat("pt-BR", {
    timeStyle: "long",
    dateStyle: "short",
  }).format(Date.now());
  const dadosUsuariocompleto = {
    ...dadosUsuario,
    imc: valorImc.toFixed(2),
    ClassificacaoImc: ClassificacaoImc,
    dataCadastro: dataHoraAtual,
  };
  return dadosUsuariocompleto;
}

function CadastrarUsuario(usuario) {
  //cria um array vazio para armazenar os valores do usuário
  let listaUsuario = [];

  //verifica se dentro do localStorage eu tenho as informações do usuário
  if (localStorage.getItem("usuariosCadastrados")) {
    //se sim, eu guardo as informações dentro do array
    //parse => de JSON para object
    listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
  }

  //cadastrar usuário dentro do array
  listaUsuario.push(usuario);

  //casao contrário, eu crio um novo item no localStorage
  //stringfy => objeto para JSON
  localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuario));
}
function carregarUsuario() {
  let listaUsuario = [];
  if (localStorage.getItem("usuariosCadastrados")) {
    listaUsuario = JSON.parse(localStorage.getItem("usuariosCadastrados"));
  }
  if (listaUsuario.length == 0) {
    let tabela = document.getElementById("corpo-tabela");
    tabela.innerHTML = `
        <tr class="Linha-mensagem">
        <td colspan= '6'>Nenhum usuario cadastrado</td>
        </tr>`
  } else {
    montarTabela(listaUsuario)
  }
}
window.addEventListener("DOMContentLoaded", () => carregarUsuario());

function montarTabela(listaDeCadastrados) {
  let tabela = document.getElementById("corpo-tabela");
  let templete = "";
  listaDeCadastrados.forEach((pessoa) => {
    templete += `
    <tr>
        <td data-cell="nome"> ${pessoa.nome}</td>
        <td data-cell="altura"> ${pessoa.altura}</td>
        <td data-cell="peso"> ${pessoa.peso}</td>
        <td data-cell= "imc"> ${pessoa.imc}</td>
        <td data-cell="classificacao"> ${pessoa.ClassificacaoImc}</td>
        <td data-cell= "dataCadastro"> ${pessoa.dataCadastro}</td>
    </tr>
    `;
  });
  tabela.innerHTML = templete;
}
function deletarRegistros() {
  localStorage.clear();
  window.location.reload();
}