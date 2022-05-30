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
      sum += parseFloat(entriesList.kg) * parseFloat(entriesList.rateKg);
    });
    return sum;
  }, [billingEntries]);
  console.log(totalAmount);
  // console.log((9 / 100) * parseInt({ totalAmount }));
  const gstCut = React.useMemo(() => {
    let sum = 0;
    billingEntries.forEach((entriesList) => {
      sum += parseFloat(entriesList.kg) * parseFloat(entriesList.rateKg);
    });
    return (9 / 100) * sum;
  }, [billingEntries]);
  console.log(gstCut);

  const wordify = (num) => {
    const single = [
      "Zero",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const double = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const formatTenth = (digit, prev) => {
      return 0 == digit ? "" : " " + (1 == digit ? double[prev] : tens[digit]);
    };
    const formatOther = (digit, next, denom) => {
      return (
        (0 != digit && 1 != next ? " " + single[digit] : "") +
        (0 != next || digit > 0 ? " " + denom : "")
      );
    };
    let res = "";
    let index = 0;
    let digit = 0;
    let next = 0;
    let words = [];
    if (((num += ""), isNaN(parseInt(num)))) {
      res = "";
    } else if (parseInt(num) > 0 && num.length <= 10) {
      for (index = num.length - 1; index >= 0; index--)
        switch (
          ((digit = num[index] - 0),
          (next = index > 0 ? num[index - 1] - 0 : 0),
          num.length - index - 1)
        ) {
          case 0:
            words.push(formatOther(digit, next, ""));
            break;
          case 1:
            words.push(formatTenth(digit, num[index + 1]));
            break;
          case 2:
            words.push(
              0 != digit
                ? " " +
                    single[digit] +
                    " Hundred" +
                    (0 != num[index + 1] && 0 != num[index + 2] ? " and" : "")
                : ""
            );
            break;
          case 3:
            words.push(formatOther(digit, next, "Thousand"));
            break;
          case 4:
            words.push(formatTenth(digit, num[index + 1]));
            break;
          case 5:
            words.push(formatOther(digit, next, "Lakh"));
            break;
          case 6:
            words.push(formatTenth(digit, num[index + 1]));
            break;
          case 7:
            words.push(formatOther(digit, next, "Crore"));
            break;
          case 8:
            words.push(formatTenth(digit, num[index + 1]));
            break;
          case 9:
            words.push(
              0 != digit
                ? " " +
                    single[digit] +
                    " Hundred" +
                    (0 != num[index + 1] || 0 != num[index + 2]
                      ? " and"
                      : " Crore")
                : ""
            );
        }
      res = words.reverse().join("");
    } else res = "";
    return res;
  };
  // console.log(wordify(num));
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
              {/* <span style={{ margin: "5px 20px" }}>:</span> */}
              <span
                style={{
                  marginLeft: "4em",
                }}
              >
                : {billingAddress.invoiceNo}
              </span>
            </div>
            <div>
              <label for="date">Date</label>
              {/* <span style={{ margin: "5px 20px 5px 55px" }}>:</span> */}
              <span
                style={{
                  marginLeft: "6em",
                }}
              >
                : {billingAddress.date}
              </span>
            </div>
            <div>
              <label for="orderNo">OrderNo</label>
              {/* <span style={{ margin: "5px 20px 5px 29px" }}>:</span> */}
              <span
                style={{
                  marginLeft: "4em",
                }}
              >
                : {billingAddress.orderNo}
              </span>
            </div>
            <div>
              <label for="GstnNo">GSTNNo</label>
              {/* <span style={{ margin: "5px 20px 5px 31px" }}>:</span> */}
              <span
                style={{
                  marginLeft: "4em",
                }}
              >
                :36AACFD5005A1Z9
              </span>
            </div>
          </div>
        </div>
        {/* -------------table-------------- */}
        <table>
          <tr>
            <th>sNo.</th>
            <th>Material</th>
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
          <tr>
            <td></td>
            <th colSpan={4} style={{ textAlign: "center" }}>
              {wordify(Math.round(totalAmount + gstCut + gstCut))}
            </th>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td> </td>
            <td colSpan={4}></td>

            <th>Grand Total:</th>
            <td></td>
            <td colSpan={2}>Rs.{Math.round(totalAmount + gstCut + gstCut)}</td>
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
