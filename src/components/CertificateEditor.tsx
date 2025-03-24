import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

interface CertificateEditorProps {
  name: string;
  ruralBankName: string;
  wblTitle: string;
  lessons: string[];
  isCertificateEnabled: boolean;
}

const CertificateEditor: React.FC<CertificateEditorProps> = ({
  name,
  ruralBankName,
  wblTitle,
  lessons,
  isCertificateEnabled,
}) => {
  console.log("isCertificateEnabled: ", isCertificateEnabled);
  const generatePDF = async () => {
    try {
      // Load the PDF template
      const response = await fetch("/certificate/certificate.pdf");
      if (!response.ok) throw new Error("Failed to load PDF");
      const templateBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const page = pdfDoc.getPage(0);
      const pageWidth = page.getWidth();
      const pageHeight = page.getHeight();

      // Embed fonts
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // ✅ Function to Draw Inline Text (Prevent Overlap)
      const drawTextInline = (
        texts: { text: string; font: any; size: number }[],
        y: number
      ) => {
        let totalWidth = texts.reduce((acc, { text, font, size }) => {
          return acc + font.widthOfTextAtSize(text, size);
        }, 0);

        // Calculate the starting X position to center everything
        let startX = (pageWidth - totalWidth) / 2;

        // Render each part inline without overlap
        texts.forEach(({ text, font, size }) => {
          page.drawText(text, {
            x: startX,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });
          startX += font.widthOfTextAtSize(text, size);
        });
      };

      // ✅ Function to Center Text
      const drawTextCentered = (
        text: string,
        font: any,
        size: number,
        y: number
      ) => {
        const textWidth = font.widthOfTextAtSize(text, size);
        const x = (pageWidth - textWidth) / 2;
        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        });
      };

      let startY = pageHeight * 0.55;
      drawTextCentered("CERTIFICATE OF COMPLETION", fontBold, 24, startY);
      startY -= fontBold.heightAtSize(24) + 20;

      drawTextInline(
        [
          { text: "This is to certify that ", font: fontRegular, size: 18 },
          { text: `${name.toUpperCase()}`, font: fontBold, size: 18 },
          { text: " of ", font: fontRegular, size: 18 },
          { text: `${ruralBankName.toUpperCase()}`, font: fontBold, size: 18 },
        ],
        startY
      );
      startY -= fontRegular.heightAtSize(18) + 10;

      drawTextCentered(
        "has successfully completed the Web-Based Learning (WBL) on",
        fontRegular,
        14,
        startY
      );
      startY -= fontRegular.heightAtSize(14) + 10;

      drawTextCentered(wblTitle, fontBold, 14, startY);
      startY -= fontBold.heightAtSize(14) + 20;

      let lessonY = startY - 10;
      const lessonX = pageWidth * 0.15;
      lessons.forEach((lesson, index) => {
        page.drawText(`${index + 1}. ${lesson}`, {
          x: lessonX,
          y: lessonY,
          size: 14,
          font: fontRegular,
          color: rgb(0, 0, 0),
        });
        lessonY -= fontRegular.heightAtSize(14) + 10;
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "certificate.pdf";
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <button
        onClick={generatePDF}
        className={`py-2 px-6 rounded transition duration-200 ease-in-out 
      ${
        isCertificateEnabled
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-200 text-black cursor-not-allowed"
      }`}
        disabled={!isCertificateEnabled}
      >
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateEditor;
