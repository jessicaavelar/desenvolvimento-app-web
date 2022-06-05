// Selecionar a entrada do usuáio
let entrada = document.querySelector( "input" );

// Selecionar a caixa
let seletor = document.querySelector( "select" );

// Selecionar a div resultado
let resultado = document.querySelector( ".resultado" );

// Definir as variáveis do usuário
let quantidadeCarne, quandidadeDias;

// Formatar os números
let formata = new Intl.NumberFormat('pt-BR');


// Ouvir os eventos de entrada - quando ousuário digita e seleciona
entrada.addEventListener( "input", validar );

seletor.addEventListener( "change", funcao );


// Função para validar a entrada
function validar () {
    
    // Transformar o valor do usuário em inteiro
    let valor = parseInt( entrada.value );

    // Validar o valor do usuário
    if ( valor >= 0 ) {

        quantidadeCarne = valor;
        calcularQuantidade();

    }

}


// Função para validar a caixa de seleção
function funcao (e) {

    //Transformar o valor em inteiro
    let dias = parseInt( e.target.value );

    quandidadeDias = dias;

    calcularQuantidade();

}


// Função que faz os cálculos
function calcularQuantidade() {

    if ( quandidadeDias && quantidadeCarne ) {

        // Quantidade de carne por semana
        let semana = quandidadeDias * quantidadeCarne;

        // Quantidade de carne no ano
        let ano = semana * 52;

        // Transforma em quilograma
        let kg = ano * 0.001;

        // Quantidade de água
        let agua = kg * 15000;

        // Quantidade de metano
        let metano = kg * 2;

        // Quantidade de CO2
        let co2 = kg * 50;

        // Carne - segunda
        let kg2 = quantidadeCarne * 52 * 0.001 ;

        // Água - segunda
        let agua2 = kg2 * 15000;

        // Metano - segunda;
        let metano2 = kg2 * 2;

        // CO2 - segunda;
        let co22 = kg2 * 50;    

        atualizaTexto(kg, agua, metano, co2, kg2, agua2, metano2, co22);

    }

}


// Função que atualiza o texto
function atualizaTexto(kg, agua, metano, co2, kg2, agua2, metano2, co22) {

    // Exibir o resultado
    resultado.style.display = "initial";

    // Adicionar os valores ao texto
    document.querySelector("[data-texto='quantidade']").innerText = formata.format(quantidadeCarne);

    document.querySelector("[data-texto='dias']").innerText = formata.format(quandidadeDias);

    document.querySelector("[data-texto='anual']").innerText = formata.format(kg);

    document.querySelector("[data-texto='agua']").innerText = formata.format(agua);

    document.querySelector("[data-texto='metano']").innerText = formata.format(metano);

    document.querySelector("[data-texto='co2']").innerText = formata.format(co2);

    document.querySelector("[data-texto='anual-1']").innerText = formata.format(kg2);

    document.querySelector("[data-texto='agua-1']").innerText = formata.format(agua2);

    document.querySelector("[data-texto='metano-1']").innerText = formata.format(metano2);

    document.querySelector("[data-texto='co2-1']").innerText = formata.format(co22);

}