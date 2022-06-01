/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";
import "./style.css";

export default function Modal() {
  const { openModal, modalText, setOpenModal, userEdit } = useGlobal();
  const { name, phone, email, cpf, birth_date, id } = userEdit;

  const [nameInput, setNameInput] = useState(name);
  const [phoneInput, setPhoneInput] = useState(phone);
  const [emailInput, setEmailInput] = useState(email);
  const [cpfInput, setCpfInput] = useState(cpf);
  const [birth_dateInput, setBirth_dateInput] = useState(birth_date);
  const [idInput, setIdInput] = useState(id);

  useEffect(() => {
    setNameInput(name);
    setPhoneInput(phone);
    setEmailInput(email);
    setCpfInput(cpf);
    setBirth_dateInput(birth_date);
    setIdInput(id);
  }, [birth_date, cpf, email, id, name, phone, userEdit]);

  const { patch } = useRequest();
  const history = useHistory();

  function handleClick(params) {
    if (params === "confirm" && modalText === "CONFIRMAR") {
      setOpenModal(false);
    } else {
      setOpenModal(false);
    }
  }

  return (
    <div
      style={{ display: openModal ? "flex" : "none" }}
      className="container-modal"
    >
      <div className="modal">
        <div>
          <label htmlFor="nameInput"> Nome:</label>
          <input
            id="nameInput"
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cpfInput">CPF:</label>
          <input
            id="cpfInput"
            type="text"
            value={cpfInput}
            onChange={(e) => setCpfInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="emailInput">Email:</label>
          <input
            id="emailInput"
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phoneInput">Telefone:</label>
          <input
            id="phoneInput"
            type="text"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="birth_dateInput">Data de Nascimento:</label>
          <input
            id="birth_dateInput"
            type="text"
            value={birth_dateInput}
            onChange={(e) => setBirth_dateInput(e.target.value)}
          />
        </div>
      </div>
      <h2>Deseja Guardar as Alterações ?</h2>
      <div className="div-btns">
        <Button
          onClickProp={() => handleClick("confirm")}
          clsName="btn-modal-confirm"
          text="Sim"
        />
        <Button
          onClickProp={() => handleClick("cancel")}
          clsName="btn-modal-cancel"
          text="Não"
        />
      </div>
    </div>
  );
}
