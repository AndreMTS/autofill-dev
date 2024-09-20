document.getElementById('preencher').addEventListener('click', () => {
    const opcoes = {
        nomeCompleto: document.getElementById('nomeCompleto').checked,
        email: document.getElementById('email').checked,
        telefone: document.getElementById('telefone').checked,
        cpf: document.getElementById('cpf').checked
    };

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: "preencher", opcoes: opcoes});
    });
});