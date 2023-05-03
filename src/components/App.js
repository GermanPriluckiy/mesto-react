import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getUserInfoFromServer()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(likes, id) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
    });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
        onCardLike={handleCardLike}
        cards={cards}
      />

      <ImagePopup
        card={selectedCard}
        name="view-card"
        opacity="high"
        onClose={closeAllPopups}
      />

      <Footer />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

      <PopupWithForm
        name="add-card"
        opacity="low"
        title="Новое место"
        buttonTitle="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          lang="ru"
          name="cardPlaceInput"
          placeholder="Название"
          id="input-place"
          className="popup__input"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__error" id="input-place-error"></span>
        <input
          type="url"
          lang="ru"
          name="cardUrlInput"
          placeholder="Ссылка на картинку"
          id="input-url"
          className="popup__input"
          required
        />
        <span className="popup__error" id="input-url-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="edit-avatar"
        opacity="low"
        title="Обновить аватар"
        buttonTitle="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="url"
          lang="ru"
          name="avatarUrlInput"
          placeholder="Ссылка на аватар"
          id="input-avatar-url"
          className="popup__input"
          required
        />

        <span className="popup__error" id="input-avatar-url-error"></span>
      </PopupWithForm>
      <PopupWithForm
        name="delete-card"
        opacity="low"
        title="Вы уверены?"
        buttonTitle="Да"
        onClose={closeAllPopups}
      ></PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default App;
