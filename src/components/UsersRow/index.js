/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable object-curly-newline */
import { useState } from "react";
import editar from "../../assets/icons8-editar3.svg";
import excluir from "../../assets/icons8-lixo1.svg";
import useGlobal from "../../hooks/useGlobal";
import "./style.css";
import Button from "../Button";
import useRequest from "../../hooks/useRequest";
import toast from "../../helpers/toast";

export default function UsersRow(props) {
  const { name, telephone, email, cpf, birthDate, id } = props;
  const { setUserEdit, setUsers, setModalUsr, setUsersFetched, token } =
    useGlobal();
  const { deleteRequest, get } = useRequest();

  function handleEdit() {
    setUserEdit({
      name,
      telephone,
      email,
      cpf,
      birthDate,
      id,
    });
    setModalUsr(true);
  }
  const [modalDelete, setModalDelete] = useState(false);

  function handleDelete(param) {
    if (param) {
      deleteRequest(
        `${process.env.REACT_APP_API_USER_URL}/delete/${param}`,
        token
      ).then((response) => {
        if (response) {
          get(`${process.env.REACT_APP_API_USER_URL}/read`, token).then(
            (res) => {
              if (Array.isArray(res)) {
                setUsers(res);
                setUsersFetched(res);
              } else {
                setUsers([]);
                setUsersFetched([]);
              }
            }
          );
          toast.messageSuccess("Usuário excluído com sucesso!");
        }
      });
    }
    console.log(param);
    setModalDelete(false);
  }
  return (
    <div className="table-rows">
      <div style={{ width: "25%" }}>
        <p>{name}</p>
      </div>
      <div style={{ width: "12.5%" }}>
        <p>{cpf}</p>
      </div>
      <div style={{ width: "20%" }}>
        <p>{email}</p>
      </div>
      <div style={{ width: "12.5%" }}>
        <p>{telephone}</p>
      </div>
      <div style={{ width: "16%" }}>
        <p>{birthDate}</p>
      </div>
      <button style={{ width: "7%" }}>
        <img onClick={() => handleEdit()} src={editar} alt="editar" />
      </button>
      <div style={{ width: "7%", padding: "0" }}>
        <img
          onClick={() => setModalDelete(true)}
          style={{ display: !modalDelete ? "initial" : "none" }}
          src={excluir}
          alt="excluir"
        />
        <div
          className="modal-delete"
          style={{ display: modalDelete ? "flex" : "none" }}
        >
          <Button
            onClickProp={() => handleDelete(id)}
            clsName="confirm btn"
            text="Sim"
          />
          <Button
            className="btn"
            onClickProp={() => setModalDelete(false)}
            text="Não"
          />
        </div>
      </div>
    </div>
  );
}
