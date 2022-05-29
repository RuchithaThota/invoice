import React, { useState, useEffect } from "react";
import { axios } from "axios";
import "./Invoice.css";
import useBillingAddressStore from "../Store/BillingAddressStore";
import useBillingStore from "../Store/BillingStore";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
const Invoice = () => {
  /*zustand variables*/
  const { billingEntries, setBillingEntries, addEntry } = useBillingStore();
  const { billingAddress, setBillingAddress } = useBillingAddressStore();
  /*zustand variables*/

  const totalAmount = React.useMemo(() => {
    let sum = 0;
    billingEntries.forEach((entriesList) => {
      sum += parseInt(entriesList.amount);
    });
    return sum;
  }, [billingEntries]);
  console.log(totalAmount);
  // console.log((9 / 100) * parseInt({ totalAmount }));
  const gstCut = React.useMemo(() => {
    let sum = 0;
    billingEntries.forEach((entriesList) => {
      sum += parseInt(entriesList.amount);
    });
    return (9 / 100) * sum;
  }, [billingEntries]);
  console.log(gstCut);

  return (
    <>
      <div className="invoice-box">
        <div className="invoice-heading">
          <h1>TAX INVOICE</h1>
          <span
            style={{
              position: "absolute",
              top: "1em",
              right: "5em",
              fontWeight: "bold",
            }}
          >
            Phone : 9849081896
          </span>
          <h1> DATTA SAI STEEL CORPORATION</h1>
          <p>
            D.No. 5-35/A/8, G-A 11, Chaitanya Towers,Prashanti Nagar Main Road
          </p>
          <p>Kukatpally Industrial Estate Road, Kukatpally Hyderabad 500 072</p>
        </div>
        <div className="address-invoice">
          <div className="address">
            To
            <br />
            {billingAddress.address.split(",")[0]}
            <br />
            {billingAddress.address.split(",")[1]}
            <br />
            {billingAddress.address.split(",")[2]}
          </div>
          <div className="invoice">
            <div>
              <label for="invoiceNo">InvoiceNo</label>
              <span style={{ margin: "5px 20px" }}>:</span>
              <span>{billingAddress.invoiceNo}</span>
            </div>
            <div>
              <label for="date">Date</label>
              <span style={{ margin: "5px 20px 5px 55px" }}>:</span>
              <span>{billingAddress.date}</span>
            </div>
            <div>
              <label for="orderNo">OrderNo</label>
              <span style={{ margin: "5px 20px 5px 29px" }}>:</span>
              <span>{billingAddress.orderNo}</span>
            </div>
            <div>
              <label for="GstnNo">GSTNNo</label>
              <span style={{ margin: "5px 20px 5px 31px" }}>:</span>
              <span>{billingAddress.gstnNo}</span>
            </div>
          </div>
        </div>
        {/* -------------table-------------- */}
        <table>
          <tr>
            <th>sNo.</th>
            <th>Material Name</th>
            <th>MATERIAL DESCRIPTION</th>
            <th>HSN NO</th>
            <th>QTY/NO</th>
            <th>KG</th>
            <th>RATE/KG</th>
            <th>AMOUNT</th>
          </tr>
          <tbody>
            {billingEntries.map((row, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{row.materialName}</td>
                <td>{row.materialDescription}</td>
                <td>{row.hsnNo}</td>
                <td>{row.qtyNo}</td>
                <td>{row.kg}</td>
                <td>{row.rateKg}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
          <tr>
            <td></td>
            <td colSpan={4}></td>
            <th>Total:</th>
            <td></td>
            <td colSpan={2}>{totalAmount}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={4}></td>
            <th>CGST : 9%</th>
            <td></td>
            <td colSpan={2}>{gstCut}</td>
          </tr>
          <tr>
            <td></td>
            <td colSpan={4}></td>

            <th>SGST : 9%</th>
            <td></td>
            <td colSpan={2}>{gstCut}</td>
          </tr>
          {/* <tr>
            <td colSpan={5}></td>

            <th>ROUND OFF</th>
            <td colSpan={2}>0.24</td>
          </tr> */}
          {/* <tr>
            <td></td>
            <th colSpan={4} style={{ textAlign: "center" }}>
              in to rupees.....
            </th>
            <td></td>
            <td></td>
          </tr> */}
          <tr>
            <td> </td>
            <td colSpan={4}></td>

            <th>Grand Total:</th>
            <td></td>
            <td>{totalAmount + gstCut + gstCut}</td>
          </tr>
        </table>
        <div className="signature">
          <div>
            <p>Receiver's Signature & Stamp</p>
          </div>
          <div>
            <p>For DATTA SAI STEEL CORPORATION</p>
          </div>
        </div>
        <div className="signature2">
          <p>signature</p>
        </div>

        {/* ----------bottom-line------------- */}
        <div className="bottom-line">
          <p>
            NOTE : 01. Goods once sold cannot be accepted without prior
            approval. Our responsibility ceases when goods Leave our godown.
          </p>
          <p>
            02. No claim will be accepted if not lodged in writting within 3
            days from the receipt of this Challan
          </p>
          <p>03. We cannot accept the Material after Machining</p>
          <p>
            04. Payment made after due date the rate of interest will be charged
            24 % per annum
          </p>
        </div>
      </div>
    </>
  );
};
export default Invoice;
