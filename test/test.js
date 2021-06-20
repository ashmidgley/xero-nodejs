const assert = require('assert');
const Invoice = require('../invoice.js');
const InvoiceLine = require('../invoiceLine.js');

describe("invoice", () => {
    describe("addInvoiceLine", () => {
        it("should add a new entry to the list of line items", () => {
            const invoice = new Invoice();
            const invoiceLine = new InvoiceLine(1, 6.99, 1, "Apple");

            invoice.addInvoiceLine(invoiceLine);

            assert.strictEqual(invoiceLine, invoice.lineItems[0]);
            assert.strictEqual(1, invoice.lineItems.length);
        });
    });

    describe("removeInvoiceLine", () => {
        it("should remove an existing entry from the list of line items", () => {
            const invoice = new Invoice();

            const invoiceNumber = 1;
            invoice.addInvoiceLine(new InvoiceLine(invoiceNumber, 10.21, 1, "Orange"));
            invoice.addInvoiceLine(new InvoiceLine(2, 10.99, 5, "Banana"));
        
            invoice.removeInvoiceLine(invoiceNumber);
           
            assert.strictEqual(undefined, invoice.lineItems.find(item => item.invoiceNumber === invoiceNumber));
            assert.strictEqual(1, invoice.lineItems.length);
        });
    });

    describe("getTotal", () => {
        it("should return the sum of (cost * quantity) for each line item", () => {
            const invoice = new Invoice();
            invoice.addInvoiceLine(new InvoiceLine(1, 10.21, 4, "Banana"));
            invoice.addInvoiceLine(new InvoiceLine(2, 5.21, 1, "Orange" ));
            invoice.addInvoiceLine(new InvoiceLine(3, 6.21, 5, "Pineapple"));
            
            assert.strictEqual('77.10', invoice.getTotal());
        });
    });

    describe("mergeInvoices", () => {
        it("should append the items from the sourceInvoice to the current invoice", () => {
            const invoice1 = new Invoice();
            invoice1.addInvoiceLine(new InvoiceLine(1, 10.21, 1, "Blueberries"));

            const invoice2 = new Invoice();
            invoice2.addInvoiceLine(new InvoiceLine(2, 5.29, 4, "Orange"));
            invoice2.addInvoiceLine(new InvoiceLine(3, 9.99, 1, "Banana"));

            invoice1.mergeInvoices(invoice2);
            
            assert.strictEqual(3, invoice1.lineItems.length);
            assert(invoice1.lineItems.find(item => item.invoiceLineId === 2) !== undefined);
            assert(invoice1.lineItems.find(item => item.invoiceLineId === 3) !== undefined);
        });
    });

    describe("clone", () => {
        it("should create a deep clone of the current invoice (all fields and properties)", () => {
            const invoice = new Invoice();
            const invoiceLineId = 1;
            invoice.addInvoiceLine(new InvoiceLine(invoiceLineId, 0.99, 5, "Onion"));
            invoice.addInvoiceLine(new InvoiceLine(2, 10.49, 2, "Watermelon"));

            const clonedInvoice = invoice.clone();
            invoice.removeInvoiceLine(invoiceLineId);
            
            assert(clonedInvoice.lineItems.find(item => item.invoiceLineId === invoiceLineId) !== undefined);
            assert.strictEqual(2, clonedInvoice.lineItems.length);
        });
    });

    describe("toString", () => {
        it("should output the invoice in the custom string format", () => {
            const date = new Date();
            const invoice = new Invoice(
                date,
                "1000",
                [
                    new InvoiceLine(1, 1.99, 20, "Peer")
                ]
            );

            const expected = `Invoice Number: 1000, InvoiceDate: ${date.toLocaleDateString()}, LineItemCount: 1`;
            assert.strictEqual(expected, invoice.toString());
        });
    });
});