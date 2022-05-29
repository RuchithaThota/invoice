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
    icon: "",
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
      const result = materials.find((obj) => {
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
    "ADITYA ENGINEERS	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD,	GSTIN : 36AAOFA2372F1Z1",
    "ANJANA ENGG WORKS	RC PURAM	HYDERABAD,GSTIN : 36AEWPB6015N3Z1	",
    "ASHOKA ROAD EQUIPMENT AND MFC. PVT. LTD.		HYDERABAD.	,GSTIN : 36AANCA0669D1ZP	",
    "B. S. TECHNOLOGIES	PRASHANTHNAGAR,KUKATPALLY	HYDERABAD.	,GSTIN : 36BQZPB6230M1ZB",
    "BEMC INDUSTRIES PVT LTD	PRASHANTHNAGAR, KUKATPALLY	HYDERABAD.	,GSTIN : 	",
    "DECCAN ISPAT UDYOG	FATHENAGAR	HYDERABAD	,GSTIN : 36AAYPA92501ZI",
    "DELTA SERVICE ENGINEERS	PRASHANTH NAGAR	HYDERABAD.	,GSTIN : 36ADTPA7882N1ZO	",
    "FLUID POWER ENGINEERING	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AAFPT3280Q1ZZ",
    "FLUID POWER SYSTEMS	PRASHANTHNAGAR,KUKATPALLY	HYDERABAD.	,GSTIN : 36AJSPK6669E2ZL",
    "GANESH LAB EQUIPMENTS	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD	,GSTIN : 36ALOPG1331R1ZQ",
    "GERMANE TOOLS & TECHNOLOGIES	RAJIV GANDHI NAGAR, KUKATPALLY	HYDERABAD	,GSTIN : 36ALGPK2989P1Z8:",
    "GSM TECHNOLOGIES	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD	,GSTIN :",
    "HYDROPNEU HYDROLIS INDIA PVT LTD.	SRIPURAM COLONY, CHENGICHERLA	HYDERABAD.	,GSTIN : 36AADCH2275G1ZO	",
    "JAHANAVI CNC TECHNICS	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AJPPD3362E1ZC	",
    "KEERTHI AGRO INDUSTRIES	PRASHANTHNAGAR,KUKATPALLY	HYDERABAD.	,GSTIN : 36ZMPN4376R1ZA",
    "KHAITHAN STEEL TRADERS	PLOT NO. 5&6, SATELITE INDUSTRIAL ESTATE	BALANAGAR,HYDERABAD.	,GSTIN : 36AGJPK6259J1ZX	",
    "KLICHAKRA MACHINARY PVT LTD	CHERIYALA	MEDAK DST	,GSTIN : 36AAGCK8155M1ZY	",
    "KRISHNA BHANU INDUSTRIES	BALNAGAR	HYDERABAD	,GSTIN : 36AMGPG6907N1ZO",
    "LAKSHMI VENKATESHWARA INDUSTRIES	PRASANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36CIGPAO0361Q1Z	",
    "M M ENGINEERING WORKS	SHOBANA COLONY	HYDERABAD.	,GSTIN : 36ADCPV3976M1Z2	",
    "M R LABMART	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD.	,GSTIN : 36AZVPK1870C1Z6",
    "MANIKANTA ENGINEERING WORKS	PANCHASHEELA COLONY, GANDHINAGART	RANGA REDDY, 500037	,GSTIN : 36ACVPV6345A1Z6	",
    "MGS MACHINE TOOLS	BALANAGAR,HYDERABAD	KUKATPALLY,HYDERABAD	,GSTIN : 36ABHFM9856C1ZY",
    "MICPRO	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD	,GSTIN : 36AADCM9453H1Z9",
    "NARMADA CHEMICALS INDISTRS	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AFHPT3764N1ZO",
    "NRC AEROSPACE INDIA PVT LTD	PRASANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AAFCN1035N2ZC",
    "PAVAN ELECTRICALS	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AGYPD0247N1ZX",
    "PAVANI ENGINEERING WORKS	PRASHANTH NAGAR., KUKATPALLY	HYDERABAD.	,GSTIN : 36APPPM6632L1ZP",
    "PHYSEMECH INSTRUMENTS	B-12, BHEL  ANCILARY	ASHOK NAGAR	,GSTIN : 36AACCP1040J1ZP",
    "POOJA ENGINEERING INDUSTRIES	SHAKTHIPURAM, PRASHANT NAGAR	HYDERABAD.	,GSTIN : 36AAIFP3520A1ZR",
    "PRASAD ENGINEERING WORKS	THE CO-OPP INDUSTRIAL ESTATE	BALANAGAR,HYDERABAD.	,GSTIN : 36ALAPS3899J1ZF",
    "RAJESH ENGG WORKS			,GSTIN : 36AAFPY8863Q1ZF",
    "RAKESH MACHINE TOOLS	PLOT NO.6A/8,PHASE-1,IDA	PATANCHERU,SANGAREDDY,TELANGANA	,GSTIN : ",
    "RELIANCE ENGINEERING	KPHB AKRUTHI ENCLAVE	HYDERABAD.	,GSTIN : 36AGVPD7136M1ZS",
    "S&U MEK ENGINEERS PVT. LTD.	27,IDA,BALANAGAR	HYDERABAD-500037	,GSTIN : 36AAGSC8513B1ZJ",
    "SHIV STEEL TRADERS	FATENAGAR MAIN ROAD	HYDERABAD 500018	,GSTIN : 36ABVPD6675J1ZY",
    "SKYLINE CRANES AND HOISTS	MADHURANAGAER, SR NAGAR	HYDERABAD.	,GSTIN : 36AHQPK4249J1ZU",
    "SMRJ INDUSTRIES PVT LTD	PRASHANTHI NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36AAGC50888P1ZK	",
    "SRAVANA HYDRAULICS	PANCHASHEELA COLONY, BALANAGAR	HYDERABAD.	,GSTIN : 36AGVPD7136M1ZS",
    "SRI SAI MANOHAR ENGG WORKS	PRASHANTHNAGAR,KUKATPALLY	HYDERABAD.	,GSTIN : 36AGUPA4255H1Z9",
    "SRI SAI TEJA ENGINEERING WORKS	RAMACHANDRAPURAM	HYDERABAD.	,GSTIN : 36ABBFS4039B1ZJ",
    "SRI SAI TOOLS	SHAKTHIPURAM,PRASHANTH NAGAR	KUKATPALLY,HYDERABAD	,GSTIN : 36DBKPK5990R1ZJ",
    "SRI VINAY EXPORTS	KURNOOL RD, BUDAVADA	PRAKASAM DT.	,GSTIN : 37ACYFS8342R1ZP",
    "SRI VINAY PRECISION TECHNICS	PRASHANTH NAGAR	HYDERABAD.	,GSTIN : 36AAOFS6769E1ZL",
    "STAY ON PAPERS PVT LTD	APPAREL EXPORT PARK, GUNDLAPOCHAMPALI	HYDERABAD.	,GSTIN : 36AADCS4122M1ZA",
    "SV ENGG INDUSTRIES	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD	,GSTIN : 36CIHPS4990N1ZA",
    "TRISHATI ENGINEERING INDUSTRIES	PATANCHERU 	MEDAK DIST	,GSTIN : 36AQXPK7014K1Z9",
    "TRITON PRECISION DRIVES	PRASHANTH NAGAR, KUKATPALLY	HYDERABAD.	GSTIN : 36AADFJ7363D1Z6	",
    "UNITED ENGINEERING WORKS	PRASHANTHNAGAR,KUKATPALLY	HYDERABAD.	,GSTIN : 36AFRPM4307C1ZJ	",
    "VSP INDUSTRIES	PRASHANTH NAGAR,KUKATPALLY	HYDERABAD	,GSTIN : 36AADFV10901C1ZP",
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
  //materialIcons
  const materialIcons = ["icon", "∅", "▢"];
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
    if (!billingEntry.icon || !billingEntry.icon === null) {
      errors.address = "icon";
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
          <select
            value={billingEntry.icon}
            name="materialIcons"
            onChange={handleChange}
            required
          >
            <option>Select</option>
            {materialIcons.map((icon) => (
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
            type="text"
            placeholder="qtyNo"
            name="qtyNo"
            onChange={handleChange}
          />
          <input
            value={billingEntry.kg}
            type="text"
            placeholder="quantity in kgs"
            name="kg"
            onChange={handleChange}
          />
          <input
            value={billingEntry.rateKg}
            type="text"
            placeholder="rate per kg"
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
