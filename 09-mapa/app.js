let arquivo;

let vitimas;

let totaisParaMapa;

let total

let mapaMalha;

let mapaDados;


// Seleciona a tabela
let tabela = document.querySelector( "table" )

// Seleciona o tipo de crime
let seletorCategoria = document.querySelector( "select[name='tipo-crime']" );

// Seleciona o ano
let seletorAno = document.querySelector( "select[name='ano']" );

// Seleciona a div soma
let soma = document.querySelector( ".soma" );

// Seleciona o balão
let balao = document.querySelector( ".balao" );


// Ouve os eventos de mudança
seletorCategoria.addEventListener( "change", mostrar );

seletorAno.addEventListener( "change", mostrar );


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


    // Seleciona os valores únicos nas listas
    listaCategoria = valoresUnicos( listaCategoria );

    listaAno = valoresUnicos( listaAno );


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

        // Insere o valor "ano"
        novaOpcao.textContent = ano;

        // Adiciona o ano também ao "value"
        novaOpcao.value = ano;

        // Adiciona o filho ao elemento
        seletorAno.appendChild( novaOpcao );
    }

}


// Função que seleciona os valores únicos da lista
function valoresUnicos( lista ){

    return lista.filter( ( value, index, array ) => array.indexOf( value ) == index )

}


// Função para mostrar os dados do mapa
function mostrarMapa() {

    // Utiliza o método filter do JS e armazena na variável os que passaram pela checagem do mapa
    let filtradosParaMapa = arquivo.filter( checar );


    // Calcula a quantidade de vítimas por estado e por tipo de crime
    totaisParaMapa = calcularQuantidade( filtradosParaMapa );


    //Define os estados com menor e mais vítimas
    let min = Math.min( ...totaisParaMapa.map( d => d.total ) );
    let max = Math.max( ...totaisParaMapa.map( d => d.total ) );


    // Usa a d3 para definir a escala de cor baseado nos valores mínimo e máximo de vítimas por estado
    var escalaDeCor = d3.scaleLinear()
        .domain([ min, max ])
        .range([ "yellow", "red" ])
        //.range([ "black", "#B40B00"])


    // Seleciona os estados
    let elementoEstados = document.querySelectorAll ( "#mapa svg path" );

    // Seleciona o id de cada elemento
    elementoEstados.forEach( ( elemento ) => {

        // Obtem o id por UF
        let id = parseInt( elemento.id );

        let cor = undefined;


        // Encontra o total de vítimas nessa UF
        for ( let uf of totaisParaMapa ) {

            if (uf.id == id) {

                // Aplica a cor proporcional
                cor = escalaDeCor( uf.total );

            }

         }


         //Aplica cor proporcional
         elemento.setAttribute( "fill", cor );

    } )

}



// Função para mostrar os dados
function mostrar(){

    // Primeiro chama a função para limpar 
    limpar()


    // Utiliza o método filter do JS e armazena na variável os que passaram pela checagem
    let filtradosParaMapa = arquivo.filter( checar );

    mostrarMapa()

        for ( let filtrado of filtradosParaMapa ) {

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

}


// Função para checar a filtragem dos valores
function checar( dado ){

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

    let lista = [];


    // Verifica se mapaDados já foi carregado
    if ( !mapaDados )
        return lista;



    // Passa por cada uf e faz o somatório  
    for (let uf of mapaDados ) {
        
        total = 0;

        let totalAmeaca = 0;

        let  totalTentativa = 0;

        let totalAssassinato = 0;


        for ( filtrado of filtradosParaMapa ) {

            // Soma total de vítimas

            if ( filtrado.id == uf.id  ) {

                vitimas = parseInt( filtrado[ "vitimas" ] );
                
                total = total + vitimas;


                // Soma de Ameaças de Morte
                if ( filtrado[ "tipo-crime" ] === "Ameaça de morte") {

                    vitimas = parseInt( filtrado[ "vitimas" ] );
                    
                    totalAmeaca = totalAmeaca + vitimas;

                }


                // Soma de Tentatativa de Assassinato
                if ( filtrado[ "tipo-crime" ] === "Tentativa de assassinato"){


                    vitimas = parseInt( filtrado[ "vitimas" ] );
                    
                    totalTentativa = totalTentativa + vitimas

                }


                // Soma de Assassinatos
                if ( filtrado[ "tipo-crime" ] === "Assassinato"){


                    vitimas = parseInt( filtrado[ "vitimas" ] );
                    
                    totalAssassinato = totalAssassinato + vitimas

                }

            }

        }


        let item = {

            id: uf.id,
            total: total,
            totalAmeaca: totalAmeaca,
            totalTentativa: totalTentativa,
            totalAssassinato

        }

        lista.push( item )
  
    
    }


    let ameaca = 0;

    let tentativa = 0;

    let assassinato = 0;

    for ( item of lista ) {

        ameaca = ameaca + item.totalAmeaca;

        tentativa = tentativa + item.totalTentativa;

        assassinato = assassinato + item.totalAssassinato

    }

    document.querySelector( ".total-ameaca" ).innerText = ameaca;

    document.querySelector( ".total-tentativa" ).innerText = tentativa;

    document.querySelector( ".total-assassinato" ).innerText = assassinato;


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


    //Adiciona os eventos de mouse over e out
    elementoEstados.forEach(( elemento ) => {

        elemento.addEventListener( "mouseover", marcaEstado );
        elemento.addEventListener( "mouseout", desmarcaEstado ); 

    } )


    // Carrega o arquivo dos dados dos estados
    let dadosJson = await fetch( dadosUrl );
    
    // Converte o arquivo em json
    mapaDados = await dadosJson.json();


    // Mostra os dados do mapa
    mostrarMapa()

}


function marcaEstado( event ) {

    let elemento = event.target;

    // Seleciona o id do estado
    let id = parseInt( elemento.id );

    let uf = undefined;

    let totalAmeaca = 0;

    let totalTentativa = 0;

    let totalAssassinato = 0;

    // Obtém total de vítimas e mostra o objeto que contém este id
    for ( let item of totaisParaMapa ){

        if (id === item.id ) {
            
            totalAmeaca = item.totalAmeaca;
            totalTentativa = item.totalTentativa;
            totalAssassinato = item.totalAssassinato;

        }
    }


    // Obtem nome do estado e mostra o objeto que contém este id
    for ( let dado of mapaDados ) {

        if (id === dado.id ) {

            uf = dado.nome;

        }
    }


    // Mostra em um pop-up o nome do estado e a quantidade de vítimas
    balao.style.display = "block";

    balao.textContent = `${ uf } \nAmeaça de morte: ${ totalAmeaca } \nTentativa de assassinato: ${ totalTentativa } \nAssassinato ${ totalAssassinato }`;


    // Move o balão de acordo com o mouse
    balao.style.top = event.clientY + "px";
    balao.style.left = event.clientX + "px";

}


// Função para esconder o pop-up
function desmarcaEstado( event ) {

    balao.style.display = "none"

}


lerDadosMapa()