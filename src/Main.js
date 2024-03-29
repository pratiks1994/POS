import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainNav from "./Home Components/MainNav.js";
import Home from "./pages/Home";
import styles from "./Main.module.css";
import ServerConfig from "./pages/ServerConfig.js";
import LiveView from "./pages/LiveView.js";
import OrderView from "./Live View Components/OrderView.js";
import KOTView from "./Live View Components/KOTView.js";
import TableView from "./pages/TableView.js";
import Configuration from "./pages/Configuration.js";
import PrinterConfig from "./pages/PrinterConfig.js";
import PrintersList from "./pages/PrintersList.js";
import EditPrinter from "./pages/EditPrinter.js";
import PrinterAssign from "./pages/PrinterAssign.js";
import AssignBill from "./pages/AssignBill.js";
import AssignKot from "./pages/AssignKot.js";
import BillingScreenConfig from "./pages/BillingScreenConfig.js";
import EditBillingScreen from "./pages/EditBillingScreen.js";

function Main() { 
      return (
            <div className={styles.main}>
                  {/* <MainNav /> */}
                  <Routes>
                        <Route path="/" element={<ServerConfig />} />
                        <Route path="Home" element={<MainNav />}>
                              <Route index element={<Home />} />
                              <Route path="LiveView" element={<LiveView />}>
                                    <Route path="OrderView" element={<OrderView />} />
                                    <Route path="KOTView" element={<KOTView />} />
                              </Route>
                              <Route path="tableView" element={<TableView />} />
                              <Route path="configuration">
                                    <Route index element={<Configuration />} />
                                    <Route path="billingScreenConfig">
                                        <Route index element={<BillingScreenConfig/>}/>
                                        <Route path="editBillingScreen" element={<EditBillingScreen/>}/>
                                         
                                     </Route>     
                                    <Route path="printerConfig">
                                          <Route index element={<PrinterConfig />} />
                                          <Route path="PrintersList">
                                                <Route index element={<PrintersList />} />
                                                <Route path=":printerId" element={<EditPrinter />} />
                                                <Route path="printerAssign/:printerId">
                                                      <Route index  element={<PrinterAssign/>}/>
                                                      <Route path="assignKot" element={<AssignKot/>}/>
                                                      <Route path="assignBill" element={<AssignBill/>}/>
                                                </Route>      
                                          </Route>
                                    </Route>
                              </Route>
                        </Route>
                        {/* <Route path="*" element={<Navigate to="/" />} /> */}
                  </Routes>
            </div>
      );
}

export default Main;
