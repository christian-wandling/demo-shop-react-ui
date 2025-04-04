import { jsPDF } from 'jspdf';
import { OrderResponse, UserResponse } from '@demo-shop-react-ui/api';
import { format } from 'date-fns/format';
import { CompanyData } from '../models/company-data';
import { PaymentTerms } from '../models/payment-terms';
import { DrawOptions } from '../models/draw-options';
import { PdfTableColumns } from '../models/pdf-table.columns';
import { columns, companyData, createDrawOptions, paymentTerms } from '../constants/print-invoice.config';

/**
 * Generates a complete PDF invoice document for a given order
 *
 * Creates a PDF document with order details including company information, logo,
 * customer details, invoice number, date, and itemized order contents.
 *
 * @param order - Order information containing items and pricing details
 * @param user - User information for the customer who placed the order
 */
export function generatePdf(order: OrderResponse, user: UserResponse): void {
  if (!order) {
    throw new Error('Error printing invoice, order is missing');
  }

  if (!user) {
    throw new Error('Error printing invoice, user is missing');
  }

  const doc = new jsPDF('p', 'mm', 'A4', true);
  const drawOptions = createDrawOptions(doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight());

  addFooter(doc, drawOptions, paymentTerms);
  addLogo(doc, drawOptions);
  addCompanyInformation(doc, drawOptions, companyData);
  addInvoiceDetails(doc, drawOptions, order);
  addCustomerInformation(doc, drawOptions, user);
  addTableHeader(doc, drawOptions, columns);
  addTableItems(doc, drawOptions, columns, order, paymentTerms);
  addTableFooter(doc, drawOptions, columns, order);

  doc.save(`invoice-${order.id}.pdf`);
}

/**
 * Adds the company logo to the PDF document
 *
 * Positions and inserts the logo image at the top-left corner of the document.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 */
function addLogo(doc: jsPDF, options: DrawOptions): void {
  options.pointer.x = options.border.left;
  options.pointer.y = options.border.top;

  const width = 25;
  const height = 25;

  doc.addImage('icons/demo-shop.png', 'PNG', options.pointer.x, options.pointer.y, width, height);
}

/**
 * Adds company information to the PDF document
 *
 * Displays company details including name, address, contact information
 * at the top-right corner of the document.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param companyData - Company information to display
 */
function addCompanyInformation(doc: jsPDF, options: DrawOptions, companyData: CompanyData): void {
  options.pointer.x = options.border.right;
  options.pointer.y += 6;
  doc.setFont(options.text.font.default, 'bold');
  doc.setFontSize(options.text.size.small);
  doc.setTextColor(options.text.color.light);
  doc.text(companyData.name, options.pointer.x, options.pointer.y, { align: 'right' });

  options.pointer.y += 4;
  doc.setFont(options.text.font.default);
  doc.setFontSize(options.text.size.smaller);
  doc.text(companyData.address, options.pointer.x, options.pointer.y, { align: 'right' });

  options.pointer.y += 4;
  doc.text(companyData.city + ', ' + companyData.zipCode, options.pointer.x, options.pointer.y, { align: 'right' });

  options.pointer.y += 4;
  doc.text(companyData.phone, options.pointer.x, options.pointer.y, { align: 'right' });

  options.pointer.y += 4;
  doc.text(companyData.email, options.pointer.x, options.pointer.y, { align: 'right' });
}

/**
 * Adds invoice details to the PDF document
 *
 * Displays the invoice number and creation date in the document.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param order - Order information containing the invoice ID and creation date
 */
function addInvoiceDetails(doc: jsPDF, options: DrawOptions, order: OrderResponse): void {
  options.pointer.y += 22;
  doc.setFontSize(options.text.size.smaller);
  doc.setFont(options.text.font.default, 'bold');
  doc.text(`INVOICE #${order.id}`, options.pointer.x, options.pointer.y, { align: 'right' });

  options.pointer.y += 4;
  const date = format(order.created, 'yyyy-MM-dd');
  doc.setFont(options.text.font.default);
  doc.text(date, options.pointer.x, options.pointer.y, { align: 'right' });
}

/**
 * Adds customer information to the PDF document
 *
 * Displays customer details including name, address, and contact information.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param user - User information for the customer
 */
function addCustomerInformation(doc: jsPDF, options: DrawOptions, user: UserResponse): void {
  options.pointer.x = options.border.left;
  options.pointer.y += 15;
  doc.setFontSize(options.text.size.smaller);
  doc.setFont('Helvetica', 'bold');
  doc.text('YOUR DATA:', options.pointer.x, options.pointer.y);
  doc.setFont('Helvetica');

  options.pointer.y += 6;
  doc.text(`${user.firstname} ${user.lastname}`, options.pointer.x, options.pointer.y);

  options.pointer.y += 4;
  doc.text(`${user.address?.street} ${user.address?.apartment}`, options.pointer.x, options.pointer.y);

  options.pointer.y += 4;
  doc.text(`${user.address?.city}, ${user.address?.zip}`, options.pointer.x, options.pointer.y);

  options.pointer.y += 4;
  doc.text(user.address?.country ?? '', options.pointer.x, options.pointer.y);

  options.pointer.y += 4;
  doc.text(user.email, options.pointer.x, options.pointer.y);
}

/**
 * Adds the table header for order items to the PDF document
 *
 * Creates column headers for article, quantity, price, and amount.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param columns - Column configuration for the table
 */
function addTableHeader(doc: jsPDF, options: DrawOptions, columns: PdfTableColumns): void {
  options.pointer.y += 20;
  addLine(doc, options);

  options.pointer.y += 4;
  doc.setFontSize(options.text.size.smaller);
  doc.setTextColor(options.text.color.darker);
  doc.setFont('Helvetica', 'bold');

  doc.text(columns.article.label, columns.article.x, options.pointer.y, { baseline: 'middle' });
  doc.text(columns.qty.label, columns.qty.x, options.pointer.y, { baseline: 'middle', align: 'center' });
  doc.text(columns.price.label, columns.price.x, options.pointer.y, { baseline: 'middle', align: 'right' });
  doc.text(columns.amount.label, columns.amount.x, options.pointer.y, { baseline: 'middle', align: 'right' });

  options.pointer.y += 4;
  addLine(doc, options);
}

/**
 * Adds order item details to the PDF document
 *
 * Creates rows for each item in the order with product name, quantity,
 * unit price, and total price. Handles automatic page breaks if needed.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param columns - Column configuration for the table
 * @param order - Order information containing the items
 * @param paymentTerms - Payment terms to display if a new page is created
 */
function addTableItems(
  doc: jsPDF,
  options: DrawOptions,
  columns: PdfTableColumns,
  order: OrderResponse,
  paymentTerms: PaymentTerms
): void {
  const limitForNewContent = options.border.bottom - 40;

  options.pointer.y += 4;
  doc.setFont('Helvetica', 'normal');

  order.items.forEach(item => {
    options.pointer.y += 6;

    if (options.pointer.y > limitForNewContent) {
      addPage(doc, options, paymentTerms);
    }

    doc.setTextColor(options.text.color.dark);
    doc.setFontSize(options.text.size.smaller);
    doc.text(item.productName, columns.article.x, options.pointer.y);
    doc.text(item.quantity.toString(), columns.qty.x, options.pointer.y, { align: 'center' });
    doc.text(`$${item.unitPrice.toFixed(2)}`, columns.price.x, options.pointer.y, { align: 'right' });
    doc.text(`$${item.totalPrice.toFixed(2)}`, columns.amount.x, options.pointer.y, { align: 'right' });
  });
}

/**
 * Adds table footer with order totals to the PDF document
 *
 * Displays the total amount for the entire order.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param columns - Column configuration for the table
 * @param order - Order information containing the total amount
 */
function addTableFooter(doc: jsPDF, options: DrawOptions, columns: PdfTableColumns, order: OrderResponse): void {
  options.pointer.y += 6;
  addLine(doc, options);

  options.pointer.y += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(options.text.size.smaller);
  doc.text('Total', columns.price.x, options.pointer.y, { align: 'right' });
  doc.text(`$${order.amount.toFixed(2)}`, columns.amount.x, options.pointer.y, { align: 'right' });
}

/**
 * Adds a new page to the PDF document
 *
 * Creates a new page and adds the footer with payment terms.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param paymentTerms - Payment terms to display in the footer
 */
function addPage(doc: jsPDF, options: DrawOptions, paymentTerms: PaymentTerms) {
  doc.addPage();
  options.pointer.y = options.border.top;
  addFooter(doc, options, paymentTerms);
}

/**
 * Adds footer with payment terms to the PDF document
 *
 * Displays payment terms and banking information at the bottom of the page.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 * @param paymentTerms - Payment terms and banking information to display
 */
function addFooter(doc: jsPDF, options: DrawOptions, paymentTerms: PaymentTerms): void {
  const xCenter = doc.internal.pageSize.getWidth() / 2;
  let y = options.border.bottom;

  addLine(doc, options);

  y += 6;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(options.text.size.tiny);
  doc.setTextColor(options.text.color.lighter);
  doc.setFont('Helvetica', 'normal');
  doc.text(paymentTerms.terms, xCenter, y, { align: 'center' });

  y += 3;
  const bankingText = `BANK: ${paymentTerms.bankName} - ACCOUNT NAME: ${paymentTerms.accountName} - ACCOUNT NO.: ${paymentTerms.accountNumber} - ROUTING NUMBER: ${paymentTerms.routingNumber}`;
  doc.text(bankingText, xCenter, y, { align: 'center' });
}

/**
 * Adds a horizontal line to the PDF document
 *
 * Creates a separator line across the document at the current pointer position.
 *
 * @param doc - The jsPDF document instance
 * @param options - Drawing options with positioning information
 */
function addLine(doc: jsPDF, options: DrawOptions): void {
  doc.setDrawColor(options.line.color.light);
  doc.line(options.border.left, options.pointer.y, options.border.right, options.pointer.y);
}
