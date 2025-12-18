import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const generateTicketPdf = async ({ booking }) => {
    const dirPath = path.resolve(process.cwd(), "server", "tickets");
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });

    const fileName = `${booking.pnr}.pdf`;
    const filePath = path.join(dirPath, fileName);

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(20).text("Flight Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`PNR: ${booking.pnr}`);
    doc.text(`Passenger: ${booking.passengerName || "Passenger"}`);
    doc.text(`Airline: ${booking.airline}`);
    doc.text(`Route: ${booking.from} to ${booking.to}`);
    doc.text(`Price Paid: ₹${booking.amountPaid}`);
    doc.text(`Booking Date: ${new Date(booking.createdAt).toLocaleString()}`);

    doc.end();

    await new Promise(resolve => stream.on("finish", resolve));

    return `/tickets/${fileName}`;
};

const pdfServices = {
    generateTicketPdf
};

export default pdfServices;