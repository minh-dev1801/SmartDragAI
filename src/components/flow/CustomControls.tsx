import {
  Panel,
  useOnViewportChange,
  useReactFlow,
  type Viewport,
} from "@xyflow/react";
import {
  useCallback,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FaLock, FaLockOpen, FaMinus, FaPlus } from "react-icons/fa";
import { FiMaximize } from "react-icons/fi";

interface CustomControlsProps {
  isLocked: boolean;
  setIsLocked: Dispatch<SetStateAction<boolean>>;
}

const CustomControls = ({ isLocked, setIsLocked }: CustomControlsProps) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [zoomLevel, setZoomLevel] = useState(100);

  useOnViewportChange({
    onChange: useCallback((viewport: Viewport) => {
      setZoomLevel(Math.round(viewport.zoom * 100));
    }, []),
  });

  const handleZoomIn = useCallback(() => {
    if (!isLocked) {
      zoomIn();
    }
  }, [zoomIn, isLocked]);

  const handleZoomOut = useCallback(() => {
    if (!isLocked) {
      zoomOut();
    }
  }, [zoomOut, isLocked]);

  const handleFitView = useCallback(() => {
    if (!isLocked) {
      fitView({ duration: 500 });
    }
  }, [fitView, isLocked]);

  const handleToggleLock = useCallback(() => {
    setIsLocked((prev) => !prev);
  }, [setIsLocked]);

  return (
    <Panel position="top-right">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center gap-1 relative">
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          onClick={handleZoomOut}
          title="Zoom out"
        >
          <FaMinus size={16} className="text-gray-600" />
        </button>

        <div className="px-3 py-1 text-sm font-medium text-gray-700 min-w-[60px] text-center">
          {zoomLevel}%
        </div>

        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          onClick={handleZoomIn}
          title="Zoom in"
        >
          <FaPlus size={16} className="text-gray-600" />
        </button>

        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          onClick={handleFitView}
          title="Fit view"
        >
          <FiMaximize size={16} className="text-gray-600" />
        </button>

        <button
          className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
            isLocked
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          onClick={handleToggleLock}
          title="Toggle interactivity"
        >
          {isLocked ? <FaLock size={16} /> : <FaLockOpen size={16} />}
        </button>
      </div>
    </Panel>
  );
};

export default CustomControls;
