class Invoice {
    constructor(invoiceDate = new Date(), invoiceNumber = 0, lineItems = []) {
        this.invoiceDate = invoiceDate;
        this.invoiceNumber = invoiceNumber;
        this.lineItems = lineItems;
    }

    // Adds a new entry to the list of line items
    addInvoiceLine(line) {
        this.lineItems.push(line);
    };

    // Removes an existing entry from the list of line items
    removeInvoiceLine(id) {
        const entry = this.lineItems.find(item => item.invoiceLineId === id);
        const index = this.lineItems.indexOf(entry);
        this.lineItems.splice(index, 1);
    };

    // Returns the sum of (cost * quantity) for each line item
    getTotal() {
        const total = this.lineItems.reduce((result, item) => result += item.cost * item.quantity, 0);
        return total.toFixed(2);
    };

    // Appends the items from the sourceInvoice to the current invoice
    mergeInvoices(sourceInvoice) {
        this.lineItems = this.lineItems.concat(sourceInvoice.lineItems);
    }

    // Creates a deep clone of the current invoice (all fields and properties)
    clone() {
        return JSON.parse(JSON.stringify(this));
    };
    
    // Outputs string containing the following (replace [] with actual values):
    // Invoice Number: [InvoiceNumber], InvoiceDate: [dd/MM/yyyy], LineItemCount: [Number of items in LineItems]
    toString() {
        return `Invoice Number: ${this.invoiceNumber}, InvoiceDate: ${this.invoiceDate.toLocaleDateString()}, LineItemCount: ${this.lineItems.length}`;
    };
}

module.exports = Invoice;
