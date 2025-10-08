import { useCallback, useMemo } from "react";
import BpmnModdle from "bpmn-moddle";
import type { Edge, Node } from "@xyflow/react";
import { message } from "antd";
import { saveAs } from "file-saver";
import { useAppSelector } from "../redux/store/store";
import { selectFormData } from "../redux/features/formExclusiveGateway/formExclusiveGatewaySlice";

export const useXmlConverter = (nodes: Node[], edges: Edge[]) => {
  const moddle = useMemo(() => new BpmnModdle(), []);
  const formData = useAppSelector(selectFormData as any);

  console.log("moddle: ", moddle);
  console.log("formData: ", JSON.stringify(formData, null, 4));

  // Helper function to get node center point
  const getNodeCenter = useCallback(
    (node: Node) => ({
      x: node.position.x + (node.width || 100) / 2,
      y: node.position.y + (node.height || 80) / 2,
    }),
    []
  );

  // Helper function to determine BPMN element type - sửa để dựa vào node.data.name
  const getBpmnElementType = useCallback((nodeName: string) => {
    // Normalize tên: lowercase và loại bỏ khoảng trắng để khớp key
    const normalized = nodeName.toLowerCase().replace(/\s+/g, "");

    const typeMap: Record<string, string> = {
      start: "bpmn:StartEvent",
      end: "bpmn:EndEvent",
      task: "bpmn:Task",
      usertask: "bpmn:UserTask",
      servicetask: "bpmn:ServiceTask",
      gateway: "bpmn:ExclusiveGateway",
      exclusivegateway: "bpmn:ExclusiveGateway",
      parallelgateway: "bpmn:ParallelGateway",
      inclusivegateway: "bpmn:InclusiveGateway",
      subprocess: "bpmn:SubProcess",
      callactivity: "bpmn:CallActivity",
      intermediatecatchevent: "bpmn:IntermediateCatchEvent",
      intermediatethrowevent: "bpmn:IntermediateThrowEvent",

      // Thêm map cho các loại task khác từ mảng tasks/gateways/events của bạn
      sendemail: "bpmn:SendTask", // Hoặc "bpmn:ServiceTask" nếu phù hợp
      sendhttprequest: "bpmn:ServiceTask",
      organization: "bpmn:BusinessRuleTask", // Ví dụ, tùy chỉnh theo nhu cầu
      sendnotification: "bpmn:SendTask",
      createorupdaterecord: "bpmn:ServiceTask",
      getrecord: "bpmn:ServiceTask",
      loop: "bpmn:SubProcess", // Có thể dùng loop multi-instance
      wait: "bpmn:IntermediateCatchEvent", // Ví dụ cho timer event
      root: "bpmn:Task", // Nếu "Root" là task mặc định
    };
    return typeMap[normalized] || "bpmn:Task";
  }, []);

  // Create BPMN element from React Flow node - sửa để truyền node.data.name
  const createBpmnElement = useCallback(
    (node: Node) => {
      console.log("node: ", node);
      const elementType = getBpmnElementType(
        (node.data?.name as string) || "Task"
      ); // Sửa ở đây: dùng node.data.name
      console.log("elementType: ", elementType);
      return moddle.create(elementType, {
        id: node.id,
        name: node.data?.name || `Node ${node.id}`,
      });
    },
    [moddle, getBpmnElementType]
  );

  // Create sequence flow from React Flow edge
  const createSequenceFlow = useCallback(
    (edge: Edge, sourceElement: any, targetElement: any) => {
      console.log("edge: ", edge);
      return moddle.create("bpmn:SequenceFlow", {
        id: edge.id,
        name: edge.label?.toString() || "",
        sourceRef: sourceElement,
        targetRef: targetElement,
      });
    },
    [moddle]
  );

  // Create BPMN shape for diagram
  const createBpmnShape = useCallback(
    (node: Node, bpmnElement: any) => {
      return moddle.create("bpmndi:BPMNShape", {
        id: `Shape_${node.id}`,
        bpmnElement: bpmnElement,
        bounds: moddle.create("dc:Bounds", {
          x: Math.round(node.position.x),
          y: Math.round(node.position.y),
          width: node.width || 100,
          height: node.height || 80,
        }),
      });
    },
    [moddle]
  );

  // Create BPMN edge for diagram
  const createBpmnEdge = useCallback(
    (edge: Edge, sourceNode: Node, targetNode: Node, sequenceFlow: any) => {
      const sourceCenter = getNodeCenter(sourceNode);
      const targetCenter = getNodeCenter(targetNode);

      console.log("sequenceFlow: ", sequenceFlow);

      return moddle.create("bpmndi:BPMNEdge", {
        id: `Edge_${edge.id}`,
        bpmnElement: sequenceFlow,
        waypoint: [
          moddle.create("dc:Point", {
            x: Math.round(sourceCenter.x),
            y: Math.round(sourceCenter.y),
          }),
          moddle.create("dc:Point", {
            x: Math.round(targetCenter.x),
            y: Math.round(targetCenter.y),
          }),
        ],
      });
    },
    [moddle, getNodeCenter]
  );

  // Main function to convert React Flow to BPMN XML
  const convertToBpmnXml = useCallback(async () => {
    try {
      const elementMap: Record<string, any> = {};
      const flowMap: Record<string, any> = {};
      const flowElements: any[] = [];

      console.log("nodes: ", nodes);

      // Create BPMN elements from nodes
      nodes.forEach((node) => {
        const element = createBpmnElement(node);
        elementMap[node.id] = element;
        console.log("elementMap: ", elementMap);
        flowElements.push(element);
        console.log("flowElements: ", flowElements);
      });

      // Create sequence flows from edges
      edges.forEach((edge) => {
        const sourceElement = elementMap[edge.source];
        const targetElement = elementMap[edge.target];

        if (sourceElement && targetElement) {
          const sequenceFlow = createSequenceFlow(
            edge,
            sourceElement,
            targetElement
          );
          flowMap[edge.id] = sequenceFlow;
          console.log("flowMap: ", flowMap);
          flowElements.push(sequenceFlow);
        }
      });

      // Set incoming/outgoing references
      nodes.forEach((node) => {
        const element = elementMap[node.id];
        const incomingFlows = edges
          .filter((edge) => edge.target === node.id)
          .map((edge) => flowMap[edge.id])
          .filter(Boolean);
        console.log("incomingFlows: ", incomingFlows);

        const outgoingFlows = edges
          .filter((edge) => edge.source === node.id)
          .map((edge) => flowMap[edge.id])
          .filter(Boolean);
        console.log("outgoingFlows: ", outgoingFlows);

        if (incomingFlows.length > 0) element.incoming = incomingFlows;
        if (outgoingFlows.length > 0) element.outgoing = outgoingFlows;
      });

      console.log("elementMap: ", elementMap);

      // Create process
      const process = moddle.create("bpmn:Process", {
        id: "Loan",
        name: "Loan",
        isExecutable: true,
        flowElements: flowElements,
      });

      // Create diagram elements
      const shapes = nodes.map((node) =>
        createBpmnShape(node, elementMap[node.id])
      );

      const diagramEdges = edges
        .map((edge) => {
          const sourceNode = nodes.find((n) => n.id === edge.source);
          const targetNode = nodes.find((n) => n.id === edge.target);
          const sequenceFlow = flowMap[edge.id];

          return sourceNode && targetNode && sequenceFlow
            ? createBpmnEdge(edge, sourceNode, targetNode, sequenceFlow)
            : null;
        })
        .filter(Boolean);

      // Create BPMN diagram structure
      const plane = moddle.create("bpmndi:BPMNPlane", {
        id: "BPMNPlane_1",
        bpmnElement: process,
        planeElement: [...shapes, ...diagramEdges],
      });

      const diagram = moddle.create("bpmndi:BPMNDiagram", {
        id: "BPMNDiagram_1",
        plane: plane,
      });

      const definitions = moddle.create("bpmn:Definitions", {
        id: "Definitions_1",
        targetNamespace: "http://bpmn.io/schema/bpmn",
        exporter: "React Flow BPMN Converter",
        exporterVersion: "5.37.0",
        rootElements: [process],
        diagrams: [diagram],
      });

      const { xml } = await moddle.toXML(definitions);
      // POST-PROCESSING: Thêm Camunda namespace và attributes manually
      let processedXml = xml;

      // 1. Thêm xmlns:camunda vào definitions
      processedXml = processedXml.replace(
        'xmlns:di="http://www.omg.org/spec/DD/20100524/DI"',
        'xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn"'
      );

      // 2. Thêm camunda:historyTimeToLive vào process
      processedXml = processedXml.replace(
        '<bpmn:process id="Loan" name="Loan" isExecutable="true">',
        '<bpmn:process id="Loan" name="Loan" isExecutable="true" camunda:historyTimeToLive="180">'
      );

      return processedXml;
    } catch (error) {
      console.error("Error converting to BPMN XML:", error);
      throw new Error(
        `Failed to convert to BPMN XML: ${(error as Error).message}`
      );
    }
  }, [
    nodes,
    edges,
    moddle,
    createBpmnElement,
    createSequenceFlow,
    createBpmnShape,
    createBpmnEdge,
  ]);

  // Download XML file
  const downloadXML = useCallback(async () => {
    try {
      const xmlContent = await convertToBpmnXml();
      const blob = new Blob([xmlContent], { type: "application/xml" });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const fileName = `bpmn-process-${timestamp}.bpmn`;

      saveAs(blob, fileName);
      message.success("Tải xuống BPMN XML thành công!");
    } catch (error) {
      console.error("Download error:", error);
      message.error(`Lỗi khi tải xuống BPMN XML: ${(error as Error).message}`);
    }
  }, [convertToBpmnXml]);

  return { downloadXML };
};
