import { beforeEach, describe, expect, it, vi } from 'vitest';
import { generatePdf } from './printInvoiceService';
import { jsPDF } from 'jspdf';
import { OrderResponse, OrderStatus, UserResponse } from '@demo-shop-react-ui/api';

vi.mock('jspdf', () => {
  const mockAddImage = vi.fn();
  const mockText = vi.fn();
  const mockLine = vi.fn();
  const mockSave = vi.fn();
  const mockSetFont = vi.fn();
  const mockSetFontSize = vi.fn();
  const mockSetTextColor = vi.fn();
  const mockSetDrawColor = vi.fn();
  const mockAddPage = vi.fn();

  return {
    jsPDF: vi.fn().mockImplementation(() => ({
      addImage: mockAddImage,
      text: mockText,
      line: mockLine,
      save: mockSave,
      setFont: mockSetFont,
      setFontSize: mockSetFontSize,
      setTextColor: mockSetTextColor,
      setDrawColor: mockSetDrawColor,
      addPage: mockAddPage,
      internal: {
        pageSize: {
          getWidth: () => 210,
          getHeight: () => 297,
        },
      },
    })),
  };
});

describe('generatePdf', () => {
  const mockOrder: OrderResponse = {
    id: 12345,
    userId: 12345,
    status: OrderStatus.Created,
    created: new Date(),
    items: [
      {
        productName: 'Test Product',
        quantity: 2,
        unitPrice: 10,
        totalPrice: 20,
        productId: 0,
        productThumbnail: 'productThumbnail',
      },
    ],
    amount: 20,
  };

  const mockUser: UserResponse = {
    id: 12345,
    phone: '12345678',
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    address: {
      street: '123 Main St',
      apartment: 'Apt 4',
      city: 'Testville',
      zip: '12345',
      country: 'Testland',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should generate a PDF with the correct filename', () => {
    generatePdf(mockOrder, mockUser);

    const mockJsPDFInstance = vi.mocked(jsPDF).mock.results[0].value;
    expect(mockJsPDFInstance.save).toHaveBeenCalledWith(`invoice-${mockOrder.id}.pdf`);
  });

  it('should add the logo to the PDF', () => {
    generatePdf(mockOrder, mockUser);

    const mockJsPDFInstance = vi.mocked(jsPDF).mock.results[0].value;
    expect(mockJsPDFInstance.addImage).toHaveBeenCalledWith(
      expect.stringContaining('icons/demo-shop.png'),
      'PNG',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });

  it('should add customer information to the PDF', () => {
    generatePdf(mockOrder, mockUser);

    const mockJsPDFInstance = vi.mocked(jsPDF).mock.results[0].value;
    expect(mockJsPDFInstance.text).toHaveBeenCalledWith(
      `${mockUser.firstname} ${mockUser.lastname}`,
      expect.any(Number),
      expect.any(Number)
    );
    expect(mockJsPDFInstance.text).toHaveBeenCalledWith(mockUser.email, expect.any(Number), expect.any(Number));
  });
});
