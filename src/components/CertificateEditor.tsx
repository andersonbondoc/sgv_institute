import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { IonIcon } from "@ionic/react";
import { cloudDownloadOutline } from "ionicons/icons";
type TextFragment = {
  text: string;
  font: any; // Replace 'any' with a more specific type if available
  size: number;
};
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

      // Define margins and available width
      const margin = 50;
      const availableWidth = pageWidth - margin * 2;

      // Function to draw inline text on a given line with a starting X
      const drawTextInline = (
        texts: TextFragment[],
        y: number,
        startX: number
      ) => {
        let currentX = startX;
        texts.forEach(({ text, font, size }) => {
          page.drawText(text, {
            x: currentX,
            y,
            size,
            font,
            color: rgb(0, 0, 0),
          });
          currentX += font.widthOfTextAtSize(text, size);
        });
      };

      // Function to center text on the page
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

      // Function to split text fragments into lines if they exceed maxWidth.
      const splitFragmentsIntoLines = (
        fragments: TextFragment[],
        maxWidth: number
      ): TextFragment[][] => {
        const lines: TextFragment[][] = [];
        let currentLine: TextFragment[] = [];

        // Helper: calculate the width of an array of fragments.
        const getLineWidth = (frags: TextFragment[]) =>
          frags.reduce(
            (acc, frag) =>
              acc + frag.font.widthOfTextAtSize(frag.text, frag.size),
            0
          );

        fragments.forEach((frag) => {
          // Check if adding this fragment would exceed maxWidth.
          if (getLineWidth([...currentLine, frag]) > maxWidth) {
            // If currentLine is not empty, push it as one line.
            if (currentLine.length > 0) {
              lines.push(currentLine);
              currentLine = [];
            }
            // If a single fragment is too long, break it by words.
            if (frag.font.widthOfTextAtSize(frag.text, frag.size) > maxWidth) {
              const words = frag.text.split(" ");
              let lineText = "";
              words.forEach((word, index) => {
                const testLine = lineText ? lineText + " " + word : word;
                if (
                  frag.font.widthOfTextAtSize(testLine, frag.size) > maxWidth &&
                  lineText !== ""
                ) {
                  lines.push([
                    { text: lineText, font: frag.font, size: frag.size },
                  ]);
                  lineText = word;
                } else {
                  lineText = testLine;
                }
                if (index === words.length - 1 && lineText) {
                  // Add the remaining text to currentLine
                  currentLine.push({
                    text: lineText,
                    font: frag.font,
                    size: frag.size,
                  });
                }
              });
            } else {
              currentLine.push(frag);
            }
          } else {
            currentLine.push(frag);
          }
        });
        if (currentLine.length > 0) lines.push(currentLine);
        return lines;
      };

      // Starting Y position for certificate content.
      let startY = pageHeight * 0.55;
      drawTextCentered("CERTIFICATE OF COMPLETION", fontBold, 24, startY);
      startY -= fontBold.heightAtSize(24) + 20;

      // Prepare the inline text fragments that may require wrapping.
      const fragments: TextFragment[] = [
        { text: "This is to certify that ", font: fontRegular, size: 18 },
        { text: `${name.toUpperCase()} `, font: fontBold, size: 18 },
        { text: " of ", font: fontRegular, size: 18 },
        { text: `${ruralBankName.toUpperCase()}`, font: fontBold, size: 18 },
      ];

      // Split the fragments into lines if needed.
      const lines = splitFragmentsIntoLines(fragments, availableWidth);
      lines.forEach((lineFragments) => {
        // Calculate line width to center each line.
        const lineWidth = lineFragments.reduce(
          (acc, frag) =>
            acc + frag.font.widthOfTextAtSize(frag.text, frag.size),
          0
        );
        const startX = (pageWidth - lineWidth) / 2;
        drawTextInline(lineFragments, startY, startX);
        // Adjust startY for next line (change spacing as desired).
        startY -= fontRegular.heightAtSize(18) + 10;
      });

      // Continue with other text as needed.
      drawTextCentered(
        `has successfully completed ${hours} the Web-Based Learning (WBL) on`,
        fontRegular,
        14,
        startY
      );
      startY -= fontRegular.heightAtSize(14) + 15;

      // WBL Title
      drawTextCentered(`${wblTitle}`, fontBold, 16, startY);
      startY -= fontBold.heightAtSize(16) + 25;

      // Topics Covered
      const topicsFragments: TextFragment[] = [
        {
          text: "This WBL covered essential topics on ",
          font: fontRegular,
          size: 14,
        },
        { text: `${wblTitle} `, font: fontBold, size: 14 },
        { text: "specifically: ", font: fontRegular, size: 14 },
      ];
      const topicsLines = splitFragmentsIntoLines(
        topicsFragments,
        availableWidth
      );
      topicsLines.forEach((lineFragments) => {
        const lineWidth = lineFragments.reduce(
          (acc, frag) =>
            acc + frag.font.widthOfTextAtSize(frag.text, frag.size),
          0
        );
        const startX = (pageWidth - lineWidth) / 2;
        drawTextInline(lineFragments, startY, startX);
        startY -= fontRegular.heightAtSize(14) + 15;
      });

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
