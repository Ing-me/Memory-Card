const SingleCards = ({ card, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }
    return(
        <div className="card" >
             <div className={flipped ? "flipped" : ""}>
                <img className="front" src={card.image} alt="Card front" />
                <img 
                    className="back" 
                    src="haitilogo1.jpg" 
                    alt="Back card"
                    onClick={handleClick} 
                    />
             </div>
        </div>
    )
}

export default SingleCards;