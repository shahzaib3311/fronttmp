import React from 'react';

const ReplacementPolicy = () => {
    return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <h1 className="text-3xl font-semibold mb-4">Replacement Policy</h1>

            <p className="mb-4">
                Last Updated: [5 July 2024]
            </p>

            <p className="mb-4">
                At DripSaint, we strive to ensure that you receive the correct product in the right size and with the perfect print. If you receive an incorrect item, wrong size, or incorrect print, we are happy to offer a replacement. Please review our replacement policy below.
            </p>

            <h2 className="text-xl font-semibold mb-2">Eligibility for Replacement:</h2>
            <ul className="list-disc list-inside mb-4">
                <li>You are eligible for a replacement if:</li>
                <ul className="list-disc list-inside mb-2">
                    <li>You received the wrong product.</li>
                    <li>You received the wrong size.</li>
                    <li>You received a product with an incorrect print.</li>
                </ul>
                <li>You are not eligible for a replacement if:</li>
                <ul className="list-disc list-inside mb-2">
                    <li>The product is the correct item, size, and print as per your order.</li>
                    <li>The product has been used, washed, or altered.</li>
                    <li>The request is made after 4 days from the date of delivery.</li>
                </ul>
            </ul>

            <h2 className="text-xl font-semibold mb-2">How to Request a Replacement:</h2>
            <ol className="list-decimal list-inside mb-4">
                <li>Contact Us: Email us at contact@dripsaint.com within 4 days of receiving your order. Include your order number, a description of the issue, and photos of the product received.</li>
                <li>Wait for Approval: Our customer service team will review your request and respond within 2-3 business days.</li>
                <li>Return the Item: If your replacement request is approved, we will provide you with instructions on how to return the incorrect item. Please ensure the item is unused, unwashed, and in its original condition.</li>
                <li>Receive Your Replacement: Once we receive the returned item, we will process and ship your replacement at no additional cost to you.</li>
            </ol>

            <h2 className="text-xl font-semibold mb-2">Exceptions:</h2>
            <p className="mb-4">
                Custom Orders: Custom orders and personalized items are not eligible for replacement unless there is a defect in the product.
            </p>

            <h2 className="text-xl font-semibold mb-2">Contact Us:</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Email: contact@dripsaint@gmail.com</li>
                <li>Phone: 0348-6389113</li>
            </ul>

            <p className="mb-4">
                By placing an order with us, you agree to our Replacement Policy.
            </p>
        </div>
    );
};

export default ReplacementPolicy;
