// RadioGateway.tsx
interface RadioGatewayProps {
  value?: string;
  onChange?: (e: any) => void;
}

const RadioGateway = ({ value, onChange }: RadioGatewayProps) => {
  return (
    <div className="flex gap-4">
      <div
        className="flex-1 border border-gray-300 rounded-lg p-2 relative cursor-pointer"
        onClick={() => onChange && onChange({ target: { value: "open" } })}
      >
        <input
          type="radio"
          value="open"
          checked={value === "open"}
          onChange={() => onChange && onChange({ target: { value: "open" } })}
          className="absolute top-4 right-4 w-5 h-5 bg-blue-500"
        />
        <h3 className="text-md font-semibold mb-2">Mở</h3>
        <p className="text-[12px] text-gray-500">
          Cho phép duy nhất 1 đầu vào Exclusive Gateway và nhiều đầu ra tương
          ứng với các nhánh.
        </p>
      </div>

      <div
        className="flex-1 border border-gray-300 rounded-lg p-2 relative cursor-pointer"
        onClick={() => onChange && onChange({ target: { value: "close" } })}
      >
        <input
          type="radio"
          value="close"
          checked={value === "close"}
          onChange={() => onChange && onChange({ target: { value: "close" } })}
          className="absolute top-4 right-4 w-5 h-5 bg-blue-500"
        />
        <h3 className="text-md font-semibold mb-2">Đóng</h3>
        <p className="text-[12px] text-gray-500">
          Cho phép gộp nhiều đầu vào thành một đầu ra duy nhất, không có sự phân
          nhánh.
        </p>
      </div>
    </div>
  );
};

export default RadioGateway;
