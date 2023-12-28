import { useState } from "react";
import { FaEllipsisH } from "@/assets/icons";
import { Link } from "react-router-dom";

const Header = ({ user, formatedDate, category }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className="flex justify-between ">
      <div className="flex space-x-3">
        <div>
          <img
            loading="lazy"
            src={user?.avatar?.url}
            alt={user?.username}
            className="h-11 w-11 rounded-full " />
        </div>
        <div className="flex flex-col text-sm">
          <div className="flex items-center space-x-1">
            <Link to={`/author/${user?._id}`} className="hover:underline" >{user?.username}</Link>
            <span>• {formatedDate}</span>
          </div>
          <Link to={`/posts/search?category=${category?.name}`} className="mt-1 bg-blog w-fit text-white px-0.5 rounded-md hover:underline">{category?.name}</Link>
        </div>
      </div>


      <div className="relative ">
        <FaEllipsisH onClick={() => toggleDropdown()} className="cursor-pointer" />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 border border-gray-300 rounded-lg shadow-lg bg-white" >
            <ul>
              <li className="cursor-pointer hover:bg-gray-100 p-2">Add to favorite</li>
              <li className="cursor-pointer hover:bg-gray-100 p-2">Save</li>
              <li className="cursor-pointer hover:bg-gray-100 p-2">Signaler</li>
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};

export default Header;
