import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  ReactFlow,
  addEdge,
  SelectionMode,
  useEdgesState,
  useNodesState,
  Background,
  useReactFlow,
  MiniMap,
  type OnConnect,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  connectionLineStyle,
  initialEdges,
  initialNodes,
  nodeTypes,
} from "../../constants/flow";
import { useDnD } from "../../hooks/useDnD";
import CustomControls from "./CustomControls";
import ArrowFlow from "../icons/ArrowFlow";

import DrawerCustom from "../common/drawer/DrawerCustom";
import HeaderDrawer from "../common/drawer/HeaderDrawer";
import Image from "../common/Image";
import { handleContentDrawer } from "../../helpers/handleContentDrawer";

function DnDFlow() {
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);

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

  const handleNodeChange = useCallback(
    (changes: NodeChange[]) => {
      onNodesChange(changes);
      const removeNodeIds = changes
        .filter((node) => node.type === "remove")
        .map((node) => node.id);
      if (selectedNode && removeNodeIds.includes(selectedNode.id)) {
        setSelectedNode(undefined);
        setDrawerVisible(false);
      }
    },
    [onNodesChange, selectedNode]
  );

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const edgeWithArrow = {
        ...params,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
        },
      };
      setEdges((eds) => addEdge(edgeWithArrow, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!type) {
        return;
      }

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
      <ReactFlow
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodeChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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
                  width={70}
                  className="border border-gray-200 px-4 py-1 rounded-sm shadow-sm"
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
