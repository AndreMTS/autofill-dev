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
  const dominios = ["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"];
  return `${nome.toLowerCase()}.${sobrenome.toLowerCase()}${Math.floor(Math.random() * 100)}@${dominios[Math.floor(Math.random() * dominios.length)]}`;
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

async function preencherFormulario(opcoes) {
    const dados = await gerarDadosFicticios();
  
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
    uf: ['uf', 'estado']
  };

  for (const [campo, termos] of Object.entries(campos)) {
    if (opcoes[campo]) {
      const input = encontrarInput(termos);
      if (input) {
        preencherInput(input, dados[campo]);
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

function encontrarInput(termos) {
  for (const termo of termos) {
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
      `input.q-field__native[type="tel"]`
    ];

    for (const seletor of seletores) {
      const input = document.querySelector(seletor);
      if (input) return input;
    }

    const inputs = document.querySelectorAll('input[type="text"], input[type="date"], input[type="email"], input[type="tel"], input[type="url"]');
    for (const input of inputs) {
      const ariaLabel = input.getAttribute('aria-label');
      const placeholder = input.getAttribute('placeholder');
      if (ariaLabel?.toLowerCase() === termo || 
          placeholder?.toLowerCase() === termo ||
          ariaLabel?.toLowerCase().includes(termo) || 
          placeholder?.toLowerCase().includes(termo)) {
        return input;
      }
    }
  }

  return null;
}

function preencherInput(input, valor) {
  if (input.value && input.value.trim() !== '') {
    console.log(`Campo já preenchido com: ${input.value}. Pulando...`);
    return;
  }

  input.value = valor;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
  input.dispatchEvent(new Event('blur', { bubbles: true }));
  
  if (input._valueTracker) {
    input._valueTracker.setValue('');
  }
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
    const input = encontrarInput(termos);
    if (input && (!input.value || input.value.trim() === '')) {
      preencherInput(input, dados[campo]);
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
    uf: ['uf', 'estado']
  };

  for (const termos of Object.values(campos)) {
    const input = encontrarInput(termos);
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