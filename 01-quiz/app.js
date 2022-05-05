//Declara variáveis globais
let perguntas = document.querySelectorAll ( '.perguntas' )
let total = perguntas.length
let respostasCorreta = 0

document.querySelector( ".total" ).textContent = total

for ( let pergunta of perguntas ) {
    
    let alternativas = pergunta.querySelectorAll( "li" )
    
    for ( let alternativa of alternativas ) {
        alternativa.addEventListener( "click", checarResposta)
    }

}


function checarResposta( event ) {

    let alternativa = event.target
    let pergunta = alternativa.closest( ".perguntas" )
    let resultado = pergunta.querySelector( ".resultado" )
    let resposta = pergunta.querySelector( ".resposta" )
    let imagem = pergunta.querySelector ( "img" )
    let correto = alternativa.classList.contains( "correto" )


    alternativa.classList.add( "clicado" )

    pergunta.classList.add ( "inativo" )

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
