// Script para adicionar dados de teste ao histórico
// Execute no console do navegador

const cidades = [
  { nome: 'São Paulo', temp: 22, desc: 'nublado', icon: '04d' },
  { nome: 'Rio de Janeiro', temp: 28, desc: 'ensolarado', icon: '01d' },
  { nome: 'Belo Horizonte', temp: 25, desc: 'parcialmente nublado', icon: '02d' },
  { nome: 'Salvador', temp: 30, desc: 'ensolarado', icon: '01d' },
  { nome: 'Brasília', temp: 24, desc: 'chuva leve', icon: '10d' },
  { nome: 'Fortaleza', temp: 32, desc: 'ensolarado', icon: '01d' },
  { nome: 'Manaus', temp: 29, desc: 'chuva forte', icon: '09d' },
  { nome: 'Curitiba', temp: 18, desc: 'nublado', icon: '04d' },
  { nome: 'Recife', temp: 31, desc: 'parcialmente nublado', icon: '02d' },
  { nome: 'Porto Alegre', temp: 20, desc: 'chuva leve', icon: '10d' },
  { nome: 'Goiânia', temp: 26, desc: 'ensolarado', icon: '01d' },
  { nome: 'Belém', temp: 33, desc: 'chuva forte', icon: '09d' },
  { nome: 'Guarulhos', temp: 23, desc: 'nublado', icon: '04d' },
  { nome: 'Campinas', temp: 21, desc: 'parcialmente nublado', icon: '02d' },
  { nome: 'São Luís', temp: 34, desc: 'ensolarado', icon: '01d' },
  { nome: 'São Gonçalo', temp: 27, desc: 'chuva leve', icon: '10d' },
  { nome: 'Maceió', temp: 29, desc: 'ensolarado', icon: '01d' },
  { nome: 'Duque de Caxias', temp: 26, desc: 'nublado', icon: '04d' },
  { nome: 'Teresina', temp: 35, desc: 'ensolarado', icon: '01d' },
  { nome: 'Natal', temp: 30, desc: 'parcialmente nublado', icon: '02d' },
  { nome: 'Campo Grande', temp: 28, desc: 'chuva leve', icon: '10d' },
  { nome: 'Nova Iguaçu', temp: 25, desc: 'nublado', icon: '04d' },
  { nome: 'São Bernardo do Campo', temp: 22, desc: 'chuva forte', icon: '09d' },
  { nome: 'João Pessoa', temp: 31, desc: 'ensolarado', icon: '01d' },
  { nome: 'Santo André', temp: 21, desc: 'parcialmente nublado', icon: '02d' },
  { nome: 'Osasco', temp: 23, desc: 'nublado', icon: '04d' },
  { nome: 'Jaboatão dos Guararapes', temp: 32, desc: 'ensolarado', icon: '01d' },
  { nome: 'Contagem', temp: 24, desc: 'chuva leve', icon: '10d' },
  { nome: 'Aracaju', temp: 33, desc: 'ensolarado', icon: '01d' },
  { nome: 'Cuiabá', temp: 27, desc: 'chuva forte', icon: '09d' }
];

const historico = cidades.map((cidade, index) => ({
  cidade: cidade.nome,
  temperatura: cidade.temp,
  descricao: cidade.desc,
  data: new Date(Date.now() - (index * 60000)).toISOString(), // Cada busca 1 minuto antes
  icone: cidade.icon
}));

localStorage.setItem('historicoCidades', JSON.stringify(historico));
console.log('Histórico de teste criado com 30 itens!');
console.log('Recarregue a página e navegue para o histórico para ver a paginação.');
