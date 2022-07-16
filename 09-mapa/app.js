let arquivo;

let vitimas;

let total;

let totaisParaMapa;

let mapaMalha;

let mapaDados;

// Seleciona a tabela
let tabela = document.querySelector( "table" )

// Seleciona o tipo de crime
let seletorCategoria = document.querySelector( "select[name='tipo-crime']" );

// Seleciona o ano
let seletorAno = document.querySelector( "select[name='ano']" );

// Seleciona o estado
let seletorEstado = document.querySelector( "select[name='estado']" );

// Seleciona a div soma
let soma = document.querySelector( ".soma" );


// Seleciona balão
let balao = document.querySelector( ".balao" )


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


//Função para mostrar os dados no mapa
function mostrarMapa() {

    // Utiliza o método filter do JS e armazena na variável os que passaram pela checagem do mapa
    let filtradosParaMapa = arquivo.filter( checarParaMapa );

    // Calcula a quantidade de vítimas por estado
    totaisParaMapa = calcularQuantidadeParaMapa( filtradosParaMapa );


    // Define os estados com menos e mais vítimas
    let min = Math.min( ...totaisParaMapa.map( d => d.total ) )
    
    let max = Math.max( ...totaisParaMapa.map( d => d.total ) )


    // Usa d3 para definir a escala de cor baseado no mínimo e máximo de vítimas por estado
    var escalaDeCor = d3.scaleLinear()
        .domain([ min, max ])
        .range([ "yellow", "red" ])



    // Seleciona os estados
    let elementoEstados = document.querySelectorAll( "#mapa svg path" );

    // Seleciona o id de cada elemento
    elementoEstados.forEach(( elemento ) => {

        // Obtem o id por UF
        let id = parseInt( elemento.id )

        let cor = undefined

        // Encontra o total de vítimas nessa UF
        for ( let uf of totaisParaMapa ) {

            if ( uf.id == id ){

                // Aplica cor proporcional
                cor = escalaDeCor( uf.total )

            }


        }


        // Aplica cor proporcional
        elemento.setAttribute( "fill", cor );

    } )

}


// Função para mostrar os dados
function mostrar(){

    // Primeiro chama a função para limpar 
    limpar()


    // Utiliza o método filter do JS e armazena na variável os que passaram pela checagem
    let filtrados = arquivo.filter( checar );


    // Calcula a quantidade de vítimas
    calcularQuantidade( filtrados );


    mostrarMapa() 


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
        let celulaIdade = document.createElement( "td" );
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
        linha.append( celulaIdade );
        linha.append( celulaVitimas );
        linha.append( celulaCategoria );
        
        // Insere os valores
        celulaTcrime.textContent = filtrado[ "tipo-crime" ];
        celulaAno.textContent = filtrado[ "ano" ];
        celulaEstado.textContent = filtrado[ "estado" ];
        celulaMunicipio.textContent = filtrado[ "município" ];
        celulaLocal.textContent = filtrado[ "localização" ];
        celulaData.textContent = filtrado[ "data" ];
        celulaNome.textContent = filtrado[ "nome" ];
        celulaIdade.textContent = filtrado[ "idade" ];
        celulaVitimas.textContent = filtrado[ "vitimas" ];
        celulaCategoria.textContent = filtrado[ "categoria" ];
            
    }

    
    // Exibe o total de vítimas no período selecionado
    document.querySelector( ".total" ).innerText = total
    soma.style.display = "initial";

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


// Função para checar a filtragem dos valores para o mapa
function checarParaMapa( dado ){

    // Cria as variáveis com as seleções do usuário
    let categoria = seletorCategoria.value;

    let ano = seletorAno.value;

    // Cria a lista de filtros
    let filtroCategoria , filtroAno;


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


    // Checa o que foi selecionado pelo usuário
    if ( filtroCategoria && filtroAno ) {

        return true;

    }

}

// Função para limpar os dados da tabela e criar o cabeçalho
function limpar(){

    // Limpa os dados e insere o cabeçalho novamente
    tabela.innerHTML = "<tr><th>Tipo de crime</th><th>Ano</th><th>Estado</th><th>Município</th><th>Localização</th><th>Data</th><th>Nome</th><th>Idade</th><th>Vítimas</th><th>Categoria</th></tr>"

}


// Função para calcular a quantidade de vítimas
function calcularQuantidade( filtradosParaMapa ) {

    let lista2 = []

    // Verifica se mapaDados já foi carregado
    if ( !mapaDados )
        return lista2


    for ( let uf of mapaDados ) {

        totalAmeaca = 0

        totalTentativa = 0

        totalAssassinato = 0

        
        for ( filtrado of filtradosParaMapa ) {

            if ( filtrado[ "tipo-crime" ] === "Ameaça de morte"){


                vitimas = parseInt( filtrado[ "vitimas" ] );
                
                totalAmeaca = totalAmeaca + vitimas

            }

        }

        for ( filtrado of filtradosParaMapa ) {


            if ( filtrado[ "tipo-crime" ] === "Tentativa de assassinato"){


                vitimas = parseInt( filtrado[ "vitimas" ] );
                
                totalTentativa = totalTentativa + vitimas

            }

        }


        for ( filtrado of filtradosParaMapa ) {


            if ( filtrado[ "tipo-crime" ] === "Assassinato"){


                vitimas = parseInt( filtrado[ "vitimas" ] );
                
                totalAssassinato = totalAssassinato + vitimas

            }

        }

        let item = {

            id: uf.id,
            totalAmeaca: totalAmeaca,
            totalTentativa: totalTentativa,
            totalAssassinato: totalAssassinato

        }


        lista2.push( item )

    }

    console.log(lista2)
    return lista2


}


// Função para calcular a quantidade de vítimas por estado
function calcularQuantidadeParaMapa( filtradosParaMapa ) {

    let lista = []

    // Verifica se mapaDados já foi carregado
    if ( !mapaDados )
        return lista


    for ( let uf of mapaDados ) {

        let total = 0;


        for ( filtrado of filtradosParaMapa ) {

            if ( filtrado.id == uf.id ) {

                vitimas = parseInt( filtrado[ "vitimas" ] );
                
                total = total + vitimas

            }
        
        }


        let item = {

            id: uf.id,
            total: total

        }


        lista.push( item )

    }

    return lista
}


// Função para ler o mapa
async function lerDadosMapa() {

    // Endereço do mapa do Brasil por estado na API do IBGE
    let mapaUrl = "https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=image/svg+xml&qualidade=intermediaria&intrarregiao=UF";

    // Dados do mapa do Brasil por estado na API do IBGE
    let dadosUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";


    // Carrega o arquivo mapa
    let mapaSvg = await fetch( mapaUrl );

    // Converte o arquivo carregado em string
    mapaMalha = await mapaSvg.text();

    // Seleciona o id do mapa
    let mapaConteudo = document.querySelector( "#mapa" );

    // Insere o mapa no HTML
    mapaConteudo.innerHTML = mapaMalha;

    // Seleciona os estados
    let elementoEstados = document.querySelectorAll( "#mapa svg path" );


    // Adiciona os eventos de mouse over e out
    elementoEstados.forEach(( elemento ) => {
    
        elemento.addEventListener( "mouseover", marcaEstado );
        elemento.addEventListener( "mouseout", desmarcaEstado );

    } )


    // Carrega o arquivo dos dados dos estados
    let dadosJson = await fetch( dadosUrl );
    
    // Converte o arquivo em json
    mapaDados = await dadosJson.json();


    // Função para mostrar os dados no mapa
    mostrarMapa()


}


function marcaEstado( event ) {

    let elemento = event.target;
    


    // Seleciona o id do estado
    let id = parseInt( elemento.id );

    let uf = undefined;

    let total = undefined;


    // Obtem total de vítimas e mostrar objeto que contém este id
    for ( let item of totaisParaMapa ) {
        
        if ( id === item.id ) {

            total = item.total;

        }
    }

    // Obter nome do Estado e mostrar objeto que contém este id
    for ( let dado of mapaDados ) {

        if (  id === dado.id ) {

            uf = dado.nome;

        }
    }

    if ( uf && total ) {

    
        //Mostra em um pop-up o nome do estado e quantidade de vítimas
        balao.style.display = "block"

        balao.textContent = `${ uf }: ${ total } vítimas`

        // Move o balão de acordo com o mouse
        balao.style.top = event.clientY + "px"
        balao.style.left = event.clientX + "px"

    }

}


// Função para esconder o pop-up
function desmarcaEstado( event ) {

    balao.style.display = "none"

}


lerDadosMapa()