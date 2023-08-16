import React, { Children } from "react";
import styles from "./PrintersList.module.css";
import BackButton from "../Feature Components/BackButton";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "react-query";
// import axios from "axios";
// import { setPrinters } from "../Redux/printerSettingsSlice";
import axiosInstance from "../Feature Components/axiosGlobal";

function PrintersList() {
      const navigate = useNavigate();
     
      
      const getPrinters = async () => {
            const { data } = await axiosInstance.get(`/getPrinters`);
            return data;
      };

      const {
            data: printers,
            isLoading,
            isError,
            error,
      } = useQuery({
            queryKey: "printers",
            queryFn: getPrinters,
      });


      return (
            <motion.div className={styles.printersListBody} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.1 }}>
                  <header>
                        <div className={styles.headerText}> Printer Listing </div>
                        <div>
                              <button className={styles.addprinterButton}>+ Add Printer</button>
                              <BackButton onClick={() => navigate("..")} />
                        </div>
                  </header>
                  <main className={styles.printersList}>
                        {isLoading ? <div>Loading....</div> : null}
                        {isError ? <div>{error}</div> : null}
                        {printers && (
                              <table className={styles.tableMain}>
                                    <thead>
                                          <tr>
                                                <th>Printer Name</th>
                                                <th>Printer Type</th>
                                                <th>Report Print</th>
                                                <th>Action</th>
                                                <th>Print Assign</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {printers?.map((printer) => {
                                                return (
                                                      <tr key={printer.id}>
                                                            <td>{printer.printer_display_name}</td>
                                                            <td>General</td>
                                                            <td>NO</td>
                                                            <td>
                                                                  <Link to={`${printer.id}`}>Edit</Link> | <Link>Remove</Link>
                                                            </td>
                                                            <td>
                                                                  <Link to={`printerAssign/${printer.id}`}>Assign</Link>
                                                            </td>
                                                      </tr>
                                                );
                                          })}
                                    </tbody>
                              </table>
                        )}
                  </main>
            </motion.div>
      );
}

export default PrintersList;
