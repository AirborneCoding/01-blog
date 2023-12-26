import React, { useState, useEffect, useRef } from "react";

const SearchBar = () => {
    const [inputValue, setInputValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchBarRef = useRef(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        setShowSuggestions(value.trim().length > 0);
    };

    const handleItemClick = (item) => {
        setInputValue(item.name);
        setShowSuggestions(false);
        // You can handle the selected item (e.g., navigate to its page, etc.)
    };

    const handleInputClick = () => {
        setShowSuggestions(true);
    };

    const handleOutsideClick = (event) => {
        if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    // Simulated data array
    const data = [
        { id: 1, type: "author", name: "John Doe" },
        { id: 2, type: "author", name: "Jane Smith" },
        { id: 3, type: "post", name: "React Hooks Tutorial" },
        { id: 4, type: "post", name: "Node.js Best Practices" },
        { id: 5, type: "category", name: "JavaScript" },
        { id: 6, type: "category", name: "Web Development" },
    ];

    // Filter items based on the input value
    const filteredItems = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="search-bar relative " ref={searchBarRef}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleInputClick}
                className="input input-bordered rounded-lg w-full"
                placeholder="Search..."
            />
            {showSuggestions && (
                <ul className="autocomplete-list bg-gray-400 rounded-xl px-5 py-2 mt-3 text-white absolute overflow-y-auto max-h-96 z-10 w-[500px] -left-[80px]">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <li key={item.id} onClick={() => handleItemClick(item)} className="cursor-pointer hover:bg-blue-500 my-1 py-1">
                                {item.name}
                            </li>
                        ))
                    ) : (
                        <li className="no-match-message">No matches found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;


