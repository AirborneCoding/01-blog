import React from "react";
import { SearchInput } from "@/helpers"
import useSearch from "@/hooks/search/useSearch";
const NavSearch = () => {
    const {
        onSubmit
    } = useSearch()
    return <form className="xl:w-[600px] w-40 md:w-[300px]" onSubmit={onSubmit}>
        <SearchInput
            name="search"
            holder="Search..."
        />
    </form>;
};

export default NavSearch;
//w-48 md:w-[300px] xl:w-[600px]