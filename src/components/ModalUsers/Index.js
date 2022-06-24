/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useState, useEffect } from "react";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";
import toast from "../../helpers/toast";
import "./style.css";

export default function ModalUsers(props) {
  const { userEdit, setUsers, modalUsr, setModalUsr, setUsersFetched, token } =
    useGlobal();
  const { name, telephone, email, cpf, birthDate, id } = userEdit;

  const [nameInput, setNameInput] = useState(name);
  const [phoneInput, setTelephoneInput] = useState(telephone);
  const [emailInput, setEmailInput] = useState(email);
  const [cpfInput, setCpfInput] = useState(cpf);
  const [birthDateInput, setBirthDateInput] = useState(birthDate);
  const [idInput, setIdInput] = useState(id);

  useEffect(() => {
    if (userEdit.id) {
      setNameInput(name);
      setTelephoneInput(telephone);
      setEmailInput(email);
      setCpfInput(cpf);
      setBirthDateInput(birthDate);
      setIdInput(id);
    } else {
      setNameInput("");
      setTelephoneInput("");
      setEmailInput("");
      setCpfInput("");
      setBirthDateInput("");
      setIdInput("");
    }
  }, [birthDate, cpf, email, id, name, telephone, userEdit]);

  const { post, put, get } = useRequest();
  const body = {
    name: nameInput,
    telephone: phoneInput,
    email: emailInput,
    cpf: cpfInput,
    birthDate: birthDateInput,
    id: idInput,
  };

  function handleClick(params) {
    console.log(body);
    if (params === "confirm") {
      if (
        !nameInput ||
        !phoneInput ||
        !emailInput ||
        !cpfInput ||
        !birthDateInput
      ) {
        toast.messageError("Preencha todos os campos!");
      } else {
        if (idInput) {
          put(
            `${process.env.REACT_APP_API_USER_URL}/update/${body.id}`,
            body,
            token
          ).then((response) => {
            if (response.status) {
              get(`${process.env.REACT_APP_API_USER_URL}/read`, token).then(
                (res) => {
                  setUsers(res);
                  setUsersFetched(res);
                }
              );
              toast.messageSuccess("Usuário atualizado com sucesso!");
            }
          });
        } else {
          post(
            `${process.env.REACT_APP_API_USER_URL}/create/`,
            body,
            token
          ).then((response) => {
            if (response.status) {
              get(`${process.env.REACT_APP_API_USER_URL}/read`, token).then(
                (res) => {
                  setUsers(res);
                  setUsersFetched(res);
                }
              );
              toast.messageSuccess("Usuário criado com sucesso!");
            }
          });
        }
        setModalUsr(false);
      }
    } else {
      setModalUsr(false);
    }
  }

  return (
    <div
      style={{ display: modalUsr ? "flex" : "none" }}
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
            onChange={(e) => setTelephoneInput(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="birthDateInput">Data de Nascimento:</label>
          <input
            id="birthDateInput"
            type="text"
            value={birthDateInput}
            onChange={(e) => setBirthDateInput(e.target.value)}
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
