interface RadioCustomProps {
  value: string;
  onChange: (newValue: string) => void;
}

const RadioCustom = ({ value, onChange }: RadioCustomProps) => {
  return (
    <div className="flex gap-4">
      <div
        className="flex-1 border border-gray-300 rounded-lg p-2 relative cursor-pointer"
        onClick={() => onChange("create")}
      >
        <input
          type="radio"
          value="create"
          checked={value === "create"}
          className="absolute top-4 right-4 w-5 h-5 bg-blue-500"
        />
        <h3 className="text-md font-semibold mb-2">Create Record</h3>
        <p className="text-[12px] text-gray-500 w-[90%]">
          Cho phép tùy chỉnh tạo bản ghi của một đối tượng và sử dụng bàn ghi đó
          trong quy trình.
        </p>
      </div>

      <div
        className="flex-1 border border-gray-300 rounded-lg p-2 relative cursor-pointer"
        onClick={() => onChange("update")}
      >
        <input
          type="radio"
          value="update"
          checked={value === "update"}
          className="absolute top-4 right-4 w-5 h-5 bg-blue-500"
        />
        <h3 className="text-md font-semibold mb-2">Update Record</h3>
        <p className="text-[12px] text-gray-500 w-[90%]">
          Cho phép tùy chỉnh cập nhật dữ liệu bản ghi của một đối tượng và sử
          dụng bản ghi đó trong các bước tiếp theo của quy trình.
        </p>
      </div>
    </div>
  );
};

export default RadioCustom;
