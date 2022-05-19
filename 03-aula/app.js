// Função para verificar se o gatilho chegou no topo da página
function escutaScroll() {

    // Lista de gatilhos
    let gatilhos = document.querySelectorAll( ".gatilhos > div" );

    // Ver a posição atual dos gatilhos
    for( let gatilho of gatilhos ){

        // Posição atual
        let posicao = gatilho.getBoundingClientRect();

        // Pegar o valor da propriedade data-alvo
        let alvo = gatilho.dataset.alvo;
        
        // Selecionar o elemento do alvo
        let passo = document.querySelector( "." + alvo );
        
        // Verifica se o gatilho está acima do topo
        if( posicao.top <= 0 && posicao.top > -posicao.height ){

            // Adiciona a classe para exibir o gráfico
            passo.classList.add( "passo-ativo" );

        }

        // Retira a classe que exibe o gráfico
        else {

            passo.classList.remove( "passo-ativo" );

        }

    }

}

// Escutar o evento de scroll
window.addEventListener( "scroll", escutaScroll );