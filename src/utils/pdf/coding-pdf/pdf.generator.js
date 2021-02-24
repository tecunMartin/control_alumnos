const puppeteer = require('puppeteer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const pug = require('pug');

const compile = async function (templateName, data, completeFile, teacher) {
  const filepath = path.join(process.cwd(), './src/utils/pdf/coding-pdf/', `${templateName}.pug`);
  const html = await fs.readFile(filepath, 'utf-8');
  const newData = { cursos: data, estudiante: [completeFile] };
  return pug.compile(html)(newData);
};

async function pdf(dataCursos, objectCursos) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = await compile('pdf.template', dataCursos, objectCursos);

    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: `./src/utils/pdf/generatorPdf/${objectCursos.user}.pdf`,
      format: 'a6',
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '40px',
        left: '20px',
        right: '20px',
      },
    });

    console.log(chalk.greenBright('DONE PDF'));
    await browser.close();
  } catch (e) {
    return console.log('Our error', e);
  }
}

module.exports = {
  pdf,
};
