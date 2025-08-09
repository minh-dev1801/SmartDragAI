import { useCallback } from "react";
import { create } from "xmlbuilder2";
import type { Edge, EdgeMarkerType, Node } from "@xyflow/react";
import { message } from "antd";

export const useXmlConverter = (
  nodes: Node[],
  edges: Edge[],
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void,
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void
) => {
  // Hàm chuyển đổi React Flow sang XML
  const convertToXML = useCallback(() => {
    try {
      const root = create({ version: "1.0", encoding: "UTF-8" })
        .ele("reactflow")
        .att("version", "1.0")
        .att("timestamp", new Date().toISOString());

      // Thêm nodes vào XML
      const nodesElement = root.ele("nodes");
      nodes.forEach((node) => {
        const nodeElement = nodesElement
          .ele("node")
          .att("id", node.id)
          .att("type", node.type as string)
          .att("x", node.position.x.toString())
          .att("y", node.position.y.toString());

        if (node.data) {
          const dataElement = nodeElement.ele("data");
          Object.entries(node.data).forEach(([key, value]) => {
            if (key === "icon" && typeof value === "object") {
              dataElement.ele(key).txt(JSON.stringify(value));
            } else {
              dataElement.ele(key).txt(String(value));
            }
          });
        }

        if (node.measured) {
          nodeElement.att("width", (node.measured.width as number).toString());
          nodeElement.att(
            "height",
            (node.measured.height as number).toString()
          );
        }
      });

      // Thêm edges vào XML
      const edgesElement = root.ele("edges");
      edges.forEach((edge) => {
        const edgeElement = edgesElement
          .ele("edge")
          .att("id", edge.id)
          .att("source", edge.source)
          .att("target", edge.target)
          .att("type", edge.type as string);

        if (edge.sourceHandle)
          edgeElement.att("sourceHandle", edge.sourceHandle);
        if (edge.targetHandle)
          edgeElement.att("targetHandle", edge.targetHandle);

        if (edge.markerEnd) {
          const markerElement = edgeElement.ele("markerEnd");
          Object.entries(edge.markerEnd).forEach(([key, value]) => {
            markerElement.att(key, String(value));
          });
        }
      });

      return root.end({ prettyPrint: true });
    } catch (error) {
      console.error("Error converting to XML:", error);
      return null;
    }
  }, [nodes, edges]);

  // Hàm parse XML thành React Flow data
  const parseXMLToFlow = useCallback((xmlString: string) => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "application/xml");

      // Kiểm tra lỗi parsing
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("Invalid XML format");
      }

      const parsedNodes: Node[] = [];
      const parsedEdges: Edge[] = [];

      // Parse nodes
      const nodeElements = xmlDoc.querySelectorAll("node");
      nodeElements.forEach((nodeEl) => {
        const node: Node = {
          id: nodeEl.getAttribute("id") || "",
          type: nodeEl.getAttribute("type") || "default",
          position: {
            x: parseFloat(nodeEl.getAttribute("x") || "0"),
            y: parseFloat(nodeEl.getAttribute("y") || "0"),
          },
          data: {},
        };

        // Parse node data
        const dataElement = nodeEl.querySelector("data");
        if (dataElement) {
          const dataChildren = dataElement.children;
          for (let i = 0; i < dataChildren.length; i++) {
            const child = dataChildren[i];
            const key = child.tagName;
            const value = child.textContent || "";

            // Try to parse JSON for icon field
            if (key === "icon") {
              try {
                node.data[key] = JSON.parse(value);
              } catch {
                node.data[key] = value;
              }
            } else {
              node.data[key] = value;
            }
          }
        }

        // Parse measured dimensions if available
        const width = nodeEl.getAttribute("width");
        const height = nodeEl.getAttribute("height");
        if (width && height) {
          node.measured = {
            width: parseFloat(width),
            height: parseFloat(height),
          };
        }

        parsedNodes.push(node);
      });

      // Parse edges
      const edgeElements = xmlDoc.querySelectorAll("edge");
      edgeElements.forEach((edgeEl) => {
        const edge: Edge = {
          id: edgeEl.getAttribute("id") || "",
          source: edgeEl.getAttribute("source") || "",
          target: edgeEl.getAttribute("target") || "",
          type: edgeEl.getAttribute("type") || "default",
        };

        // Parse optional attributes
        const sourceHandle = edgeEl.getAttribute("sourceHandle");
        const targetHandle = edgeEl.getAttribute("targetHandle");
        if (sourceHandle) edge.sourceHandle = sourceHandle;
        if (targetHandle) edge.targetHandle = targetHandle;

        // Parse markerEnd if exists
        const markerElement = edgeEl.querySelector("markerEnd");
        if (markerElement) {
          const markerEnd: Record<string, string | number> = {};
          Array.from(markerElement.attributes).forEach((attr) => {
            // Try to parse as number, fallback to string
            const numValue = parseFloat(attr.value);
            markerEnd[attr.name] = !isNaN(numValue) ? numValue : attr.value;
          });
          edge.markerEnd = markerEnd as EdgeMarkerType;
        }

        parsedEdges.push(edge);
      });

      return { nodes: parsedNodes, edges: parsedEdges };
    } catch (error) {
      console.error("Error parsing XML:", error);
      throw new Error("Failed to parse XML file");
    }
  }, []);

  // Hàm upload và import XML
  const uploadXML = useCallback(
    (file: File) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          try {
            const xmlString = e.target?.result as string;
            const { nodes: parsedNodes, edges: parsedEdges } =
              parseXMLToFlow(xmlString);

            // Update state with parsed data
            setNodes(parsedNodes);
            setEdges(parsedEdges);

            message.success(
              `Đã import thành công ${parsedNodes.length} nodes và ${parsedEdges.length} edges từ file XML!`
            );
            resolve();
          } catch (error) {
            console.error("Error importing XML:", error);
            message.error(
              "Lỗi khi import file XML. Vui lòng kiểm tra định dạng file!"
            );
            reject(error);
          }
        };

        reader.onerror = () => {
          message.error("Lỗi khi đọc file!");
          reject(new Error("File read error"));
        };

        reader.readAsText(file);
      });
    },
    [parseXMLToFlow, setNodes, setEdges]
  );

  // Hàm tải xuống XML
  const downloadXML = useCallback(() => {
    const xmlString = convertToXML();
    if (!xmlString) {
      message.error("Không thể tạo file XML!");
      return;
    }

    const blob = new Blob([xmlString], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reactflow_${new Date().getTime()}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    message.success("Đã tải xuống file XML!");
  }, [convertToXML]);

  // Hàm copy XML vào clipboard
  const copyXMLToClipboard = useCallback(async () => {
    const xmlString = convertToXML();
    if (!xmlString) {
      message.error("Không thể tạo XML!");
      return;
    }

    try {
      await navigator.clipboard.writeText(xmlString);
      message.success("XML đã được copy vào clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      message.error("Không thể copy vào clipboard");
    }
  }, [convertToXML]);

  return {
    convertToXML,
    downloadXML,
    copyXMLToClipboard,
    uploadXML,
    parseXMLToFlow,
  };
};
