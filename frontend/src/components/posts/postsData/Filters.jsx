import React, { memo } from "react";
import { SearchInput } from "@/helpers";

const Filters = memo(({ handleSearchChange, searchValue }) => {

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
});

export default Filters;