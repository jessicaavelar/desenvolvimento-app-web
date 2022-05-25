// Seleciona os botões
let botoes = document.querySelectorAll( ".botoes button" );

// Seleciona as divs com imagens
let passos = document.querySelectorAll( ".passos > div" );


// Função para clicar
function aoClicar(event) {

    let botaoAtual = event.target;
    let botaoAnterior = document.querySelector( ".botao-ativo" );
    let dataAlvo = botaoAtual.dataset.alvo;
    let elementoAlvo = document.querySelector( dataAlvo );
    let passoAnterior = document.querySelector( ".passo-ativo" );

    if ( botaoAtual != botaoAnterior ) {

        // Remove a classe para esconder o elemento anterior
        passoAnterior.classList.remove( "passo-ativo" );

        // Adiciona a classe para ativar o elemento selecionado
        elementoAlvo.classList.add( "passo-ativo" );

        // Adiciona a classe botão-ativo ao botão selecionado
        botaoAtual.classList.add( "botao-ativo" );

        // Remove a classe botao-ativo do botão clicado anteriormente
        botaoAnterior.classList.remove( "botao-ativo" );

    }

}


// Ação de clique
for ( let botao of botoes) {

    // Ouve o clique
    botao.addEventListener( "click", aoClicar );

}