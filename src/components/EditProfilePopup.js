import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose }) {

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 

  function handleNameChange(e) {
    setName(e.target.value);
    console.log(name);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
        name="edit-profile"
        opacity="low"
        title="Редактировать профиль"
        buttonTitle="Сохранить"
        isOpen={isOpen}
        onClose={onClose}
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
  );
}

export default EditProfilePopup;
