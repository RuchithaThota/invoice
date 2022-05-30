import React from "react";
import useBillingAddressStore from "../Store/BillingAddressStore";
import useBillingStore from "../Store/BillingStore";
import "./BillingDetails.css";
import Invoice from "../Invoice/Invoice";
import {
  BrowserRouter as Router,
  Link,
  Navigate,
  Outlet,
  Route,
  useNavigate,
} from "react-router-dom";
const BillingDetails = () => {
  const { billingEntries, setBillingEntries, removeEntry } = useBillingStore();

  const { billingAddress, setBillingAddress } = useBillingAddressStore();

  let navigate = useNavigate();
  const handleSubmit = () => {
    if (billingEntries.length < 1) {
      alert("No Billing Details To Submit...Please Add and Try Again");
      return;
    } else {
      navigate("/invoice");
    }
    // setBillingEntries([]);
    // setBillingAddress({});
  };
  const totalAmount = React.useMemo(() => {
    let sum = 0;
    billingEntries.forEach((entriesList) => {
      sum += parseFloat(entriesList.kg) * parseFloat(entriesList.rateKg);
    });
    return sum;
  }, [billingEntries]);

  return (
    <div className="products">
      <p
        style={{
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
          margin: "20px auto 15px",
        }}
      >
        Billing Details
      </p>
      <table className="table-heading">
        <tr>
          <th>Sno</th>
          <th>materialName</th>
          <th>materialDescription</th>
          <th>hsnNo</th>
          <th>qtyNo</th>
          <th>kg</th>
          <th>rateKg</th>
          <th>amount</th>
          <th>delete</th>
        </tr>
        {billingEntries.map((billingEntry, index) => {
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{billingEntry.materialName}</td>
              <td>{billingEntry.materialDescription}</td>
              <td>{billingEntry.hsnNo}</td>
              <td>{billingEntry.qtyNo}</td>
              <td>{billingEntry.kg}</td>
              <td>{billingEntry.rateKg}</td>
              <td>
                {parseFloat(billingEntry.kg) * parseFloat(billingEntry.rateKg)}
              </td>
              <td>
                <i
                  className="fas fa-trash"
                  style={{ cursor: "pointer" }}
                  onClick={() => removeEntry(billingEntry.materialName)}
                ></i>
              </td>
            </tr>
          );
        })}
      </table>
      <p
        style={{
          textAlign: "left",
          color: "black",
          fontWeight: "bold",
          marginTop: "20px",
        }}
      >
        Total:{totalAmount}/-
      </p>
      <button
        type="submit"
        className="submit-btn"
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        Submit
        {/* <Link to="invoice">Submit</Link> */}
      </button>
    </div>
  );
};
export default BillingDetails;
