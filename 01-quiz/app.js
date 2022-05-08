//Declara variáveis globais

//Variável da pergunta selecionada
let perguntaAtual = 0;

//Seleciona todos os botões
let botoes = document.querySelectorAll( '.botao' );

//Seleciona todas as perguntas
let perguntas = document.querySelectorAll( '.perguntas' );

//Variável quantas perguntas
let total = perguntas.length - 1;

//Variável de respostas corretas
let respostasCorreta = 0;

document.querySelector( ".total" ).textContent = total;

//Função que remove a classe "ativa" dos botões
function onClickNext( event ){

    let perguntaAnterior = document.querySelector( '.perguntas.ativa' );

    if(perguntaAnterior) {
        perguntaAnterior.classList.remove('ativa');
      }

    //Aumenta a contagem da pergunta
    perguntaAtual += 1;

    //Seleciona a próxima pergunta a partir da variável perguntaAtual
    let proximaPergunta = document.querySelector('.perguntas.item-' + perguntaAtual);
    console.log('.perguntas.item-' + perguntaAtual)
    proximaPergunta.classList.add('ativa');

    //Esconde botão "iniciar"
    let startButton = document.querySelector('.botao.iniciar');
    startButton.style.display = 'none';

  }

//Ação de clique para os botões de "Próxima"
for ( let botao of botoes ){
    botao.addEventListener ( "click", onClickNext);
}


//Seleção de alternativas
for ( let pergunta of perguntas ) {
    
    let alternativas = pergunta.querySelectorAll( "li" )
    
    for ( let alternativa of alternativas ) {
        alternativa.addEventListener( "click", checarResposta)
    }

}


//Função para verificar a resposta e mostrar o resultado
function checarResposta( event ) {

    let alternativa = event.target
    let pergunta = alternativa.closest( ".perguntas" )
    let resultado = pergunta.querySelector( ".resultado" )
    let resposta = pergunta.querySelector( ".resposta" )
    let imagem = pergunta.querySelector ( "img" )
    let correto = alternativa.classList.contains( "correto" )
    let desativar = pergunta.querySelector ( "ol" )


    alternativa.classList.add( "clicado" )

    desativar.classList.add ( "inativa" )

    if ( correto ) {

        resultado.textContent = "Correto"
        resultado.style.color = "#007B4E"
        respostasCorreta++
        
    }

    else {

        resultado.textContent = "Errado"
        resultado.style.color = "#B40B00"

    }

    resposta.style.display = "initial"
    imagem.style.display = "initial"


    document.querySelector( "output" ).textContent = respostasCorreta
    
}
