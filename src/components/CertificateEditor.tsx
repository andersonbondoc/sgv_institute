import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { IonIcon } from "@ionic/react";
import { cloudDownloadOutline } from "ionicons/icons";

interface CertificateEditorProps {
  name: string;
  ruralBankName: string;
  wblTitle: string;
  lessons: string[];
  isCertificateEnabled: boolean;
  hours: any;
}

const CertificateEditor: React.FC<CertificateEditorProps> = ({
  name,
  ruralBankName,
  wblTitle,
  lessons,
  isCertificateEnabled,
  hours,
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
          { text: `${name.toUpperCase()} `, font: fontBold, size: 18 },
          { text: " of ", font: fontRegular, size: 18 },
          { text: `${ruralBankName.toUpperCase()}`, font: fontBold, size: 18 },
        ],
        startY
      );
      startY -= fontRegular.heightAtSize(18) + 10;
      drawTextCentered(
        `has successfully completed ${hours} the Web-Based Learning (WBL) on`,
        fontRegular,
        14,
        startY
      );
      startY -= fontRegular.heightAtSize(14) + 15;

      // ✅ WBL Title
      drawTextCentered(`${wblTitle}`, fontBold, 16, startY);
      startY -= fontBold.heightAtSize(16) + 25;

      // ✅ Topics Covered
      drawTextInline(
        [
          {
            text: "This WBL covered essential topics on ",
            font: fontRegular,
            size: 14,
          },
          { text: `${wblTitle} `, font: fontBold, size: 14 },
          { text: "specifically: ", font: fontRegular, size: 14 },
        ],
        startY
      );
      startY -= fontRegular.heightAtSize(12) + 15;

      let lessonY = startY;
      const lessonX = pageWidth * 0.15;
      lessons.forEach((lesson, index) => {
        page.drawText(`${index + 1}. ${lesson}`, {
          x: lessonX,
          y: lessonY,
          size: 12,
          font: fontRegular,
          color: rgb(0, 0, 0),
        });
        lessonY -= fontRegular.heightAtSize(12) + 10;
      });

      // Save and trigger download
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
        className={`flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-semibold text-lg shadow-md transition duration-300 ease-in-out 
      ${
        isCertificateEnabled
          ? "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
        disabled={!isCertificateEnabled}
      >
        <IonIcon icon={cloudDownloadOutline} className="w-6 h-6" />
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateEditor;
