/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useState } from "react";
import useGlobal from "../../hooks/useGlobal";
import useRequest from "../../hooks/useRequest";
import Button from "../Button";
import "./style.css";
import toast from "../../helpers/toast";

export default function ModalOrders(props) {
  const { users, setOrders, setOrdersFetched } = useGlobal();
  const { showModal, setShowModal } = props;

  const [user, setUser] = useState("");
  const [total_value, setTotal_value] = useState("");
  const [description, setDescription] = useState("");

  const { post, get } = useRequest();

  function formatCurrency(value) {
    return !value.includes(".") && !value.includes(",")
      ? Number(`${value}00`)
      : Number(value.replace(".", "").replace(",", ""));
  }

  function handleClick(params) {
    if (params === "confirm") {
      if (!user || !total_value || !description) {
        toast.messageError("Preencha todos os campos!");
      } else if (isNaN(formatCurrency(total_value))) {
        toast.messageError("Preencha o valor corretamente!");
      } else {
        post("1/create-order", {
          idUser: Number(user),
          totalValue: formatCurrency(total_value),
          description,
        }).then((response) => {
          if (response) {
            toast.messageSuccess("Pedido criado com sucesso!");
            setShowModal(false);
            setUser("");
            setTotal_value("");
            setDescription("");
            get("1/orders").then((ordersResponse) => {
              console.log(ordersResponse);
              setOrders(ordersResponse);
              setOrdersFetched(ordersResponse);
            });
          }
        });
      }
    } else {
      setUser("");
      setTotal_value("");
      setDescription("");
      setShowModal(false);
    }
  }

  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className="container-modal"
    >
      <div className="modal">
        <div>
          <label htmlFor="clients"> Usuario:</label>
          <select
            id="clients"
            name="clientes"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            <option value="">Selecione</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="total_value">Valor Total</label>
          <input
            id="total_value"
            type="text"
            value={total_value}
            placeholder="Valores com virgula. Ex.: 100,00"
            onChange={(e) => setTotal_value(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Descrição:</label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
