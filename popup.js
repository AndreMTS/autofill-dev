document.getElementById('preencher').addEventListener('click', () => {
    const opcoes = {
        nomeCompleto: document.getElementById('nomeCompleto').checked,
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
        cep: document.getElementById('cep').checked
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