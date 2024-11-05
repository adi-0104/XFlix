import React from "react";
import {Box} from "@mui/material";
import { Link } from "react-router-dom";


const Header = ({children}) => {
    return (
        <Box className="header" sx={{display: "flex", backgroundColor: "#202020", justifyContent: "space-between" ,alignItems: "center", p:1}}>
            {/* Logo */}
            <Link to={"/"}>
                <Box className = "title" sx={{p: 0.5}}>
                    <img src="/logo.png" alt = "Xflix"></img>
                </Box>
            </Link>
            {/*serach barand upload button if Landing Page */}
            {children}
        </Box>
        
    )
}

export default Header