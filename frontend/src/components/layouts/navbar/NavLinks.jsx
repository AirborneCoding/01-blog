import React from "react";
import links from "./Link"
import { Link } from 'react-router-dom'
const NavLinks = ({ setShowLinks }) => {
    return <>
        {links.map((link) => {
            const { id, href, text } = link;
            return (
                <li key={id} className="ticker-item lg:relative group">
                    <Link
                        onClick={() => setShowLinks(false)}
                        to={`/${href}`}
                        className="my-1 custom-transition"
                    >
                        {text}
                    </Link>
                    <span className="absolute inset-x-0 bottom-0 w-full h-0.5 bg-blog transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
                </li>
            );
        })}
        
    </>
};

export default NavLinks;
