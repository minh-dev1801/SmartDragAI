import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./styles/index.css";
import AllRoutes from "./Routes/AllRoutes";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./provider/DnDContext";
import "@ant-design/v5-patch-for-react-19";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactFlowProvider>
        <DnDProvider>
          <AllRoutes />
        </DnDProvider>
      </ReactFlowProvider>
    </BrowserRouter>
  </StrictMode>
);
