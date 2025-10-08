import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { renderers } from "./fields";
import { Button } from "antd";
import { MdAdd, MdCropSquare } from "react-icons/md";
import type { FieldType } from "../../types/dnd-kit";

interface FieldProps {
  field: FieldType;
  overlay?: boolean;
  selected?: boolean;
  onSelect?: (id: string) => void;
  [key: string]: any;
}

interface SortableFieldProps {
  id: string | number;
  index: number;
  field: FieldType;
  selected: boolean;
  onSelect: (id: string) => void;
}

interface CanvasProps {
  fields: FieldType[];
  selectedFieldId?: string | number;
  onFieldSelect: (id: string) => void;
}

function getRenderer(type: string) {
  if (type === "spacer") {
    return () => {
      return <div className="spacer">spacer</div>;
    };
  }

  return renderers["input"] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props: FieldProps) {
  const { field, overlay, selected, onSelect, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type);

  let className = "canvas-field";
  if (overlay) {
    className += " overlay";
  }
  if (selected) {
    className += " selected";
  }

  return (
    <div
      className={className}
      onClick={
        !overlay && onSelect ? () => onSelect(field?.id as string) : undefined
      }
    >
      <Component {...rest} />
    </div>
  );
}

function SortableField(props: SortableFieldProps) {
  const { id, index, field, selected, onSelect } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} selected={selected} onSelect={onSelect} />
    </div>
  );
}

export function Canvas(props: CanvasProps) {
  const { fields, selectedFieldId, onFieldSelect } = props;

  const { setNodeRef, isOver } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true,
    },
  });

  const droppableClass = isOver
    ? "border-blue-500 bg-blue-50"
    : "border-gray-200";

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 flex flex-col bg-white ${droppableClass}`}
    >
      <div className="mr-8 mt-4 flex justify-end mb-3">
        <Button variant="outlined" color="primary" size="small">
          Thiết lập thuộc tính trang
        </Button>
      </div>

      <div className="flex-1 px-6">
        <div className="border border-gray-200 p-1 flex gap-1 cursor-pointer mb-4 rounded">
          <MdCropSquare className="w-5 h-5 text-orange-500" />
          <span className="text-sm text-gray-600">Tiêu đề màn hình</span>
        </div>

        <div className="max-w-full">
          <div className="border-2 border-dashed rounded-lg p-4 mb-4 bg-blue-100 border-blue-300 h-[200px] space-y-2">
            {fields?.map((field, index) => (
              <SortableField
                key={field.id}
                id={field.id}
                field={field}
                index={index}
                selected={field.id === selectedFieldId}
                onSelect={onFieldSelect}
              />
            ))}
          </div>

          <button className="flex items-center text-gray-600 text-sm">
            <MdAdd className="w-4 h-4 mr-1" />
            Thêm Layout Row
          </button>
        </div>
      </div>
    </div>
  );
}
