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
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);

    const toggleTheme = () => {
        theme.color === "dark-theme" ? setTheme({color : "light-theme", image: moon}) : setTheme({color: "dark-theme", image:sun})
        console.log(theme.color)
    }
    useEffect(() => {
        document.body.className = theme.color;
    }, [theme.color])

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/image/random/6")
        .then(result => result.json())
        .then(data => data.message.map((data) => cardContainer.push(createDogObject(data))))
    },[cardContainer])

    //Shuffle the cards randomly
    const shuffleCard = () =>{
        const cards = cardContainer.slice(0, 6)
        const shuffleCards = [...cards, ...cards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id:Math.random()}))

        setChoiceTwo(null)
        setChoineOne(null)
        setScore(0)
        setMaxScore(0)
        setCards(shuffleCards)
        setTurns(0)
    }


    // Create the object dog
    function createDogObject(url){
        return {image: url, matched: false}
    }

    // Handle the choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoineOne(card)
    }

    useEffect(() => {
        if(choiceOne && choiceTwo){
            setDisabled(true)
            if(choiceOne.image === choiceTwo.image){
               
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.image === choiceOne.image){
                            setScore(score + 1)
                            if(score > maxScore){
                                setMaxScore(score)
                            } else{
                                setMaxScore(maxScore)
                            }
                            return {...card, matched: true}
                        } else{
                            return card;
                        }
                    })
                })
               resetTurn()
            }
            else{
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo])

      
    useEffect(() => {shuffleCard()},[])
    // Reset turn
    const resetTurn = () => {
        setChoiceTwo(null)
        setChoineOne(null)
        setTurns(prev => prev + 1);
        setDisabled(false)
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
            <div className="displayScore">
                <div className="score">Score:<span>{ score} </span></div>
                <div className="score">Max score:<span>{ score }</span></div>
            </div>
            <button onClick={shuffleCard}>New game</button>

             <div className="card-grid">
                {cards.map((card) => (
                    <SingleCards 
                        key={card.id} 
                        card={card} 
                        width="250px"
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                        /> 
                ))}
             </div>

        </div>
    )
}
export default Theme;