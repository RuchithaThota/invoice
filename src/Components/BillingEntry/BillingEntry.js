import React, { useEffect, useState } from "react";
import "./BillingEntry.css";
import useBillingStore from "../Store/BillingStore";
import useBillingAddressStore from "../Store/BillingAddressStore";
import BillingDetails from "../BillingDetails/BillingDetails";
import Navbar from "../Navbar/Navbar";

const BillingEntry = (props) => {
  /*zustand variables*/
  const { billingEntries, setBillingEntries, addEntry } = useBillingStore();
  const { billingAddress, setBillingAddress } = useBillingAddressStore();
  /*zustand variables*/

  //useStates

  //errors
  const [errors, setErrors] = useState({
    dateTime: "",
    invoiceNo: "",
    address: "",
    materialName: "",
    materialDescription: "",
    kg: "",
    rateKg: "",
  });
  //billingEntry
  const [billingEntry, setBillingEntry] = useState({
    dateTime: (() => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0");
      var yyyy = today.getFullYear();
      return dd + "/" + mm + "/" + yyyy;
    })(),
    invoiceNo: "",
    orderNo: "",
    // gstnNo: "36AACFD5005A1Z9",
    address: "",
    materialName: "",
    icon: "",
    materialDescription: "",
    qtyNo: "",
    kg: "",
    rateKg: "",
    amount: "",
  });

  //useEffect
  useEffect(() => {
    // console.log(errors);
    if (Object.keys(errors).length === 0) {
      const result = props.materials.find((obj) => {
        return obj.material === billingEntry.materialName;
      });
      console.log(result);
      // setBillingEntry({ hsnNo: result.hsnNo });
      addEntry({
        materialName: billingEntry.materialName,
        materialDescription: `${billingEntry.icon}${billingEntry.materialDescription}`,
        hsnNo: result.hsnNo,
        qtyNo: billingEntry.qtyNo,
        kg: billingEntry.kg,
        rateKg: billingEntry.rateKg,
      });
      setBillingAddress({
        date: billingEntry.dateTime,
        invoiceNo: billingEntry.invoiceNo,
        orderNo: billingEntry.orderNo,
        address: billingEntry.address,
      });
      // console.log(billingEntries)
      setBillingEntry({
        ...billingEntry,
        dateTime: (() => {
          const d = new Date();
          d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
          return d.toISOString().slice(0, -8);
        })(),
        materialName: "",
        icon: "",
        materialDescription: "",
        hsnNo: "",
        qtyNo: "",
        kg: "",
        rateKg: "",
        amount: "",
      });
    }
  }, [errors]);

  //handleChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingEntry({ ...billingEntry, [name]: value });
  };

  //handleValidation
  const handleValidation = (billingEntry) => {
    const errors = {};

    if (!billingEntry.dateTime) {
      errors.dateTime = "dateTime";
    }

    if (!billingEntry.invoiceNo) {
      errors.invoiceNo = "invoiceNo";
    }
    // if (!billingEntry.dateTime) {
    //   errors.dateTime = "date";
    // }
    if (!billingEntry.address || !billingEntry.address === null) {
      errors.address = "address";
    }
    if (!billingEntry.materialName || !billingEntry.materialName === null) {
      errors.materialName = "materialName";
    }
    if (!billingEntry.materialDescription) {
      errors.materialDescription = "material description";
    }

    if (!billingEntry.kg) {
      errors.kg = "kg";
    }
    if (!billingEntry.rateKg) {
      errors.rateKg = "rateKg";
    }

    if (Object.keys(errors).length > 0) {
      alert(`${Object.values(errors)} is required`);
    }
    return errors;
  };
  //handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(handleValidation(billingEntry));
  };

  return (
    <>
      <Navbar />
      <div>
        <p
          style={{
            color: "black",
            textAlign: "center",
            fontWeight: "bold",
            margin: "20px auto 15px",
            fontSize: "15px",
          }}
        >
          Enter Billing Details
        </p>
        <form className="productentry">
          <input
            type="date"
            name="dateTime"
            value={billingEntry.dateTime}
            onChange={handleChange}
            // max={(() => {
            //   const d = new Date();
            //   d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            //   return d.toISOString().slice(0, -8);
            // })()}
          />
          <input
            value={billingEntry.invoiceNo}
            type="text"
            placeholder="Invoice No"
            name="invoiceNo"
            onChange={handleChange}
          />
          <input
            value={billingEntry.orderNo}
            type="text"
            placeholder="orderNo"
            name="orderNo"
            onChange={handleChange}
          />

          <select
            value={billingEntry.address}
            name="address"
            onChange={handleChange}
            required
          >
            <option>Select Address</option>
            {props.addresses.map((address) => (
              <option value={address}>{address}</option>
            ))}
          </select>
          <select
            value={billingEntry.materialName}
            name="materialName"
            onChange={handleChange}
            required
          >
            <option>Select</option>
            {props.materials.map((obj) => (
              <option value={obj.material}>{obj.material}</option>
            ))}
          </select>
          <select
            value={billingEntry.icon}
            name="icon"
            onChange={handleChange}
            required
          >
            <option value="">icon</option>
            {props.materialIcons.map((icon) => (
              <option value={icon}>{icon}</option>
            ))}
          </select>
          <input
            value={billingEntry.materialDescription}
            type="text"
            placeholder="materialDescription"
            name="materialDescription"
            onChange={handleChange}
          />
          <input
            value={billingEntry.qtyNo}
            type="number"
            placeholder="qtyNo"
            name="qtyNo"
            // pattern="[0-9]"
            // inputMode="numeric"
            onChange={handleChange}
          />
          <input
            value={billingEntry.kg}
            type="number"
            placeholder="quantity in kgs"
            name="kg"
            // pattern="[0-9]"
            // inputMode="numeric"
            onChange={handleChange}
          />
          <input
            value={billingEntry.rateKg}
            type="number"
            placeholder="rate per kg"
            name="rateKg"
            onChange={handleChange}
            // pattern="[0-9]"
            // inputMode="numeric"
          />
          <button className="add" onClick={handleSubmit} type="submit">
            Add
          </button>
        </form>
      </div>
      <BillingDetails />
    </>
  );
};
export default BillingEntry;
