// Função que verifica se o gatilho chegou no topo da página
function escutaScroll() {

    // Seleciona os gatilhos
    let gatilhos = document.querySelectorAll( ".gatilhos > div" );

    // Loop passa pela lista de gatilhos
    for (let gatilho of gatilhos) {

        // Pega a posição atual
        let posicao = gatilho.getBoundingClientRect();
        
        // Pega o valor da propriedade
        let propriedade = gatilho.dataset.alvo;
        
        // Seleciona o elemento do alvo
        let passo = document.querySelector( "." + propriedade );

        // Condições de posição do gatilho
        if( posicao.top <= 0 && posicao.top > -posicao.height ) {

            passo.classList.add( "passo-ativo" );
        
        } 

        else {

            passo.classList.remove( "passo-ativo" );

        }

    }

}



// Navegador escuta o evento de rolagem de página
window.addEventListener( "scroll", escutaScroll )