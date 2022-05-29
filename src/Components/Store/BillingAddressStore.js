import create from "zustand";
import {persist} from "zustand/middleware"

const useBillingAddressStore = create(
        persist(
        (set,get)=>({
            billingAddress:{},
            setBillingAddress:  (billingAddress)=>set({billingAddress}),
            
        }),
        {
            name:'billingAddress'
        }
        )

)
export  default useBillingAddressStore;