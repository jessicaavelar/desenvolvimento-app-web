let arquivo

// Seleciona a tabela
let tabela = document.querySelector( "table" )

// Seleciona o tipo de crime
let seletorCategoria = document.querySelector( "select[name='tipo-crime']" );

// Seleciona o ano
let seletorAno = document.querySelector( "select[name='ano']" );

// Seleciona o estado
let seletorEstado = document.querySelector( "select[name='estado']" );

// Ouve os eventos de mudança
seletorCategoria.addEventListener( "change", mostrar );

seletorAno.addEventListener( "change", mostrar );

seletorEstado.addEventListener( "change", mostrar );


// Lê o arquivo json
fetch ( "arquivo.json" )
    .then( resposta => resposta.json() )
    .then( dados => {

        arquivo = dados
        mostrar()
        preencheSeletores()

    } )


// Função para preencher os seletores do usuário com os valores da planilha
function preencheSeletores() {

    // Cria as listas de categoria
    let listaCategoria = arquivo.map( c => c[ "tipo-crime" ]);

    let listaAno = arquivo.map( a => a[ "ano" ]);

    let listaEstado = arquivo.map( e => e[ "estado" ]);


    // Seleciona os valores únicos nas listas
    listaCategoria = valoresUnicos( listaCategoria );

    listaAno = valoresUnicos( listaAno );

    listaEstado = valoresUnicos( listaEstado );


    // Adiciona os tipos de crime no seletor
    for ( categoria of listaCategoria ) {

        // Cria o elemento "option"
        let novaOpcao = document.createElement( "option" );

        // Insere o valor "Tipo de Crime"
        novaOpcao.textContent = categoria;

        // Adiciona o tipo de crime também ao "value"
        novaOpcao.value = categoria;

        // Adiciona o filho ao elemento
        seletorCategoria.appendChild( novaOpcao );

    }

    // Adiciona os anos no seletor
    for ( ano of listaAno ) {

        // Cria o elemento "option"
        let novaOpcao = document.createElement( "option" );

        // Insere o valor "Ano"
        novaOpcao.textContent = ano;

        // Adiciona o ano também ao "value"
        novaOpcao.value = ano;

        // Adiciona o filho ao elemento
        seletorAno.appendChild( novaOpcao );
    }

    // Adiciona os estados no seletor
    for ( estado of listaEstado ) {

        // Cria o elemento "option"
        let novaOpcao = document.createElement( "option" );

        // Insere o valor "Estado"
        novaOpcao.textContent = estado;

        // Adiciona o estado também ao "value"
        novaOpcao.value = estado;

        // Adiciona o filho ao elemento
        seletorEstado.appendChild( novaOpcao );
    }

}


// Função que seleciona os valores únicos da lista
function valoresUnicos( lista ){

    return lista.filter( ( value, index, array ) => array.indexOf( value ) == index )

}


// Função para mostrar os dados
function mostrar(){

    // Primeiro chama a função para limpar 
    limpar()

    // Utiliza o método filter do JS e armazena na variável os que passaram pela checagem
    let filtrados = arquivo.filter( checar );


    // Utilizar o filtrados para fazer a soma

        for ( let filtrado of filtrados ) {

        // Cria os elementos da tabela
        let linha = document.createElement( "tr" );
        let celulaTcrime = document.createElement( "td" );
        let celulaAno = document.createElement( "td" );
        let celulaEstado = document.createElement( "td" );
        let celulaMunicipio = document.createElement( "td" );
        let celulaLocal = document.createElement( "td" );
        let celulaData = document.createElement( "td" );
        let celulaNome = document.createElement( "td" );
        let celulaVitimas = document.createElement( "td" );
        let celulaCategoria = document.createElement( "td" );

        // Adiciona os elemento à tabela
        tabela.append( linha );
        linha.append( celulaTcrime );
        linha.append( celulaAno);
        linha.append( celulaEstado );
        linha.append( celulaMunicipio );
        linha.append( celulaLocal);
        linha.append( celulaData );
        linha.append( celulaNome );
        linha.append( celulaVitimas );
        linha.append( celulaCategoria );
        
        // Insere os valores
        celulaTcrime.textContent = filtrado[ "tipo-crime" ];
        celulaAno.textContent = filtrado[ "ano" ];
        celulaEstado.textContent = filtrado[ "estado" ];
        celulaMunicipio.textContent = filtrado[ "municipio" ];
        celulaLocal.textContent = filtrado[ "localização" ];
        celulaData.textContent = filtrado[ "data" ];
        celulaNome.textContent = filtrado[ "nome" ];
        celulaVitimas.textContent = filtrado[ "vitimas" ];
        celulaCategoria.textContent = filtrado[ "categoria" ];
        
    }
}


// Função para checar a filtragem dos valores
function checar( dado ){

    // Cria as variáveis com as seleções do usuário
    let categoria = seletorCategoria.value;

    let ano = seletorAno.value;

    let estado = seletorEstado.value;

    // Cria a lista de filtros
    let filtroCategoria , filtroAno, filtroEstado;


    // Verifica se atente às condições
    if ( categoria == "todos" ) {

        filtroCategoria = true
    }

    else {

        filtroCategoria = dado[ "tipo-crime" ] == categoria

    }


    if ( ano == "todos" ) {

        filtroAno = true

    }

    else {
        filtroAno = dado[ "ano" ] == ano
    }


    if ( estado == "todos" ) {

        filtroEstado = true

    }

    else {

        filtroEstado = dado[ "estado" ] == estado

    }

    // Checa o que foi selecionado pelo usuário
    if ( filtroCategoria && filtroAno && filtroEstado ) {

        return true;

    }

}


// Função para limpar os dados da tabela e criar o cabeçalho
function limpar(){

    // Limpa os dados e insere o cabeçalho novamente
    tabela.innerHTML = "<tr><th>Tipo de crime</th><th>Ano</th><th>Estado</th><th>Município</th><th>Localização</th><th>Data</th><th>Nome</th><th>Vítimas</th><th>Categoria</th></tr>"

}
