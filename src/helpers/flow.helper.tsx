import {
  addEdge,
  type Connection,
  type Edge,
  type Node,
  MarkerType,
  type NodeChange,
} from "@xyflow/react";

export const handleNodeChange = (
  changes: NodeChange<Node>[],
  onNodesChange: (changes: NodeChange<Node>[]) => void,
  selectedNode: Node | undefined,
  setSelectedNode: (node: Node | undefined) => void,
  setDrawerVisible: (visible: boolean) => void
) => {
  onNodesChange(changes);
  const removeNodeIds = changes
    .filter((node) => node.type === "remove")
    .map((node) => node.id);
  if (selectedNode && removeNodeIds.includes(selectedNode.id)) {
    setSelectedNode(undefined);
    setDrawerVisible(false);
  }
};

export const handleConnect = (
  params: Connection,
  setEdges: (fn: (eds: Edge[]) => Edge[]) => void
) => {
  const edgeWithArrow = {
    ...params,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  };
  setEdges((eds) => addEdge(edgeWithArrow, eds));
};
