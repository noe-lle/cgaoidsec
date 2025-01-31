import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generatePdf(formData: any) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter size
  const { width, height } = page.getSize();
  
  // Load font
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw form border
  page.drawRectangle({
    x: 50,
    y: 50,
    width: width - 100,
    height: height - 100,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // Form number
  page.drawText('Form No. CGAO-001', {
    x: width - 200,
    y: height - 40,
    size: 12,
    font: boldFont,
  });

  // Header with PCG Logo placeholder
  page.drawText('PHILIPPINE COAST GUARD', {
    x: 150,
    y: height - 80,
    size: 16,
    font: boldFont,
  });

  // Add all form fields matching exact positions from the image
  const drawField = (label: string, value: string, x: number, y: number) => {
    page.drawText(label, { x, y, size: 10, font: boldFont });
    page.drawText(value || '_____________', { x: x + 100, y, size: 10, font });
  };

  // Draw all fields matching the form layout
  drawField('DATE:', formData.date || new Date().toLocaleDateString(), 60, height - 150);
  drawField('CONTACT NO.:', formData.contactNumber || '', 250, height - 150);
  drawField('ID NO:', formData.serialNumber || '', 450, height - 150);

  // Add more fields matching exact positions...

  // Picture box
  page.drawRectangle({
    x: width - 150,
    y: height - 300,
    width: 100,
    height: 100,
    borderColor: rgb(0, 0, 0),
    borderWidth: 1,
  });

  // If picture exists, embed it
  if (formData.picture) {
    const imageBytes = await fetch(formData.picture).then(res => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);
    page.drawImage(image, {
      x: width - 150,
      y: height - 300,
      width: 100,
      height: 100,
    });
  }

  // Signature box
  if (formData.signature) {
    const signatureBytes = await fetch(formData.signature).then(res => res.arrayBuffer());
    const signature = await pdfDoc.embedPng(signatureBytes);
    page.drawImage(signature, {
      x: 100,
      y: 200,
      width: 200,
      height: 50,
    });
  }

  // Statement of Consent
  page.drawText('STATEMENT OF CONSENT', {
    x: width / 2 - 80,
    y: 180,
    size: 12,
    font: boldFont,
  });

  // Add the consent text
  const consentText = 'I declare that I am fully aware that the above data shall be used for securing my Common Reference...';
  page.drawText(consentText, {
    x: 60,
    y: 160,
    size: 8,
    font,
    maxWidth: width - 120,
  });

  // Add signature lines and labels
  page.drawLine({
    start: { x: 100, y: 100 },
    end: { x: 250, y: 100 },
    thickness: 1,
  });
  page.drawText('DATE SIGNED', {
    x: 150,
    y: 85,
    size: 10,
    font,
  });

  // Generate PDF bytes
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
} 