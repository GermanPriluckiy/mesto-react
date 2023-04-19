import React from "react";

import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

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
    <>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
      />

      <ImagePopup
        card={selectedCard}
        name="view-card"
        opacity="high"
        onClose={closeAllPopups}
      />

      <Footer />

      <PopupWithForm
        name="edit-profile"
        opacity="low"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          type="text"
          lang="ru"
          name="nameInput"
          placeholder="Имя"
          id="input-name"
          className="popup__input"
          required
          minLength="2"
          maxLength="40"
        />

        <span className="popup__error" id="input-name-error"></span>

        <input
          type="text"
          lang="ru"
          name="descriptionInput"
          placeholder="О себе"
          id="input-description"
          className="popup__input"
          required
          minLength="2"
          maxLength="200"
        />

        <span className="popup__error" id="input-description-error"></span>
      </PopupWithForm>
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
    </>
  );
}

export default App;
