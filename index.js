const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const translation = {
  escolhaIdiomaTexto: 'Escolha um idioma\nChoose a language\n(pt/en): ',
  idiomaInvalidoTexto: '\nIdioma inválido. Tente novamente: pt ou en.\nInvalid language. Please try again: pt or en.\n\n',
  pt: {
    wellcome: '\n\nBem-vindo à Criação de um Herói Genérico!',
    heroName: 'Digite o nome do seu herói: ',
    heroAge: 'Digite a idade do seu herói: ',
    invalidAge: 'Idade inválida. Tente novamente.',
    heroTypeAsk: 'Digite o tipo do seu herói (mago, guerreiro, monge ou ninja): ',
    invalidType: 'Tipo inválido. Tente novamente.',
    attackMessage: 'O %s atacou usando %s.',
    heroAttackType: ['magia', 'espada', 'artes marciais', 'shuriken'],
    heroType: ['mago', 'guerreiro', 'monge', 'ninja']
  },
  en: {
    wellcome: '\n\nWelcome to the Generic Hero Creation!',
    heroName: 'Type your hero name: ',
    heroAge: 'Type your hero age: ',
    invalidAge: 'Invalid age. Please try again.',
    heroTypeAsk: 'Type your hero type (mage, warrior, monk or ninja): ',
    invalidType: 'Invalid type. Please try again.',
    attackMessage: 'The %s attacked using %s.',
    heroAttackType: ['magic', 'sword', 'martial arts', 'shuriken'],
    heroType: ['mage', 'warrior', 'monk', 'ninja'],
  },
}

let selectedLanguage = 'pt';

class Hero {
  constructor(name, age, type) {
    this.name = name;
    this.age = age;
    this.type = type;
  }
  
  attck() {
    return this.type;
  }
}

let hero = new Hero();

function getAttack(type) {
  switch (type) {
    case 'mago':
    case 'mage':
      return translation[selectedLanguage].heroAttackType[0];
    case 'guerreiro':
    case 'warrior':
      return translation[selectedLanguage].heroAttackType[1];
    case 'monge':
    case 'monk':
      return translation[selectedLanguage].heroAttackType[2];
    case 'ninja':
      return translation[selectedLanguage].heroAttackType[3];
  }
}

function escolherIdioma() {
  rl.question(translation.escolhaIdiomaTexto, (resposta) => {
    if (translation[resposta]) {
      selectedLanguage = resposta;
      console.log(translation[selectedLanguage].wellcome);
      perguntarNome();
    } else {
      console.log(translation.idiomaInvalidoTexto);
      escolherIdioma();
    }
  });
}

function perguntarNome() {
  rl.question(translation[selectedLanguage].heroName, (resposta) => {
    hero.name = resposta;
    perguntarIdade();
  });
}

function perguntarIdade() {
  rl.question(translation[selectedLanguage].heroAge, (resposta) => {
    if (isNaN(resposta)) {
      console.log(translation[selectedLanguage].invalidAge);
      perguntarIdade();
    } else {
      hero.age = resposta;
      perguntarTipo();
    }
  });
}

function perguntarTipo() {
  rl.question(translation[selectedLanguage].heroTypeAsk, (resposta) => {
    if (translation[selectedLanguage].heroType.includes(resposta)) {
      hero.type = resposta;
      console.log(translation[selectedLanguage].attackMessage, hero.name, getAttack(hero.type));
      rl.close();
    } else {
      console.log(translation[selectedLanguage].invalidType);
      perguntarTipo();
    }
  });
}

escolherIdioma();