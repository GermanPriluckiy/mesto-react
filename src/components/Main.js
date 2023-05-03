import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, cards }) {
  const currentUser = React.useContext(CurrentUserContext);

  


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              alt="Фотография пользователя"
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="add-btn" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="places">
        {cards.map((card) => {
          return (
            <Card
              link={card.link}
              name={card.name}
              likes={card.likes}
              key={card._id}
              onClick={onCardClick}
              owner={card.owner._id}
              id= {card._id}
              onCardLike={onCardLike}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
