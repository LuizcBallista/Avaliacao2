function buscarPessoa(id,divPai){

    endpoint = 'people'

    // Condição para substituiir na tag certa do HTML
    if (document.getElementById('pessoa') && id == null) {
        divPai = document.getElementById('teste')
        id = document.getElementById('pessoa').value
        divPai.innerHTML = ''
    }

    retorno = urlBuilder(id,endpoint)
    nome = retorno.name

    if (nome == null) {
        nome = 'ID Inválido'
    }

    p = document.createElement('p')
    p.innerHTML = nome
    divPai.appendChild(p)

}

function urlBuilder(id,endpoint){

    xhttp = new XMLHttpRequest()
    url = 'https://swapi.dev/api/'+ endpoint + '/' + id
    xhttp.open("GET", url, false)
    xhttp.send()
    retorno = JSON.parse(xhttp.responseText)

    if (retorno.results) {
        return retorno.results
    } else {
        return retorno
    }
    
}

function buscarFilmes(){

    endpoint = 'films'
    filmes = urlBuilder('',endpoint)
    divPai = document.getElementById('filme')
    divPai.innerHTML = ''
    
    for (var f in filmes){
        titulo = filmes[f].title
        diretor = filmes[f].director
        data = filmes[f].release_date
        a = document.createElement('a')
        br = document.createElement('br')
        // a.href = '#topo'
        a.innerHTML = titulo + ' - ' + diretor + ' - ' + data
        divPai.appendChild(a)
        divPai.appendChild(br)

    }
}

function buscarPlanetas(){

    if (document.getElementById('planeta').value > 0) {
        endpoint = 'planets'
        idPlaneta = document.getElementById('planeta').value
        divPai = document.getElementById('fillplaneta')
        let i = 0 // Contador caso precise encerrar o loop
        planetas = urlBuilder(idPlaneta,endpoint)
        divPai.innerHTML = ''

        planetaNome = planetas.name
        planetaPopulacao = planetas.population
        planetaDiametro = planetas.diameter

        p = document.createElement('p')
        p.innerHTML = 'Planeta: ' + planetaNome + ' - ' + 'População: ' + planetaPopulacao + ' - ' + 'Diametro: ' + planetaDiametro
        div = document.createElement('hr')
        divPai.appendChild(p)
        divPai.appendChild(div)

        if (planetas.residents.length != 0) {
            for (var pessoa in planetas.residents){
                pessoa1 = planetas.residents[pessoa]
                split1 = pessoa1.split('https://swapi.dev/api/people/')
                split2 = split1[1].split('/')
                idPessoa1 = split2[0]
                buscarPessoa(idPessoa1,divPai)
                i++
                // if(i == 3){
                //     break
                // }
            }
        } else {
            divPai.innerHTML = 'Nenhum personagem relevante no planeta'
        }

    } else {
        divPai = document.getElementById('fillplaneta')
        divPai.innerHTML = ''
        p = document.createElement('p')
        p.innerHTML = 'O ID não pode estar vazio nem ser 0'
        divPai.appendChild(p)
    }
}

// buscarFilmes() // Com repetição
// buscarPlanetas() // Sem repetição e sem filtro