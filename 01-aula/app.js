//Declara variáveis globais
let quizzes = document.querySelectorAll ( '.quiz' )
let perguntas = quizzes.length
let respostasCorreta = 0

document.querySelector( ".total" ).textContent = perguntas

for ( let quiz of quizzes ) {
    
    let alternativas = quiz.querySelectorAll( "li" )
    
    for ( let alternativa of alternativas ) {
        alternativa.addEventListener( "click", checarResposta)

    }

}


function checarResposta( event ) {

    let alternativa = event.target
    let quiz = alternativa.closest( ".quiz" )
    let resultado = quiz.querySelector( ".resultado" )
    let resposta = quiz.querySelector( ".resposta" )
    let imagem = quiz.querySelector ( "img" )
    let correto = alternativa.classList.contains( "correto" )


    alternativa.classList.add( "clicado" )

    quiz.classList.add ( "inativo" )

    if ( correto ) {

        resultado.textContent = "Acertou! :)"
        resultado.style.color = "turquoise"
        imagem.style.display = "initial"
        respostasCorreta++
        
    }

    else {

        resultado.textContent = "Errou! :("
        resultado.style.color = "deeppink"

    }

    resposta.style.display = "initial"

    document.querySelector( "output" ).textContent = respostasCorreta
    
}
