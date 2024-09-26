import React from 'react';

const ShippingPolicy = () => {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-3xl font-semibold mb-4">Shipping Policy</h1>

            <p className="mb-4">
                Thank you for shopping with contact@dripsaint.com. This Shipping Policy outlines the terms and conditions related to the shipment and delivery of your orders. By placing an order with us, you agree to the terms of this Shipping Policy.
            </p>

            <h2 className="text-xl font-semibold mb-2">1. Shipping Methods and Costs</h2>
            <p className="mb-4">
                We offer various shipping options to accommodate your needs. Shipping costs are calculated based on the weight of your order, the shipping method chosen, and the delivery destination. Shipping options include:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Standard Shipping: Estimated delivery within 5 to 7 business days.</li>
                <li>International Shipping: Estimated delivery within 10 to 15 business days, depending on the destination country.</li>
            </ul>
            <p className="mb-4">
                Shipping costs will be displayed at checkout and are non-refundable once your order has been shipped.
            </p>

            <h2 className="text-xl font-semibold mb-2">2. Order Processing Time</h2>
            <p className="mb-4">
                All orders are processed within 2 to 3 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
            </p>

            <h2 className="text-xl font-semibold mb-2">3. Shipping Confirmation and Tracking</h2>
            <p className="mb-4">
                Once your order has been shipped, you will receive a shipping confirmation email with a tracking number. You can use this tracking number to check the status of your shipment. Please note that tracking information may not be immediately available and may take up to 3 business days to update.
            </p>

            <h2 className="text-xl font-semibold mb-2">4. Shipping Restrictions</h2>
            <p className="mb-4">
                We currently ship to [list of countries or "worldwide"]. However, some products may be subject to additional shipping restrictions due to customs regulations in certain countries. Please be aware of the customs policies in your country before placing an order.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Delivery Timeframes</h2>
            <p className="mb-4">
                Estimated delivery timeframes are provided for each shipping option at checkout. While we strive to ensure timely delivery, please note that these are estimates and actual delivery times may vary due to factors beyond our control, such as customs delays, weather conditions, and carrier-related issues.
            </p>

            <h2 className="text-xl font-semibold mb-2">6. International Shipping</h2>
            <p className="mb-4">
                For international orders, the recipient is responsible for any customs duties, taxes, or fees that may apply. Customs policies vary widely by country, so please contact your local customs office for more information. DripSaint is not responsible for delays caused by customs.
            </p>

            <h2 className="text-xl font-semibold mb-2">7. Address Accuracy</h2>
            <p className="mb-4">
                Please ensure that the shipping address provided during checkout is accurate and complete. We are not responsible for orders shipped to incorrect or incomplete addresses provided by the customer. If an order is returned to us due to an incorrect address, you may be responsible for additional shipping costs to resend the order.
            </p>

            <h2 className="text-xl font-semibold mb-2">8. Lost or Damaged Shipments</h2>
            <p className="mb-4">
                If your shipment is lost or arrives damaged, please contact us within [X] days of the delivery date. We will work with the shipping carrier to resolve the issue and, if necessary, send a replacement or refund.
            </p>

            <h2 className="text-xl font-semibold mb-2">9. Undeliverable Packages</h2>
            <p className="mb-4">
                If a package is returned to us as undeliverable due to an incorrect address, refusal of delivery, or failure to pick up the package, we will notify you by email. You may be responsible for additional shipping charges if you request the package to be reshipped.
            </p>

            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p className="mb-4">
                If you have any questions or concerns about your shipment, please contact us at:
            </p>
            <ul className="list-disc ml-6 mb-4">
                <li>Email: contact@dripsaint.com</li>
                <li>Address: 113 Ghaznavi Block Bahria Town, Lahore</li>
            </ul>

            <p className="mb-4">
                By placing an order with DripSaint, you agree to the terms outlined in this Shipping Policy.
            </p>
        </div>
    );
};

export default ShippingPolicy;
