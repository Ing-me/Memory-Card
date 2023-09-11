import { useEffect, useState } from "react";
import sun from './sun.svg';
import moon from './night.svg';
import SingleCards from "../Cards/Cards";

const Theme = () => {

    const cardContainer = []

    const [theme, setTheme] = useState({color : "light-theme", image:moon})
    const [cards, setCards] = useState([]);
    const[turns, setTurns] = useState(0);
    const [choiceOne, setChoineOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null)

    const toggleTheme = () => {
        theme.color === "dark-theme" ? setTheme({color : "light-theme", image: moon}) : setTheme({color: "dark-theme", image:sun})
        console.log(theme.color)
    }
    useEffect(() => {
        document.body.className = theme.color;
    }, [theme.color])

    useEffect(() => {
        //fetch('https://pokeapi.co/api/v2/pokemon?limit=6&offset=6')
        //fetch('https://api.giphy.com/v1/gifs/translate?api_key=x49YqDkb6lUJZ6zMzNjnCr8iIvqz1Ase&limit=6&s=cat')
        //fetch("http://api.giphy.com/v1/gifs/search?q=dog+cat+cow&api_key=x49YqDkb6lUJZ6zMzNjnCr8iIvqz1Ase&limit=6")
        fetch("https://dog.ceo/api/breeds/image/random/6")
        .then(result => result.json())
        .then(data => data.message.map((data) => cardContainer.push(createDogObject(data))))
    },[])

    //Shuffle the cards randomly
    const shuffleCard = () =>{
        const cards = cardContainer.slice(0, 6)
        const shuffleCards = [...cards, ...cards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id:Math.random()}))

        setCards(shuffleCards)
        setTurns(0)
    }
        console.log(cards, turns)


    // Create the object dog
    function createDogObject(url){
        return {image: url, match: false}
    }


    // Render the cards
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

            <button onClick={shuffleCard}>New game</button>

             <div className="card-grid">
                {cards.map((card) => (
                    <SingleCards key={card.id} card={card} width="250px" /> 
                ))}
             </div>

        </div>
    )
}


export default Theme;