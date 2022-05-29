import React, { useEffect, useState } from "react";
import "./BillingEntry.css";
import useBillingStore from "../Store/BillingStore";
import useBillingAddressStore from "../Store/BillingAddressStore";
import BillingDetails from "../BillingDetails/BillingDetails";
import Navbar from "../Navbar/Navbar";

const BillingEntry = () => {
  /*zustand variables*/
  const { billingEntries, setBillingEntries, addEntry } = useBillingStore();
  const { billingAddress, setBillingAddress } = useBillingAddressStore();
  /*zustand variables*/

  //useStates

  //errors
  const [errors, setErrors] = useState({
    dateTime: "",
    invoiceNo: "",
    orderNo: "",
    gstnNo: "",
    address: "",
    materialName: "",
    materialDescription: "",
    qtyNo: "",
    kg: "",
    rateKg: "",
    amount: "",
  });
  //billingEntry
  const [billingEntry, setBillingEntry] = useState({
    dateTime: (() => {
      const d = new Date();
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, -8);
    })(),
    invoiceNo: "",
    orderNo: "",
    gstnNo: "36AACFD5005A1Z9",
    address: "",
    materialName: "",
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
      const result = materials.find((obj) => {
        return obj.material === billingEntry.materialName;
      });
      console.log(result);
      // setBillingEntry({ hsnNo: result.hsnNo });
      addEntry({
        materialName: billingEntry.materialName,
        materialDescription: billingEntry.materialDescription,
        hsnNo: result.hsnNo,
        qtyNo: billingEntry.qtyNo,
        kg: billingEntry.kg,
        rateKg: billingEntry.rateKg,
        amount: billingEntry.amount,
      });
      setBillingAddress({
        date: billingEntry.dateTime,
        invoiceNo: billingEntry.invoiceNo,
        orderNo: billingEntry.orderNo,
        gstnNo: billingEntry.gstnNo,
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

  //setHsnNo
  const setHsnNo = (material) => {
    const hsnNumber = materials.find((obj) => {
      if (obj.material === material) {
        return obj.hsnNo;
      }
    });
    setBillingEntry({ ...billingEntry, hsnNo: hsnNumber });
  };

  //addresses
  const addresses = [
    "Select To Address",
    "ADITYA ENGINEERS	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	GSTIN : 36AAOFA2372F1Z1",
    "ANJANA ENGG WORKS	RC PURAM	HYDERABAD	GSTIN : 36AEWPB6015N3Z1	",
  ];
  //materials
  const materials = [
    {
      material: "EN 8",
      hsnNo: "7214",
    },
    {
      material: "EN 1ALEADED",
      hsnNo: "7228",
    },
    {
      material: "EN19",
      hsnNo: "7224",
    },
    {
      material: "MS",
      hsnNo: "7214",
    },
    {
      material: "MS BRIGHT",
      hsnNo: "7214",
    },
  ];

  //handleValidation
  const handleValidation = (billingEntry) => {
    const errors = {};

    if (!billingEntry.dateTime) {
      errors.dateTime = "dateTime";
    }

    if (!billingEntry.invoiceNo) {
      errors.invoiceNo = "invoiceNo";
    }

    if (!billingEntry.orderNo) {
      errors.orderNo = "orderNo";
    }
    if (!billingEntry.gstnNo) {
      errors.gstnNo = "gstnNo";
    }

    if (!billingEntry.address || !billingEntry.address === null) {
      errors.address = "address";
    }
    if (!billingEntry.materialName || !billingEntry.materialName === null) {
      errors.materialName = "materialName";
    }
    if (!billingEntry.materialDescription) {
      errors.materialDescription = "material description";
    }
    if (!billingEntry.qtyNo) {
      errors.qtyNo = "qtyNo";
    }
    if (!billingEntry.kg) {
      errors.kg = "kg";
    }
    if (!billingEntry.rateKg) {
      errors.rateKg = "rateKg";
    }
    if (!billingEntry.amount) {
      errors.amount = "amount";
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
            type="datetime-local"
            name="dateTime"
            value={billingEntry.dateTime}
            onChange={handleChange}
            max={(() => {
              const d = new Date();
              d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
              return d.toISOString().slice(0, -8);
            })()}
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
          <input
            value={billingEntry.gstnNo}
            type="text"
            placeholder="GstnNo"
            name="gstnNo"
            onChange={handleChange}
          />

          <select
            value={billingEntry.address}
            name="address"
            onChange={handleChange}
            required
          >
            {addresses.map((address) => (
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
            {materials.map((obj) => (
              <option value={obj.material}>{obj.material}</option>
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
            type="text"
            placeholder="qtyNo"
            name="qtyNo"
            onChange={handleChange}
          />
          <input
            value={billingEntry.kg}
            type="text"
            placeholder="kg"
            name="kg"
            onChange={handleChange}
          />
          <input
            value={billingEntry.rateKg}
            type="text"
            placeholder="rateKg"
            name="rateKg"
            onChange={handleChange}
          />
          <input
            value={billingEntry.amount}
            type="number"
            placeholder="Amount"
            name="amount"
            onChange={handleChange}
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
