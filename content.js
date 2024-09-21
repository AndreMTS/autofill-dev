async function gerarDadosFicticios() {
    const nomes = [
        "João", "Maria", "Pedro", "Ana", "Carlos", "Lúcia", "Antônio", "Fernanda",
        "Paulo", "Juliana", "Rafael", "Camila", "Marcos", "Beatriz", "José", "Cláudia",
        "Gabriel", "Bruna", "Lucas", "Patrícia", "Ricardo", "Aline", "Thiago", "Roberta",
        "Felipe", "Vanessa", "Marcelo", "Bianca", "Rodrigo", "Sônia", "Leandro", "Carla",
        "Bruno", "Rita", "Gustavo", "Cecília", "Fábio", "Renata", "Igor", "Elaine",
        "Diego", "Viviane", "Renato", "Mariana", "Jorge", "Sandra", "Alexandre", "Eliane",
        "Fernando", "Luciana", "Eduardo", "Michele", "André", "Simone", "Henrique", "Cristiane",
        "César", "Raquel", "Wesley", "Gabriela", "Murilo", "Tânia", "Danilo", "Tatiana",
        "Caio", "Verônica", "Vitor", "Regina", "Evandro", "Lara", "Rogério", "Débora",
        "Otávio", "Juliane", "Samuel", "Denise", "Vladimir", "Natália", "Luiz", "Helena",
        "Flávio", "Lorena", "Robson", "Adriana", "Elias", "Joana", "Sérgio", "Letícia",
        "Maurício", "Cátia", "Claudio", "Ingrid", "Brás", "Valéria", "Mateus", "Rosa",
        "Ivan", "Marta", "Jonas", "Solange", "Davi", "Elisa", "Guilherme", "Yasmin"
      ];
    const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Almeida", "Pereira"];
    
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    const nomeCompleto = `${nome} ${sobrenome}`;
  
    const endereco = await buscarCepAleatorio();
  
    return {
      nomeCompleto: nomeCompleto,
      dataNascimento: gerarDataNascimento(),
      nomePai: `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`,
      nomeMae: `${nomes[Math.floor(Math.random() * nomes.length)]} ${sobrenomes[Math.floor(Math.random() * sobrenomes.length)]}`,
      rg: gerarRG(),
      dataEmissaoRG: gerarDataEmissao(),
      cnh: gerarCNH(),
      validadeCNH: gerarDataFutura(),
      email: gerarEmail(nome, sobrenome),
      celular: gerarTelefone(),
      telefone: gerarTelefone(),
      site: `www.${nome.toLowerCase()}${sobrenome.toLowerCase()}.com.br`,
      cpf: gerarCPF(),
      cep: endereco.id.toString().padStart(8, '0'),
      logradouro: endereco.streetName,
      numero: Math.floor(Math.random() * 1000) + 1,
      complemento: "casa",
      razaoSocial: gerarRazaoSocial(),
      nomeFantasia: gerarNomeFantasia(),
      cnpj: gerarCNPJ(),
      ufInscricaoEstadual: endereco.State.abbreviation,
      inscricaoEstadual: gerarInscricaoEstadual(),
      inscricaoMunicipal: gerarInscricaoMunicipal(),
      fundacao: gerarDataFundacao(),
      referenciasComerciais: gerarReferenciasComerciais(),
      referenciasBancarias: gerarReferenciasBancarias(),
      bairro: endereco.district,
      cidade: endereco.City.name,
      uf: endereco.State.abbreviation
    };
  }

  async function buscarCepAleatorio() {
    try {
      const response = await fetch('https://api.qualcep.com.br/zipcode/random?');
      if (!response.ok) {
        throw new Error('Falha ao buscar CEP aleatório');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      // Retorna um endereço padrão em caso de erro
      return {
        id: 1310200,
        streetName: "Avenida Paulista",
        district: "Bela Vista",
        City: { name: "São Paulo" },
        State: { abbreviation: "SP" }
      };
    }
  }

function gerarDataNascimento() {
  const inicio = new Date(1960, 0, 1).getTime();
  const fim = new Date(2000, 11, 31).getTime();
  const data = new Date(inicio + Math.random() * (fim - inicio));
  return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

function gerarDataEmissao() {
  const inicio = new Date(2010, 0, 1).getTime();
  const fim = new Date().getTime();
  const data = new Date(inicio + Math.random() * (fim - inicio));
  return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

function gerarDataFutura() {
  const inicio = new Date().getTime();
  const fim = new Date(2030, 11, 31).getTime();
  const data = new Date(inicio + Math.random() * (fim - inicio));
  return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

function gerarRG() {
  return Array(8).fill().map(() => Math.floor(Math.random() * 10)).join('') + 'X';
}

function gerarCNH() {
  return Array(11).fill().map(() => Math.floor(Math.random() * 10)).join('');
}

function gerarTelefone() {
  return `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`;
}

function gerarEmail(nome, sobrenome) {
  const dominios = ["teste.com", "test.com"];
  
  // Remove acentos e converte para minúsculas
  const removerAcentos = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Remove pontuação e espaços, converte para minúsculas
  const limparNome = (str) => removerAcentos(str.toLowerCase()).replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
  
  const nomeEmail = limparNome(nome);
  const sobrenomeEmail = limparNome(sobrenome);
  
  const numeroAleatorio = Math.floor(Math.random() * 100);
  const dominio = dominios[Math.floor(Math.random() * dominios.length)];
  
  return `${nomeEmail}${sobrenomeEmail}${numeroAleatorio}@${dominio}`;
}

function gerarCPF() {
  const gerarDigito = (digitos) => {
    let soma = digitos.reduce((acc, cur, idx) => acc + cur * (digitos.length + 1 - idx), 0);
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const numeros = Array(9).fill().map(() => Math.floor(Math.random() * 10));
  const digito1 = gerarDigito(numeros);
  const digito2 = gerarDigito([...numeros, digito1]);

  return [...numeros, digito1, digito2].join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function gerarRazaoSocial() {
  const prefixos = ["Indústria", "Comércio", "Serviços", "Tecnologia", "Consultoria"];
  const sufixos = ["Ltda", "S.A.", "MEI", "EIRELI", "Sociedade Simples"];
  const nomes = ["Silva", "Santos", "Oliveira", "Ferreira", "Rodrigues", "Almeida", "Pereira", "Lima"];
  
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
  
  return `${prefixo} ${nome} ${sufixo}`;
}

function gerarNomeFantasia() {
  const prefixos = ["Tech", "Inova", "Mega", "Super", "Ultra"];
  const nomes = ["Silva", "Santos", "Oliveira", "Ferreira", "Rodrigues", "Almeida", "Pereira", "Lima"];
  const prefixo = prefixos[Math.floor(Math.random() * prefixos.length)];
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  return `${prefixo} ${nome}`;
}

function gerarCNPJ() {
  const gerarDigito = (digitos) => {
    let soma = digitos.reduce((acc, cur, idx) => acc + cur * ((idx % 8) + 2), 0);
    let resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  const numeros = Array(12).fill().map(() => Math.floor(Math.random() * 10));
  const digito1 = gerarDigito(numeros);
  const digito2 = gerarDigito([...numeros, digito1]);

  return [...numeros, digito1, digito2].join('').replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

function gerarInscricaoEstadual() {
  return Array(9).fill().map(() => Math.floor(Math.random() * 10)).join('');
}

function gerarInscricaoMunicipal() {
  return Array(11).fill().map(() => Math.floor(Math.random() * 10)).join('');
}

function gerarDataFundacao() {
  const inicio = new Date(1950, 0, 1).getTime();
  const fim = new Date().getTime();
  const data = new Date(inicio + Math.random() * (fim - inicio));
  return `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}/${data.getFullYear()}`;
}

function gerarReferenciasComerciais() {
  const empresas = ["Empresa A", "Empresa B", "Empresa C", "Empresa D", "Empresa E"];
  return Array(3).fill().map(() => ({
    nome: empresas[Math.floor(Math.random() * empresas.length)],
    telefone: gerarTelefone()
  }));
}

function gerarReferenciasBancarias() {
  const bancos = ["Banco do Brasil", "Itaú", "Bradesco", "Santander", "Caixa Econômica Federal"];
  return Array(2).fill().map(() => ({
    banco: bancos[Math.floor(Math.random() * bancos.length)],
    agencia: Math.floor(Math.random() * 9000) + 1000,
    conta: Math.floor(Math.random() * 90000) + 10000
  }));
}

async function preencherFormulario(opcoes) {
    const dados = await gerarDadosFicticios();
  
  const campos = {
    nomeCompleto: ['Nome Completo'],
    dataNascimento: ['nascimento', 'data nascimento', 'data de nascimento'],
    nomePai: ['pai', 'nome do pai'],
    nomeMae: ['mãe', 'nome da mãe'],
    rg: ['rg', 'registro geral'],
    dataEmissaoRG: ['data emissão rg', 'emissão rg'],
    cnh: ['cnh', 'carteira de motorista'],
    validadeCNH: ['validade cnh', 'vencimento cnh'],
    email: ['e-mail', 'E-mail', 'Email', 'email'],
    celular: ['celular', 'Celular', 'telemóvel'],
    telefone: ['telefone', 'fone'],
    site: ['site', 'website'],
    cpf: ['cpf'],
    cep: ['cep', 'código postal'],
    logradouro: ['logradouro', 'endereço', 'rua'],
    numero: ['numero'],
    bairro: ['bairro'],
    complemento: ['complemento'],
    cidade: ['cidade', 'município'],
    uf: ['uf', 'estado'],
    razaoSocial: ['razão social'],
    nomeFantasia: ['nome fantasia'],
    cnpj: ['cnpj'],
    ufInscricaoEstadual: ['uf inscrição estadual', 'ie uf'],
    inscricaoEstadual: ['inscrição estadual', 'ie'],
    inscricaoMunicipal: ['inscrição municipal', 'im'],
    fundacao: ['fundação', 'data de fundação'],
    referenciasComerciais: ['referências comerciais'],
    referenciasBancarias: ['referências bancárias']
  };

  for (const [campo, termos] of Object.entries(campos)) {
    if (opcoes[campo]) {
      const input = encontrarInput(termos, campo);
      if (input) {
        preencherInput(input, dados[campo], campo);
        console.log(`Campo ${campo} preenchido com: ${dados[campo]}`);
        
        // Se for o CEP, aguarda um pouco e tenta preencher os campos de endereço
        if (campo === 'cep') {
          setTimeout(() => preencherCamposEndereco(dados), 1000);
        }
      } else {
        console.log(`Campo ${campo} não encontrado`);
      }
    }
  }
}

function encontrarInput(termos, campoAtual) {
  const camposPreenchidos = new Set();

  for (const termo of termos) {
    // Função auxiliar para verificar se o texto corresponde ao termo
    const matchText = (text, term) => text.toLowerCase().includes(term.toLowerCase());

    // Busca por elementos .q-field que contêm o termo no label ou aria-label
    const qFields = Array.from(document.querySelectorAll('.q-field'));
    for (const qField of qFields) {
      const label = qField.querySelector('.q-field__label');
      const input = qField.querySelector('input.q-field__native');
      
      if (input && !camposPreenchidos.has(input) && (
        (label && matchText(label.textContent, termo)) ||
        (input.getAttribute('aria-label') && matchText(input.getAttribute('aria-label'), termo))
      )) {
        console.log(`Campo encontrado para ${campoAtual}: ${termo}`);
        camposPreenchidos.add(input);
        return input;
      }
    }

    // Seletores anteriores como fallback
    const seletores = [
      `input[aria-label="${termo}" i]`,
      `input[placeholder="${termo}" i]`,
      `input[name="${termo}" i]`,
      `input[id="${termo}" i]`,
      `input[aria-label*="${termo}" i]`,
      `input[placeholder*="${termo}" i]`,
      `input[name*="${termo}" i]`,
      `input[id*="${termo}" i]`,
      `input.q-field__native[type="text"]`,
      `input.q-field__native[type="tel"]`,
      `input[data-test*="${termo}" i]`
    ];

    for (const seletor of seletores) {
      const input = document.querySelector(seletor);
      if (input && !camposPreenchidos.has(input)) {
        console.log(`Campo encontrado para ${campoAtual}: ${termo}, seletor: ${seletor}`);
        camposPreenchidos.add(input);
        return input;
      }
    }

    // Busca específica para comboboxes
    const comboboxes = document.querySelectorAll('input[role="combobox"]');
    for (const combobox of comboboxes) {
      if (matchText(combobox.getAttribute('aria-label'), termo)) {
        console.log(`Combobox encontrado para termo: ${termo}`);
        return combobox;
      }
    }

    // Busca adicional para campos com label
    const labels = document.querySelectorAll('label, .q-field__label');
    for (const label of labels) {
      if (label.textContent.toLowerCase().includes(termo.toLowerCase())) {
        const input = label.closest('.q-field').querySelector('input');
        if (input && !camposPreenchidos.has(input)) {
          camposPreenchidos.add(input);
          return input;
        }
      }
    }
  }

  console.log(`Nenhum campo encontrado para ${campoAtual}: ${termos.join(', ')}`);
  return null;
}

function preencherInput(input, valor, campo) {
  // Verifica se o campo já está preenchido
  if (input.value && input.value.trim() !== '') {
    console.log(`Campo ${campo} já preenchido com: ${input.value}. Pulando...`);
    return;
  }

  let valorFormatado = valor;

  // Tratamento especial para referências comerciais e bancárias
  if (Array.isArray(valor) && valor.length > 0 && typeof valor[0] === 'object') {
    valorFormatado = valor.map(item => {
      if (item.nome && item.telefone) {
        return `${item.nome}: ${item.telefone}`;
      } else if (item.banco && item.agencia && item.conta) {
        return `${item.banco} - Ag: ${item.agencia}, Conta: ${item.conta}`;
      }
      return JSON.stringify(item);
    }).join('\n');
  }

  // Definir o valor
  input.value = valorFormatado;

  // Disparar eventos
  ['input', 'change', 'blur', 'focus'].forEach(eventType => {
    input.dispatchEvent(new Event(eventType, { bubbles: true }));
  });

  // Simular digitação para comboboxes
  if (input.getAttribute('role') === 'combobox') {
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
  }

  // Para frameworks reativos
  if (input._valueTracker) {
    input._valueTracker.setValue('');
  }

  // Atualizar o modelo do Quasar, se aplicável
  const qField = input.closest('.q-field');
  if (qField) {
    const vueComponent = qField.__vue__;
    if (vueComponent && typeof vueComponent.updateValue === 'function') {
      vueComponent.updateValue(valorFormatado);
    }
  }

  // Forçar atualização do valor após um curto delay
  setTimeout(() => {
    input.value = valorFormatado;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }, 100);

  console.log(`Valor definido para ${campo}: ${valorFormatado}`);
}

function preencherCamposEndereco(dados) {
  const campos = {
    logradouro: ['logradouro', 'endereço', 'rua'],
    numero: ['número', 'numero'],
    bairro: ['bairro'],
    complemento: ['complemento'],
    cidade: ['cidade', 'município'],
    uf: ['uf', 'estado']
  };

  for (const [campo, termos] of Object.entries(campos)) {
    const input = encontrarInput(termos, campo);
    if (input && (!input.value || input.value.trim() === '')) {
      preencherInput(input, dados[campo], campo);
      console.log(`Campo ${campo} preenchido com: ${dados[campo]}`);
    }
  }
}

function limparFormulario() {
  const campos = {
    nomeCompleto: ['nome completo'],
    dataNascimento: ['nascimento', 'data nascimento', 'data de nascimento'],
    nomePai: ['pai', 'nome do pai'],
    nomeMae: ['mãe', 'nome da mãe'],
    rg: ['rg', 'registro geral'],
    dataEmissaoRG: ['data emissão rg', 'emissão rg'],
    cnh: ['cnh', 'carteira de motorista'],
    validadeCNH: ['validade cnh', 'vencimento cnh'],
    email: ['e-mail', 'email'],
    celular: ['celular', 'telemóvel'],
    telefone: ['telefone', 'fone'],
    site: ['site', 'website'],
    cpf: ['cpf'],
    cep: ['cep', 'código postal'],
    logradouro: ['logradouro', 'endereço', 'rua'],
    numero: ['numero'],
    bairro: ['bairro'],
    complemento: ['complemento'],
    cidade: ['cidade', 'município'],
    uf: ['uf', 'estado'],
    razaoSocial: ['razão social'],
    nomeFantasia: ['nome fantasia'],
    cnpj: ['cnpj'],
    ufInscricaoEstadual: ['uf inscrição estadual', 'ie uf'],
    inscricaoEstadual: ['inscrição estadual', 'ie'],
    inscricaoMunicipal: ['inscrição municipal', 'im'],
    fundacao: ['fundação', 'data de fundação'],
    referenciasComerciais: ['referências comerciais'],
    referenciasBancarias: ['referências bancárias']
  };

  for (const termos of Object.values(campos)) {
    const input = encontrarInput(termos, '');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      
      if (input._valueTracker) {
        input._valueTracker.setValue('');
      }
      console.log(`Campo ${termos[0]} limpo`);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "preencher") {
      preencherFormulario(request.opcoes).then(() => {
        sendResponse({status: "Formulário preenchido com sucesso"});
      }).catch(error => {
        sendResponse({status: "Erro ao preencher formulário", error: error.message});
      });
      return true; // Indica que a resposta será enviada assincronamente
    } else if (request.action === "limpar") {
      limparFormulario();
      sendResponse({status: "Formulário limpo com sucesso"});
    }
  });