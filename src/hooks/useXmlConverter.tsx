import { useCallback } from "react";
import { create } from "xmlbuilder2";
import type { Edge, Node } from "@xyflow/react";

export const useXmlConverter = (nodes: Node[], edges: Edge[]) => {
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

  // Hàm tải xuống XML
  const downloadXML = useCallback(() => {
    const xmlString = convertToXML();
    const blob = new Blob([xmlString as string], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `reactflow_${new Date().getTime()}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [convertToXML]);

  // Hàm copy XML vào clipboard
  const copyXMLToClipboard = useCallback(async () => {
    const xmlString = convertToXML();
    try {
      await navigator.clipboard.writeText(xmlString as string);
      alert("XML đã được copy vào clipboard!");
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      alert("Không thể copy vào clipboard");
    }
  }, [convertToXML]);

  return { convertToXML, downloadXML, copyXMLToClipboard };
};
