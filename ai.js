// INSTALAR NODE.JS v14.17.3 'https://nodejs.org/pt-br/download/'
// Executando projeto: Abrir a pasta raíz do projeto, executar o terminal na pasta raíz e executar os comandos: npm install / node ai.js

// Módulos utilizados
const {createWorker} = require('tesseract.js');
const path = require('path');
const sharp = require('sharp');

// imagem que será recortada na posição desejada
let originalImage = 'test.jfif';

// imagem recortada salva na posição
let outputImage = 'cropped.png'

//sharp é uma função do módulo instalado, ele reconhece 1 parâmetro, sendo a imagem que IRÁ ser cortada, depois recebe funções adicionais
//.extract({}), que recebe 4 parâmetros: width, height, left, top
//.toFile() que define onde será deixada o recorte da imagem

sharp(originalImage).extract({ width: 440, height: 100, left: 280, top: 280 }).toFile(outputImage)

    //Caso o recorte dê certo, ele retorna uma mensagem de sucesso
    .then(function(new_file_info) {
        console.log("Image saved");
    })
    //Caso o recorte dê erro (por exemplo, por formato de imagem ou posição fora de imagem) ele irá retornar que deu erro
    .catch(function(err) {
        console.log("Error occured");
    })

// worker é uma constante que cria e executa a função createWorker({}), esta recebe 2 parâmetros, o langPath, 
// o diretório da linguagem do texto e o logger, que retorna a linguagem para work.
const worker = createWorker({
    langPath: path.join(__dirname, '..', 'lang-data'), 
    // logger: m => console.log(m), //Ative essa linha caso queira ver o progresso da IA.
});

// Aqui criamos uma função assíncrona, onde executamos o worker, ele irá fazer todo o processo de incialização.
(async () => {
    await worker.load();
    
    //Troque as siglas para a linguagem desejada
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    //Nesta linha, definimos a váriavel do texto como o texto escaneado.
    const { data: { text } } = await worker.recognize(path.join(__dirname, 'cropped.png'));

    //Podemos usar a variável como bem entendemos.
    console.log(text);
    await worker.terminate();
})();

//references


//Site para saber a posição do texto 'https://yangcha.github.io/iview/iview.html'

//https://github.com/desmondmorris/node-tesseract
//https://stackoverflow.com/questions/33668586/reading-the-text-value-or-number-from-an-image-using-node-js
//https://www.ti-enxame.com/pt/image/ferramenta-de-corte-de-imagem-em-lote-da-linha-de-comando/968641008/
//https://imasters.com.br/front-end/processamento-de-imagens-em-javascript
//https://usefulangle.com/post/104/nodejs-crop-image
//https://sharp.pixelplumbing.com/api-resize
//http://stack.desenvolvedor.expert/comecando-com-node/inicializando-um-app-node.html
//https://stackoverflow.com/questions/15136952/can-a-c-sharp-application-communicate-with-node-js-code
//https://stackoverflow.com/questions/20644384/best-way-to-convert-text-string-to-image-in-node-js
//https://blog.logrocket.com/how-to-extract-text-from-an-image-using-javascript-8fe282fb0e71/
//https://github.com/maciejcieslar/OCR
//https://github.com/naptha/tesseract.js#tesseractjs
//https://github.com/jeromewu/tesseract.js-offline