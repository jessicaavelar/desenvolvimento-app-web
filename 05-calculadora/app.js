// Selecionar a entrada do usuáio
let entrada = document.querySelector( "input" );

// Selecionar a caixa
let seletor = document.querySelector( "select" );

// Selecionar a didv resultado
let resultado = document.querySelector( ".resultado" );

let quantidadeCarne, quandidadeDias;

let formata = new Intl.NumberFormat('pt-BR');


// Ouvir o evento de entrada - quando ousuário digita e seleciona
entrada.addEventListener( "input", validar );

seletor.addEventListener( "change", funcao );


function validar () {
    
    // Transformar o valor do usuário em inteiro
    let valor = parseInt( entrada.value );

    // Validar o valor do usuário
    if ( valor >= 0 ) {

        // Inserir o valor digitado pelo usuário

        quantidadeCarne = valor;
        calcularQuantidade();

    }

}


function funcao (e) {

    let dias = parseInt( e.target.value );

    quandidadeDias = dias;

    calcularQuantidade();

}


function calcularQuantidade() {

    if ( quandidadeDias && quantidadeCarne ) {

        let semana = quandidadeDias * quantidadeCarne;
        let ano = semana * 52;
        let kg = ano * 0.001;
        let agua = kg * 15000;
        let metano = kg * 2;
        let co2 = kg * 50;

        atualizaTexto(kg, agua, metano, co2);

    }

}


function atualizaTexto(kg, agua, metano, co2) {

    resultado.style.display = "initial";

    document.querySelector("[data-texto='quantidade']").innerText = formata.format(quantidadeCarne);

    document.querySelector("[data-texto='dias']").innerText = formata.format(quandidadeDias);

    document.querySelector("[data-texto='anual']").innerText = formata.format(kg);

    document.querySelector("[data-texto='agua']").innerText = formata.format(agua);

    document.querySelector("[data-texto='metano']").innerText = formata.format(metano);

    document.querySelector("[data-texto='co2']").innerText = formata.format(co2);

}


/*

Inserir a resposta do usuário na primeira linha


Fazer a conta semanal: x * y = xy

Fazer a conta anual: xy * 52 = a

Transformar em kg: a * 0,001 = kg

Inserir o resultado em .anual


Fazer a conta de água: kg * 15000 = l

Inserir o resultado em .agua


Fazer a conta de metano: kg * 2 = m

Inserir o resultado em .metano


Fazer a conta de co2: kg * 50 = dc

Inserir o resultado em .co2


Limpar o valor de output anterior

*/