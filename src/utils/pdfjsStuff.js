import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';

export const getPdfText = async src => {
  const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');
  pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  return new Promise(res => {
    const fr = new FileReader();
    fr.onload = async function() {
      let typedArray = new Uint8Array(this.result);
      const doc = await pdfjs.getDocument(typedArray).promise;
      const page = await doc.getPage(1);
      const text = await page.getTextContent();
      const items = text.items.map(item => item.str);
      const finalText = items.join('');
      res(finalText);
    };

    fr.readAsArrayBuffer(src);
  });
};
