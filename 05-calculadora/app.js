// Selecionar a entrada do usuáio
let entrada = document.querySelector( "input" );

// Ouvir o evento de entrada - quando ousuário está digitando
entrada.addEventListener( "input", validar );

/*

Mostrar a resposta

    resultado.style.display = "initial"


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