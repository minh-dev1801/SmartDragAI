import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AllRoutes from "./Routes/AllRoutes";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./provider/DnDContext";
import { BrowserRouter } from "react-router";
import "./styles/index.css";

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
