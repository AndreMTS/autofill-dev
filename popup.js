document.getElementById('preencher').addEventListener('click', () => {
    const opcoes = {
        razaoSocial: document.getElementById('razaoSocial').checked,
        nomeFantasia: document.getElementById('nomeFantasia').checked,
        cnpj: document.getElementById('cnpj').checked,
        nomeCompleto: document.getElementById('nomeCompleto').checked,
        nome: document.getElementById('nome').checked,
        dataNascimento: document.getElementById('dataNascimento').checked,
        nomePai: document.getElementById('nomePai').checked,
        nomeMae: document.getElementById('nomeMae').checked,
        rg: document.getElementById('rg').checked,
        dataEmissaoRG: document.getElementById('dataEmissaoRG').checked,
        cnh: document.getElementById('cnh').checked,
        validadeCNH: document.getElementById('validadeCNH').checked,
        email: document.getElementById('email').checked,
        celular: document.getElementById('celular').checked,
        telefone: document.getElementById('telefone').checked,
        site: document.getElementById('site').checked,
        cpf: document.getElementById('cpf').checked,
        cep: document.getElementById('cep').checked,
        ufInscricaoEstadual: document.getElementById('ufInscricaoEstadual').checked,
        inscricaoEstadual: document.getElementById('inscricaoEstadual').checked,
        inscricaoMunicipal: document.getElementById('inscricaoMunicipal').checked,
        fundacao: document.getElementById('fundacao').checked,
        referenciasComerciais: document.getElementById('referenciasComerciais').checked,
        referenciasBancarias: document.getElementById('referenciasBancarias').checked,
        imagemPadrao: document.getElementById('imagemPadrao').checked // Nova opção
    };

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "preencher", opcoes: opcoes});
    });
});

document.getElementById('limpar').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "limpar"});
    });
});