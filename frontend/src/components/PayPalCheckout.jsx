import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./PayPalCheckout.css"; // 🔁 Create this CSS file

const PayPalCheckout = ({ amount = "1.00" }) => {
  const CLIENT_ID = "AfGtiZ-I6PdKA0pAg_7wHtQXqKehgJzFP0lhpl7oltpR4Jye461ZY9wd9hBLUqgVoQZxas4o81QsX8cE"; // sandbox

  const safeAmount = parseFloat(amount) > 0 ? amount.toString() : "10.00";

  return (
    <PayPalScriptProvider options={{ "client-id": CLIENT_ID, currency: "USD" }}>
      <div className="checkout-container">
        <h2 className="heading">🚀 Unlock Premium Access</h2>

        <div className="benefits-card">
          <h3>Why Go Premium?</h3>
          <ul>
            <li>✅ Unlimited access to expert-written articles</li>
            <li>✅ Ad-free reading experience</li>
            <li>✅ Early access to new content</li>
            <li>✅ Download articles as PDFs</li>
            <li>✅ Support our community of writers</li>
          </ul>
        </div>

        <div className="paypal-box">
          <h4>💳 Complete Your Purchase</h4>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: safeAmount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                alert(`✅ Payment completed by ${details.payer.name.given_name}`);
                console.log(details);
              });
            }}
            onError={(err) => {
              console.error("❌ PayPal error:", err);
              alert("Something went wrong with the payment.");
            }}
          />
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PayPalCheckout;
