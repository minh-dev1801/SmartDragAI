import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { fields } from "./fields";
import type { SidebarFieldType } from "../../types/dnd-kit";

interface DraggableSidebarFieldProps {
  field: SidebarFieldType;
  [key: string]: any;
}

interface SidebarFieldProps {
  field: SidebarFieldType;
  [key: string]: any;
}

function DraggableSidebarField(props: DraggableSidebarFieldProps) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true,
    },
  });

  return (
    <div ref={setNodeRef} className="relative" {...listeners} {...attributes}>
      <SidebarField field={field} {...rest} overlay={isDragging} />
      {isDragging && (
        <div className="absolute inset-0 bg-gray-200 bg-opacity-50 rounded-md pointer-events-none z-10 opacity-50 scale-105 shadow-lg" />
      )}
    </div>
  );
}

export function SidebarField(props: SidebarFieldProps) {
  const { field, overlay } = props;
  const { color, name } = field;

  return (
    <div
      className={`flex items-center p-2 rounded-md hover:bg-gray-100 transition-all duration-200 cursor-pointer ${
        overlay ? "bg-gray-50 opacity-70" : ""
      }`}
    >
      <field.icon className={`w-4 h-4 mr-2 ${color}`} />
      <span className="text-sm text-gray-700">{name}</span>
    </div>
  );
}

export function Sidebar() {
  return (
    <>
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-[calc(100vh-190px)] overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Container</h3>
          <div className="space-y-2">
            {fields.map((field) => (
              <DraggableSidebarField key={field.type} field={field} />
            ))}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Kiểu dữ liệu
          </h3>
          <div className="space-y-2">
            {fields.map((field) => (
              <DraggableSidebarField key={field.type} field={field} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
