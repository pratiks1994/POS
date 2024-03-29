export const convertOrder = (order) => {

     
	const orderCart = order.items.map((item) => {
        
        let addonTotal = 0
       
		let toppings = item.itemAddons.map((topping) => {
            addonTotal += (+topping.price) * (+topping.quantity)
			return { id: topping?.addongroupitem_id, type: topping?.name, price: topping?.price, qty: topping?.quantity };
		});

		let itemTax = item.itemTax.map((tax) => {
			return { id: tax.tax_id, name: `${tax.tax_id === 3 ? "CGST" : "SGST"}`, tax: tax.tax_amount };
		});

       
		return {
			currentOrderItemId: item.id,
			itemQty: item.quantity,
			itemId: item.item_id,
			itemName: item.item_name,
			variation_id: item.variation_id,
			variationName: item.variation_name || "",
			basePrice: item.price - addonTotal,
			toppings: toppings,
			itemTotal: item.price,
			multiItemTotal: item.final_price,
			itemTax: itemTax,
		};
	});

    const kotTokenNo = order.KOTDetail.map(kot => kot.token_no).join(",")

	return {
        kotTokenNo,
        printCount:order.print_count,
        orderNo :order.order_number,
		customerName: order.customer_name,
		customerContact: order.phone_number,
		customerAdd: order.complete_address,
		subTotal: order.item_total,
		tax: order.total_tax,
		deliveryCharge: order.delivery_charges,
		packagingCharge: 0,
		discount: order.total_discount,
		paymentMethod: order.payment_type,
		tableNumber: order.dine_in_table_no,
		orderType: order.order_type,
		cartTotal: order.total,
		orderComment: order.description,
		id: order.id,
		order_status: order.order_status,
        orderCart
	};
};
