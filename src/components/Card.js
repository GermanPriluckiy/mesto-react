import React from "react";
function Card({link, name, likes, onClick}) {
    function handleCardClick() {
       onClick({name, link});
       
    }

    return (
        <div className="places__card">
            <img className="places__card-photo" src={link} alt={name} onClick={handleCardClick}/>
            <div className="places__card-footer">
                <h2 className="places__card-title">{name}</h2>
                <div className="places__card-like-information">
                    <button className="like-btn" type="button"></button>
                    <p className="places__card-like-value">{likes}</p>
                </div>
            </div>
            <button className="delete-btn" type="button"></button>
        </div>
    );
}

export default Card;