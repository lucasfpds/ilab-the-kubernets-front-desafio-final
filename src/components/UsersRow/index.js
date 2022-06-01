/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
import { useEffect, useState } from "react";
import editar from "../../assets/icons8-editar3.svg";
import excluir from "../../assets/icons8-lixo1.svg";
import { usuarios } from "../../utils/arrays";
import useGlobal from "../../hooks/useGlobal";
import Modal from "../Modal/Modal";
import "./style.css";

export default function UsersRow(props) {
  const { name, phone, email, cpf, birth_date, id } = props;
  const { openModal, modalText, setOpenModal, userEdit, setUserEdit } =
    useGlobal();

  function handleEdit() {
    setUserEdit({ name, phone, email, cpf, birth_date, id });
    setOpenModal(true);
    const object = usuarios.filter((user) => user.phone === phone);
    console.log(object);
  }
  const [modalDelete, setModalDelete] = useState(false);

  function handleDelete(param) {
    console.log(param);
    setModalDelete(false);
  }
  return (
    <div className="table-rows">
      <p style={{ width: "25%" }}>{name}</p>
      <p style={{ width: "10%" }}>{cpf}</p>
      <p style={{ width: "25%" }}>{email}</p>
      <p style={{ width: "10%" }}>{phone}</p>
      <p style={{ width: "16%" }}>{birth_date}</p>
      <button style={{ width: "7%" }}>
        <img onClick={() => handleEdit()} src={editar} alt="editar" />
      </button>
      <button style={{ width: "7%" }}>
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
          <button className="confirm btn">
            <p onClick={() => handleDelete(id)}>Sim</p>
          </button>
          <button className="btn">
            <p onClick={() => setModalDelete(false)}>Não</p>
          </button>
        </div>
      </button>
    </div>
  );
}
