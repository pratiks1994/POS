import { createSlice } from "@reduxjs/toolkit";

const UIActiveSlice = createSlice({
	name: "UIActive",
	initialState: { liveViewOrderType: "all", liveViewOrderStatus: "", isCartActionDisable: false, holdOrderCount: 0,restaurantPriceId:null },
	reducers: {
		setActive: (state, action) => {
			const { key, name } = action.payload;
			state[key] = name;
		},
	},
});

export const { setActive } = UIActiveSlice.actions;
export default UIActiveSlice.reducer;
