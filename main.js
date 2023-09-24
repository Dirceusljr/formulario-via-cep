async function buscarEndereco(cep) {
    var mensagemErro = document.getElementById('erro')
    mensagemErro.innerHTML= ""
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        var consultaCEPConvertida = await consultaCEP.json()
        console.log(consultaCEPConvertida);
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!')
        } else {
        var logradouro = document.getElementById('logradouro')
        var bairro = document.getElementById('bairro')
        var cidade = document.getElementById('cidade')
        var uf = document.getElementById('uf')
        
        logradouro.value = consultaCEPConvertida.logradouro
        bairro.value = consultaCEPConvertida.bairro
        cidade.value = consultaCEPConvertida.localidade
        uf.value = consultaCEPConvertida.uf

        document.getElementById('cep').value = cep.substring(0,5)+"-"+cep.substring(5);

        return consultaCEPConvertida
    }
    } catch (erro) {
        mensagemErro.innerHTML = `
        <p>CEP inválido. Tente novamente!</p>
        `
    }
}   

var cepDigitado = document.getElementById('cep')
cepDigitado.addEventListener("focusout", () => buscarEndereco(cep.value))
