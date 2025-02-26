import { PDFDocument } from 'pdf-lib';
import fetch from 'react-native-fetch-blob';

const extractTextFromPdf = async (pdfUri, page, x, y) => {
  try {
    const response = await fetch(pdfUri);
    const arrayBuffer = await response.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pdfPage = pdfDoc.getPage(page - 1);
    const textContent = await pdfPage.getTextContent();
    
    // Find the nearest text based on x, y
    let closestText = '';
    let minDistance = Infinity;

    textContent.items.forEach(item => {
      const distance = Math.sqrt((item.transform[4] - x) ** 2 + (item.transform[5] - y) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        closestText = item.str;
      }
    });

    return closestText;
  } catch (error) {
    console.error('Error extracting text:', error);
    return null;
  }
};

export default extractTextFromPdf;
