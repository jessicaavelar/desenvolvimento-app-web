let dados = [
    {
      "tipo-crime": "Ameaça de morte",
      "ano": 2021,
      "estado": "Amazonas",
      "municipio": "Manaus",
      "localização": "Aldeia Tsetsu Davi/Km 23/BR-174",
      "data": "05/12/2021",
      "nome": "Cacique da Aldeia Tsetsu Davi",
      "vitimas": 1
    },

    {
        "tipo-crime": "Assassinato",
        "ano": 2020,
        "estado": "Bahia",
        "municipio": "Paulo Afonso",
        "localização": "Aldeia Tsetsu Davi/Km 23/BR-174",
        "data": "05/12/2021",
        "nome": "Cacique da Aldeia Tsetsu Davi",
        "vitimas": 3
    },

    {
        "tipo-crime": "Tentativa de assassinato",
        "ano": 2019,
        "estado": "Amazonas",
        "municipio": "Manaus",
        "localização": "Aldeia Tsetsu Davi/Km 23/BR-174",
        "data": "05/12/2021",
        "nome": "Cacique da Aldeia Tsetsu Davi",
        "vitimas": 10
    }

]

let tabela = document.querySelector( "table" )

let seletorCategoria = document.querySelector( "select[name='categoria']" );

let seletorAno = document.querySelector( "select[name='ano']" );

let seletorEstado = document.querySelector( "select[name='estado']" );

seletorCategoria.addEventListener( "change", teste );

seletorAno.addEventListener( "change", teste );

seletorEstado.addEventListener( "change", teste );



function teste() {

    limpar()

    let filtrados = dados.filter( checar );
    for ( let filtrado of filtrados ) {

        let linha = document.createElement( "tr" );
        let celulaCategoria = document.createElement ("td");
        tabela.append( linha );
        linha.append( celulaCategoria )
        celulaCategoria.textContent = filtrado["tipo-crime"]

    }

}


function checar( dado ) {

    let categoria = seletorCategoria.value;
    let ano = seletorAno.value;
    let estado = seletorEstado.value;

    if ( dado[ "tipo-crime" ] == categoria ) { // checar as outras condições aqui com o &&

        return true;

    }


}

function limpar(){

    tabela.textContent = ""
    // Criar aqui o cabeçalho utilizando o innerHTML

}

