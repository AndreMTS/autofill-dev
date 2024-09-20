function gerarDadosFicticios() {
    return {
      nomeCompleto: "João Silva Santos",
      email: "joao.silva@exemplo.com",
      telefone: "(11) 98765-4321",
      cpf: "123.456.789-00"
    };
  }
  
  function preencherFormulario(opcoes) {
    const dados = gerarDadosFicticios();
    
    if (opcoes.nomeCompleto) {
      const inputNomeCompleto = encontrarInput('nome completo');
      if (inputNomeCompleto) preencherInput(inputNomeCompleto, dados.nomeCompleto);
    }
    
    if (opcoes.email) {
      const inputEmail = encontrarInput('email');
      if (inputEmail) preencherInput(inputEmail, dados.email);
    }
    
    if (opcoes.telefone) {
      const inputTelefone = encontrarInput('telefone');
      if (inputTelefone) preencherInput(inputTelefone, dados.telefone);
    }
    
    if (opcoes.cpf) {
      const inputCPF = encontrarInput('cpf');
      if (inputCPF) preencherInput(inputCPF, dados.cpf);
    }
  }
  
  function encontrarInput(tipo) {
    const seletores = [
      `input[aria-label*="${tipo}" i]`,
      `input[placeholder*="${tipo}" i]`,
      `input[name*="${tipo}" i]`,
      `input[id*="${tipo}" i]`,
      `input.q-field__native[type="text"]`
    ];

    for (const seletor of seletores) {
      const input = document.querySelector(seletor);
      if (input) return input;
    }

    const inputs = document.querySelectorAll('input[type="text"]');
    for (const input of inputs) {
      const ariaLabel = input.getAttribute('aria-label');
      const placeholder = input.getAttribute('placeholder');
      if (ariaLabel?.toLowerCase().includes(tipo) || 
          placeholder?.toLowerCase().includes(tipo)) {
        return input;
      }
    }

    return null;
  }
  
  function preencherInput(input, valor) {
    // Preenche o valor
    input.value = valor;
    
    // Dispara eventos para simular a interação do usuário
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    
    // Para frameworks que usam propriedades personalizadas
    if (input._valueTracker) {
      input._valueTracker.setValue('');
    }
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "preencher") {
      preencherFormulario(request.opcoes);
    }
  });