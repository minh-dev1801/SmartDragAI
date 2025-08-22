import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  ReactFlow,
  Background,
  useReactFlow,
  MiniMap,
  SelectionMode,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { connectionLineStyle, nodeTypes } from "../../constants/flow";
import { useDnD } from "../../hooks/useDnD";
import CustomControls from "./CustomControls";
import ArrowFlow from "../icons/ArrowFlow";
import DrawerCustom from "../common/drawer/DrawerCustom";
import HeaderDrawer from "../common/drawer/HeaderDrawer";
import Image from "../common/Image";
import { handleContentDrawer } from "../../helpers/handleContentDrawer";
import { handleConnect, handleNodeChange } from "../../helpers/flow.helper";
import ModalCustom from "../common/modal/ModalCustom";
import FormSetup from "../common/modal/FormSetup.modal";

interface DnDFlowProps {
  nodes: Node[];
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  onNodesChange: (changes: NodeChange<Node>[]) => void;
  edges: Edge[];
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
}

function DnDFlow({
  nodes,
  setNodes,
  onNodesChange,
  edges,
  setEdges,
  onEdgesChange,
}: DnDFlowProps) {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<Node>();
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const idRef = useRef(3);
  const getId = useCallback(() => `dndnode_${idRef.current++}`, []);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reactFlowWrapper.current) {
      const { height } = reactFlowWrapper.current.getBoundingClientRect();
      const centerX = 150;
      const centerY = height / 2;
      const nodeSpacing = 100;

      setNodes((nds) =>
        nds.map((node, index) => {
          if (index === 0) {
            return {
              ...node,
              position: { x: centerX - nodeSpacing, y: centerY },
            };
          } else if (index === 1) {
            return {
              ...node,
              position: { x: centerX + nodeSpacing, y: centerY },
            };
          }
          return node;
        })
      );
    }
  }, [setNodes]);

  const contentDrawer = useMemo(() => {
    return handleContentDrawer((selectedNode?.data.name as string) || "");
  }, [selectedNode]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) return;

      const reactFlowData = event.dataTransfer.getData("application/reactflow");
      const nodeData = reactFlowData ? JSON.parse(reactFlowData) : {};

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          name: nodeData?.name,
          image: nodeData?.image,
          icon: nodeData?.icon,
        },
      };

      setNodes((nds) => nds.concat(newNode));
      setSelectedNode(newNode);
      setDrawerVisible(true);
    },
    [screenToFlowPosition, type, setNodes, getId]
  );

  const handleDrawerClose = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <ModalCustom
        open={true}
        content={<FormSetup />}
        setOpen={()=>false}
      />
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={(changes) =>
          handleNodeChange(
            changes,
            onNodesChange,
            selectedNode,
            setSelectedNode,
            setDrawerVisible
          )
        }
        onEdgesChange={onEdgesChange}
        onConnect={(params) => handleConnect(params, setEdges)}
        onDrop={onDrop}
        onDragOver={onDragOver}
        connectionLineStyle={connectionLineStyle}
        panOnScroll
        selectionOnDrag
        panOnDrag={!isLocked}
        selectionMode={SelectionMode.Partial}
        fitViewOptions={{ maxZoom: 1, minZoom: 1 }}
      >
        <ArrowFlow />
        <Background />
        <CustomControls isLocked={isLocked} setIsLocked={setIsLocked} />
        <MiniMap />
      </ReactFlow>
      {selectedNode && (
        <DrawerCustom
          title={
            <HeaderDrawer
              icon={
                <Image
                  src={selectedNode.data.image as string}
                  alt={selectedNode.data.name as string}
                  width={40}
                />
              }
              text={selectedNode.data.name as string}
            />
          }
          open={drawerVisible}
          onClose={handleDrawerClose}
          className="custom-close-right-drawer"
        >
          {contentDrawer}
        </DrawerCustom>
      )}
    </>
  );
}

export default DnDFlow;
