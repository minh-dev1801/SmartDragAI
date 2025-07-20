import { features } from "../../constants/header";
import Image from "../common/Image";
import SearchInput from "../common/SearchInput";

const MenuHeader = () => {
  return (
    <div>
      <SearchInput className="mb-5" />
      <div className="flex justify-between items-center">
        <h1>Tất cả ứng dụng ({features.length})</h1>
        <a href="#" className="text-blue-500">
          Xem tất cả
        </a>
      </div>
      <div className="grid grid-cols-3 gap-2 px-2">
        {features.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center justify-center"
          >
            <Image src={item.src} alt={item.alt} className="w-4" />
            <p className="text-sm text-gray-700">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuHeader;
