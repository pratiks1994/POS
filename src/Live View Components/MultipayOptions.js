import React, { useEffect } from "react";
import styles from "./MultipayOptions.module.css";
import { Row, Col } from "react-bootstrap";

function MultipayOptions({ paymentDetail, setPaymentDetail, orderTotal }) {
      const handleChange = (e) => {
            const { name, value } = e.target;

            setPaymentDetail((prev) => {
                  const newMultipay = prev.multipay.map((option) => {
                        if (option.name === name) {
                              return { ...option, amount: value };
                        }
                        return option;
                  });

                  const total = newMultipay.reduce((acc, option) => {
                        if (option.name !== "cod") {
                              return acc + +option.amount;
                        }
                        return acc;
                  }, 0);

                  const finalMultipay = newMultipay.map((option) => {
                        if (option.name === "cod") {
                              const newCodAmount = Math.round(orderTotal) - total;
                              const amount = newCodAmount < 0 || !newCodAmount ? "invalid amount" : newCodAmount.toString();
                              return { ...option, amount };
                        }
                        return option;
                  });

                  return { ...prev, multipay: finalMultipay };
            });
      };

      //   console.log(paymentDetail.multipay);

      return (
            <>
                  {paymentDetail.multipay.map((option) => {
                        return (
                              <Row className={styles.field} key={option.name}>
                                    <Col xs={3}>{option.displayName}</Col>
                                    <Col xs={5}>
                                          <input type="text" name={option.name} onChange={handleChange} disabled={option.name === "cod"} value={option.amount} />
                                    </Col>
                                    {/* <Col xs={2}>
                                          <button onClick={}>save</button>
                                    </Col>
                                    <Col xs={2}>
                                          <button>clear</button>
                                    </Col> */}
                              </Row>
                        );
                  })}
            </>
      );
}

export default MultipayOptions;
