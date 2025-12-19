import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateTicketPdf = async ({ booking }) => {
    const dirPath = path.resolve(process.cwd(), "tickets");
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    const fileName = `${booking.pnr}.pdf`;
    const filePath = path.join(dirPath, fileName);

    const doc = new PDFDocument({
        size: "A4",
        margin: 0
    });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    const colors = {
        primary: "#2563EB",
        dark: "#0F172A",
        slate: "#64748B",
        border: "#E2E8F0",
        bg: "#F8FAFC"
    };

    doc.rect(0, 0, 595.28, 841.89).fill(colors.bg);

    doc.rect(0, 0, 595.28, 140).fill(colors.primary);
    doc.fillColor("#FFFFFF")
        .fontSize(24)
        .font("Helvetica-Bold")
        .text("E-TICKET", 50, 55, { characterSpacing: 2 });

    doc.fontSize(10)
        .font("Helvetica")
        .fillColor("#DBEAFE")
        .text("BOARDING PASS & RECEIPT", 50, 85);

    const cardX = 50;
    const cardY = 180;
    const cardW = 495;
    const cardH = 340;

    doc.roundedRect(cardX, cardY, cardW, cardH, 20)
        .fillColor("#FFFFFF")
        .fill();

    doc.fillColor(colors.dark)
        .fontSize(18)
        .font("Helvetica-Bold")
        .text(booking.airline.toUpperCase(), 80, cardY + 35);

    doc.fillColor(colors.slate)
        .fontSize(8)
        .font("Helvetica-Bold")
        .text("BOOKING PNR", 400, cardY + 30, { align: "right", width: 100 });

    doc.fillColor(colors.primary)
        .fontSize(14)
        .font("Courier-Bold")
        .text(booking.pnr, 400, cardY + 45, { align: "right", width: 100 });

    doc.moveTo(80, cardY + 75)
        .lineTo(515, cardY + 75)
        .lineWidth(1)
        .strokeColor(colors.border)
        .stroke();

    doc.fillColor(colors.slate)
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("DEPARTURE", 80, cardY + 105)
        .text("ARRIVAL", 435, cardY + 105, { align: "right" });

    doc.fillColor(colors.dark)
        .fontSize(32)
        .font("Helvetica-Bold")
        .text(booking.from.toUpperCase(), 80, cardY + 120);

    doc.fillColor(colors.dark)
        .fontSize(32)
        .font("Helvetica-Bold")
        .text(booking.to.toUpperCase(), 365, cardY + 120, { align: "right", width: 150 });

    doc.strokeColor(colors.border)
        .lineWidth(2)
        .dash(5, { space: 5 })
        .moveTo(220, cardY + 145)
        .lineTo(370, cardY + 145)
        .stroke();

    doc.undash();

    doc.fillColor(colors.slate)
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("PASSENGER", 80, cardY + 200)
        .text("FLIGHT ID", 250, cardY + 200)
        .text("DATE", 435, cardY + 200, { align: "right" });

    doc.fillColor(colors.dark)
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(booking.passengerName || "VALUED PASSENGER", 80, cardY + 215)
        .text(booking.flightId, 250, cardY + 215)
        .text(new Date(booking.createdAt).toLocaleDateString(), 400, cardY + 215, { align: "right", width: 115 });

    doc.rect(80, cardY + 260, 435, 50)
        .fillColor(colors.bg)
        .fill();

    doc.fillColor(colors.slate)
        .fontSize(9)
        .font("Helvetica-Bold")
        .text("TOTAL FARE PAID", 100, cardY + 278);

    doc.fillColor(colors.primary)
        .fontSize(18)
        .font("Helvetica-Bold")
        .text(`INR ${booking.amountPaid.toLocaleString("en-IN")}`, 350, cardY + 275, { align: "right", width: 150 });

    doc.end();

    await new Promise(resolve => stream.on("finish", resolve));

    return `/tickets/${fileName}`;
};

const pdfServices = {
    generateTicketPdf
};

export default pdfServices;