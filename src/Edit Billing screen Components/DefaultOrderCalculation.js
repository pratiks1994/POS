import React from "react";
import styles from "./DefaultOrderCalculation.module.css";

function DefaultOrderCalculation({ defaultOptions, setDefaulOpTions }) {
	const calculationOptions = [
		{
			name: "default_round_off_options",
			displayName: "Default Round off for Bill",
			type: "radio",
			options: [
				{ name: "normal", displayName: "Normal" },
				{ name: "round_up", displayName: "Round Up" },
				{ name: "round_down", displayName: "Round Down" },
				{ name: "none", displayName: "None" },
			],
		},
		{
			name: "default_invoice_decimal",
			displayName: "Default decimal for Invoice",
			type: "select",
			options: [
				{ name: 0, displayName: 0 },
				{ name: 1, displayName: 1 },
				{ name: 2, displayName: 2 },
				{ name: 3, displayName: 3 },
			],
		},
	];

	return (
		<div className={styles.defaultDisplayOptionBody}>
			<header className={styles.displayOptionsheader}> Invoice Calculation </header>
			<main className={styles.displayOptionsMain}>
				{calculationOptions.map((item) => {
					return (
						<div
							className={styles.optionCard}
							key={item.name}>
							<div className={styles.optionNameContainer}>
								<div className={styles.optionName}>{item.displayName}</div>
							</div>
							<div className={styles.options}>
								{item.type === "radio" ? (
									item.options.map((option) => {
										return (
											<div
												key={option.name}
												className={styles.option}>
												<input
													type="radio"
													id={`${option.displayName}${item.displayName}`}
													name={item.name}
													checked={defaultOptions[item.name] === option.name}
													onChange={() => setDefaulOpTions((prev) => ({ ...prev, [item.name]: option.name }))}
												/>
												<label htmlFor={`${option.displayName}${item.displayName}`}>{option.displayName}</label>
											</div>
										);
									})
								) : (
									<div className={styles.option}>
										<select
											className={styles.selectOptions}
											name={item.name}
											value={defaultOptions[item.name]}
											onChange={(e) => setDefaulOpTions((prev) => ({ ...prev, [item.name]: e.target.value }))}>
											{item.options.map((option) => {
												return (
													<option
														value={option.name}
														key={option.name}>
														{" "}
														{option.displayName}
													</option>
												);
											})}
										</select>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</main>
		</div>
	);
}

export default DefaultOrderCalculation;
