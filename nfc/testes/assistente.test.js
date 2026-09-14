/* ==========================================================================
   Bateria de perguntas do assistente de NFC
   --------------------------------------------------------------------------
   Confere se cada pergunta cai no assunto certo — e se as que estão fora do
   tema são recusadas em vez de receberem uma resposta qualquer.

   Uso:  node testes/assistente.test.js
   ========================================================================== */
const RAIZ = require('path').join(__dirname, '..');
global.window = {};
global.document = { readyState: 'complete', addEventListener: function () {}, querySelector: function () { return null; }, querySelectorAll: function () { return []; } };
require(RAIZ + '/assets/js/site.config.js');
require(RAIZ + '/assets/js/base-conhecimento.js');
require(RAIZ + '/assets/js/assistente.js');

var casos = [
  ['O que é NFC?', 'o-que-e'],
  ['nfc', 'o-que-e'],
  ['para que serve o nfc', 'beneficio'],
  ['NFC é seguro?', 'seguro'],
  ['tenho medo de golpe, é perigoso?', 'seguro'],
  ['Funciona em qualquer celular?', 'celular'],
  ['meu samsung antigo tem nfc?', 'tem-nfc'],
  ['funciona no iPhone 13?', 'iphone'],
  ['Posso usar em pagamentos?', 'pagamento'],
  ['dá para pagar com o celular na maquininha?', 'pagamento'],
  ['Precisa de aplicativo?', 'app'],
  ['tenho que baixar algum app pra ler?', 'app'],
  ['Funciona sem internet?', 'internet'],
  ['qual a diferença para o QR Code?', 'qrcode'],
  ['nfc ou qr code, qual é melhor?', 'qrcode'],
  ['diferença entre nfc e bluetooth', 'bluetooth'],
  ['nfc e rfid é a mesma coisa?', 'rfid'],
  ['quanto custa uma tag nfc?', 'custo'],
  ['qual o preço de um cartão?', 'custo'],
  ['dá para usar em cardápio de restaurante?', 'restaurante'],
  ['quero um cartão de visita digital', 'visita'],
  ['serve para controle de acesso com catraca?', 'acesso'],
  ['posso usar em crachá de funcionário?', 'acesso'],
  ['e para eventos e ingressos?', 'evento'],
  ['como funciona na saúde, em hospital?', 'saude'],
  ['serve para pegar avaliação no google?', 'avaliacoes'],
  ['dá para clonar uma tag?', 'clonar'],
  ['posso pegar vírus?', 'virus'],
  ['quantos centímetros de distância?', 'alcance'],
  ['qual o alcance?', 'alcance'],
  ['o que é nfc ativo e passivo?', 'ativo'],
  ['a tag precisa de bateria?', 'bateria'],
  ['gasta muita bateria do celular?', 'bateria'],
  ['como eu gravo uma tag?', 'gravar'],
  ['posso regravar depois?', 'regravar'],
  ['quanto tempo dura a etiqueta?', 'durabilidade'],
  ['quanto cabe de memória?', 'memoria'],
  ['funciona colado em metal?', 'metal'],
  ['pode molhar na chuva?', 'agua'],
  ['funciona por cima da capinha?', 'capinha'],
  ['como ativo o nfc no android?', 'ativar'],
  ['não está lendo, o que faço?', 'ativar'],
  ['em quais formatos existe?', 'formatos'],
  ['tem chaveiro e pulseira?', 'formatos'],
  ['vocês usam meus dados pessoais?', 'privacidade'],
  ['quais as vantagens?', 'beneficio'],
  ['como faço para começar?', 'comecar'],
  ['serve para loja e promoção?', 'varejo'],
  ['como saber se o produto é original?', 'rastreio'],
  ['13,56 mhz, como funciona por dentro?', 'como-funciona'],
  ['oi', 'conversa'],
  ['bom dia', 'conversa'],
  ['obrigado!', 'conversa'],
  ['quem é você?', 'conversa'],
  ['o que você sabe responder?', 'conversa'],
  ['qual a receita de bolo de cenoura?', 'naoSei'],
  ['quanto é 2 + 2?', 'naoSei'],
  ['qual a previsão do tempo amanhã?', 'naoSei']
];

var A = window.AssistenteNFC;
var erros = 0;
casos.forEach(function (c) {
  var r = A.responderLocal(c[0]);
  var achado = r.tipo === 'topico' ? idDe(r) : r.tipo;
  var ok = (c[1] === 'conversa' && r.tipo === 'conversa') ||
           (c[1] === 'naoSei' && r.tipo === 'naoSei') ||
           achado === c[1];
  if (!ok) { erros++; console.log('  ✗ "' + c[0] + '" → ' + achado + ' (esperado: ' + c[1] + ')'); }
});

// Descobre o id pelo HTML da resposta (a API pública não devolve o id).
function idDe(r) {
  var achado = '?';
  window.BASE_NFC.topicos.forEach(function (t) { if (t.resposta === r.html) achado = t.id; });
  return achado;
}

console.log('\n' + (casos.length - erros) + '/' + casos.length + ' perguntas classificadas corretamente.');
process.exit(erros ? 1 : 0);
