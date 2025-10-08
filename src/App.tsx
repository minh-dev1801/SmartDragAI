import AllRoutes from "./Routes/AllRoutes";
import { ReactFlowProvider } from "@xyflow/react";
import { DnDProvider } from "./provider/DnDContext";


function App() {
  return (

      <ReactFlowProvider>
        <DnDProvider>
          <AllRoutes />
        </DnDProvider>
      </ReactFlowProvider>
    
  );
}

export default App;
