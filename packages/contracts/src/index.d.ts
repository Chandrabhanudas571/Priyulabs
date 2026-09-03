export interface LeadDto {
    id?: string;
    name: string;
    storeName: string;
    mobile: string;
    sector?: string;
    source?: string;
    createdAt?: string;
}
export interface CartItemDto {
    id: string;
    name: string;
    price: number;
    quantity: number;
    taxPercent: number;
}
export interface CalculateBillRequest {
    items: CartItemDto[];
    discountPercent?: number;
}
export interface CalculateBillResponse {
    subtotal: number;
    discountAmount: number;
    taxAmount: number;
    total: number;
    itemCount: number;
}
export interface PushEdcRequest {
    amount: number;
    orderReference: string;
    provider: "PINELABS" | "PAYTM" | "UPI";
}
export interface PushEdcResponse {
    success: boolean;
    transactionId: string;
    orderReference: string;
    amount: number;
    status: "APPROVED" | "PENDING" | "DECLINED";
    message: string;
}
export interface InvoiceScanItemDto {
    itemCode: string;
    name: string;
    batchNumber: string;
    mrp: number;
    purchaseRate: number;
    quantity: number;
    expiryDate: string;
}
export interface InvoiceScanResponse {
    invoiceNumber: string;
    vendorName: string;
    scannedAt: string;
    confidenceScore: number;
    itemsDetected: InvoiceScanItemDto[];
    totalValue: number;
}
export interface ExpiryAlertItemDto {
    id: string;
    productName: string;
    category: string;
    batchNumber: string;
    quantityInStock: number;
    daysRemaining: number;
    status: "CRITICAL" | "WARNING" | "SAFE";
}
export interface SectorDetailDto {
    key: string;
    emoji: string;
    badge: string;
    title: string;
    eyebrow: string;
    headline: string;
    heroDesc: string;
    image?: string;
    videoUrl?: string;
    before: string[];
    after: string[];
    techUpgrades: string[];
    roi: string;
}
