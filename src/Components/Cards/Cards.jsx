const SingleCards = ({ card }) => {
    return(
        <div className="card" >
             <div>
                <img className="front" src={card.image} alt="Card front" />
                <img className="back" src="haitilogo1.jpg" alt="Back card" />
             </div>
        </div>
    )
}

export default SingleCards;