import create from "zustand";
import { persist } from "zustand/middleware";

const useBillingStore = create(
  persist(
    (set, get) => ({
      orderId: null,
      setOrderId: (orderId) => set({ orderId }),
      billingEntries: [],
      setBillingEntries: (billingEntries) => set({ billingEntries }),
      addEntry: (entry) => {
        set({ billingEntries: [...get().billingEntries, entry] });
      },
      removeEntry: (materialName) => {
        set({
          billingEntries: get().billingEntries.filter(
            (entry) => entry.materialName !== materialName,
          ),
        });
      },
    }),
    {
      name: "billingStore",
    },
  ),
);
export default useBillingStore;
