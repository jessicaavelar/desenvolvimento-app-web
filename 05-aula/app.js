// Carregar os dados
let salarios = [
    {
        "quantil": 0,
        "limiteInferior": 0
    },
    {
        "quantil": 5,
        "limiteInferior": 146
    },
    {
        "quantil": 10,
        "limiteInferior": 252
    },
    {
        "quantil": 20,
        "limiteInferior": 396
    },
    {
        "quantil": 30,
        "limiteInferior": 527
    },
    {
        "quantil": 40,
        "limiteInferior": 673
    },
    {
        "quantil": 50,
        "limiteInferior": 836
    },
    {
        "quantil": 60,
        "limiteInferior": 1035
    },
    {
        "quantil": 70,
        "limiteInferior": 1263
    },
    {
        "quantil": 80,
        "limiteInferior": 1682
    },
    {
        "quantil": 90,
        "limiteInferior": 2646
    },
    {
        "quantil": 95,
        "limiteInferior": 4082
    },
    {
        "quantil": 99,
        "limiteInferior": 9832
    }
  ]

// Inverter a ordem dos dados
salarios.reverse();

let entrada = document.querySelector( "input" );

// Selecionar o elemento output
let saida = document.querySelector( "output" );

// Selecionar o elemento preenchimento
let preenchimento = document.querySelector( ".preenchimento" );

// Ouvir o evento de entrada - quando ousuário está digitando
entrada.addEventListener( "input", validar );


//Função para limpar a entrada do usuário
function validar() {

    let valor = entrada.value;

    // Converter o texto em número
    valor = parseInt( valor);

    if ( valor > 0 ) {
        
        calcular ( valor );

    }

    else {

        limpar();
    
    }

}


// Função que encontra a faixa salarial
function calcular( valor ) {

    for ( let salario of salarios ) {

        if ( valor > salario.limiteInferior ) {

            let quantil = salario.quantil;

            mostrar( quantil );

            break;

        }

    }

}


// Função que mostra a faixa salarial
function mostrar( quantil ) {

    saida.textContent = quantil + "%";
    preenchimento.style.width = quantil + "%";

}


// Limpar o valor de output anterior
function limpar() {

    saida.textContent = " %"
    preenchimento.style.width = "0%";

}