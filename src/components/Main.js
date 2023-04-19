import React from "react";
import { api } from "../utils/Api";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfoFromServer(), api.getInitialCards()])
      .then(([userInfo, cardList]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img
              className="profile__avatar"
              alt="Фотография пользователя"
              src={userAvatar}
            />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-btn"
              type="button"
              onClick={onEditProfile}
            ></button>
            <p className="profile__description">{userDescription}</p>
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
              likes={card.likes.length}
              key={card._id}
              onClick={onCardClick}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
