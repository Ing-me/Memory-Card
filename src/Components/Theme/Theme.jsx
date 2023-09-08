import { useEffect, useState } from "react";
import sun from './sun.svg';
import moon from './night.svg';
import Cards from "../Cards/Cards";

const Theme = () => {
    const [theme, setTheme] = useState({color : "light-theme", image:moon})

    const toggleTheme = () => {
        theme.color === "dark-theme" ? setTheme({color : "light-theme", image: moon}) : setTheme({color: "dark-theme", image:sun})
        console.log(theme.color)
    }
    useEffect(() => {
        document.body.className = theme.color;
    }, [theme.color])
    return(
        <div className="container">
             <div className="main-heading">
                <button onClick={toggleTheme}>
                    <img 
                        style={{width: 20 +'px'}}
                        src={theme.image} 
                        alt={theme.color} />
                    </button>     
            </div>

            <h2>Memory card game</h2>

            <button>New game</button>

            <Cards />
        </div>
    )
}
export default Theme;