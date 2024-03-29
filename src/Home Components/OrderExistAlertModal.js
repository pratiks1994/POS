import React from "react";
import styles from "./OrderExistAlertModal.module.css";
import { Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { resetFinalOrder } from "../Redux/finalOrderSlice";
import { useMutation } from "react-query";
import { executeKotPrint } from "../Utils/executePrint";


function OrderExistAlertModal({ show, hide, IPAddress, finalOrder, notify ,printers}) {
      const dispatch = useDispatch();

      const handleConfirm = async (finalOrder) => {
            let { data } = await axios.post(`http://${IPAddress}:3001/updateOrderAndCreateKOT`, finalOrder);
            return data;
      };

      const { mutate, isLoading } = useMutation({      
            mutationKey: "updateOrderAndCreateKOT",
            mutationFn: handleConfirm,
            onSuccess: async (data) => {
                  console.log(data)
                  hide();
                  await executeKotPrint({...finalOrder,kotTokenNo:data}, printers);
                  dispatch(resetFinalOrder());
                  notify("success", "Orders and KOT updated");
            },
      });

      return (
            <Modal show={show} onHide={hide} backdrop="static" centered animation={false}>
                  <Modal.Body className={styles.modalBody}>
                        <Row>
                              <Col className={styles.message}>Dine In order for same table number is currently active do you want to merger the KOT with active order</Col>
                        </Row>
                        <Row>
                              <Col className={styles.modalControl}>
                                    <button className={styles.okBtn} onClick={() => mutate(finalOrder)} disabled={isLoading}>
                                          {isLoading ? "Loading" : "OK"}
                                    </button>
                                    
                                    <button className={styles.cancelBtn} onClick={hide}>
                                          Cancel
                                    </button>
                              </Col>
                        </Row>
                  </Modal.Body>
            </Modal>
      );
}

export default OrderExistAlertModal;
