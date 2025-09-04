import { CiSearch } from "react-icons/ci";
import Dropdown from "@/components/common/Dropdown";

export default function SearchDropdown() {
  return (
    <Dropdown
      trigger={
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 h-8 w-8 rounded-md">
          <CiSearch className="text-gray-600 dark:text-gray-300" />
        </div>
      }
      position="right"
      triggerMode="click"
    >
      <div className="p-2 flex items-center min-w-[200px]">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-2 h-[40px] border border-primary rounded-l-md text-sm bg-background text-gray-800 dark:text-gray-200 focus:outline-none"
        />
        <div className="h-[40px] flex items-center bg-primary px-3 rounded-r-md text-light">
          <CiSearch className="text-lg" />
        </div>
      </div>
    </Dropdown>
  );
}
