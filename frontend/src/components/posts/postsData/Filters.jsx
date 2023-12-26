import React from "react";
import { SearchInput } from "@/helpers";

const Filters = ({ handleSearchChange, searchValue }) => {

    return <form className="md:w-[700px] mx-auto">
        <SearchInput
            name="search"
            holder="Search..."
            shadow="md"
            shadowColor="gray-100"
            defaultValue={searchValue}
            onChange={handleSearchChange}
        />
    </form>
};

export default Filters;