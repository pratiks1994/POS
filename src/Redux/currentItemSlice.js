import { createSlice } from "@reduxjs/toolkit";

const currentItemSlice = createSlice({
      name: "currentItem",
      initialState: {
            currentOrderItemId: "",
            itemQty: 0,
            itemId: "",
            itemName: "",
            variation_id: "",
            variantName: "",
            basePrice: 0,
            toppings: [],
            itemTotal: 0,
            multiItemTotal: 0,
            itemTax: [],
            itemNotes: "",
      },
      reducers: {
            addCurrentItem: (state, action) => {
                  state.currentOrderItemId = action.payload.orderItemId;
                  state.itemId = action.payload.id;
                  state.itemName = action.payload.name;
                  state.itemQty = 1;
                  state.variation_id = action.payload.defaultVariantId;
                  state.variantName = action.payload.defaultVariantName;
                  state.basePrice = action.payload.defaultVariantPrice;
                  state.toppings = [];
                  state.itemTotal = action.payload.defaultVariantPrice;
                  state.multiItemTotal = action.payload.defaultVariantPrice;
            },

            selectVariant: (state, action) => {
                  state.variation_id = action.payload.variation_id;
                  state.variantName = action.payload.name;
                  state.basePrice = +action.payload.price;
                  state.itemTotal = +action.payload.price;
                  state.toppings = [];
                  state.multiItemTotal = state.itemTotal;
            },

            addTopping: (state, action) => {
                  let { id, type, price } = action.payload;
                  //   console.log(id,type,price)
                  let existingTopping = state.toppings.find((topping) => id === topping.id);

                  if (existingTopping) {
                        state.toppings.forEach((topping) => {
                              if (topping.id === existingTopping.id) {
                                    topping.qty += 1;
                              }
                        });
                  } else {
                        const newTopping = { id, type, price, qty: 1 };
                        // console.log(newTopping)
                        state.toppings.push(newTopping);
                  }

                  state.itemTotal += +price;
                  state.multiItemTotal = state.itemTotal;
            },

            clearToppings: (state, action) => {
                  state.toppings = [];
                  state.itemTotal = state.basePrice;
            },

            removeTopping: (state, action) => {
                  let { id, price } = action.payload;
                  let itemQty = state.toppings.find((topping) => id === topping.id).qty;

                  if (itemQty === 1) {
                        return {
                              ...state,
                              itemTotal: Number(state.itemTotal) - Number(price),
                              toppings: [...state.toppings.filter((topping) => id !== topping.id)],
                        };
                  } else {
                        state.toppings.forEach((topping) => {
                              if (topping.id === id) {
                                    topping.qty -= 1;
                              }
                        });
                        state.itemTotal -= Number(price);
                        state.multiItemTotal = state.itemTotal;
                  }
            },

            clearCurrentItem: (state, action) => {
                  state.currentOrderItemId = "";
                  state.itemId = "";
                  state.itemName = "";
                  state.variation_id = "";
                  state.variantName = "";
                  state.basePrice = "";
                  state.toppings = [];
                  state.itemTotal = 0;
                  state.itemQty = 0;
                  state.multiItemTotal = 0;
                  state.itemTax = [];
                  state.itemNotes = "";
            },
      },
});

export default currentItemSlice.reducer;
export const { clearToppings, addCurrentItem, selectVariant, addTopping, removeTopping, clearCurrentItem } = currentItemSlice.actions;
