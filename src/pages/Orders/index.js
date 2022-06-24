/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import "./styles.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button";
import useGlobal from "../../hooks/useGlobal";
import OrdersRow from "../../components/OrdersRow/Index";

import ModalOrders from "../../components/ModalOrders/Index";
import useRequest from "../../hooks/useRequest";

export default function Orders() {
  const history = useHistory();
  const {
    orders,
    ordersFetched,
    setOrdersFetched,
    setOrders,
    setUsers,
    setUsersFetched,
    users,
    noContent,
    setNoContent,
    token,
  } = useGlobal();

  const [showModal, setShowModal] = useState(false);
  const [orderSearch, setOrderSearch] = useState("");
  const { get } = useRequest();

  function handleSearch(input) {
    const value = input.toLowerCase();

    const ordersFiltered = ordersFetched.filter(
      (o) =>
        o.status.toLowerCase().includes(value.toLowerCase()) ||
        dateFormated(o.ordersDate).includes(value) ||
        o.description.toLowerCase().includes(value) ||
        newTotalValue(o.totalValue).includes(value) ||
        findUser(o.idUser).toLowerCase().includes(value) ||
        String(o.idOrder).includes(value)
    );
    console.log(ordersFiltered);
    setOrders(ordersFiltered);
  }

  useEffect(() => {
    setNoContent("Aguarde...");
    handleSearch(orderSearch);
  }, [orderSearch]);

  useEffect(() => {
    get(`${process.env.REACT_APP_API_USER_URL}/read`, token)
      .then((usersResponse) => usersResponse)
      .then((usersResponse) => {
        get(`${process.env.REACT_APP_API_ORDER_URL}/orders`, token).then(
          (ordersResponse) => {
            if (Array.isArray(usersResponse)) {
              setUsers(usersResponse);
              setUsersFetched(usersResponse);
            } else {
              setUsers([]);
              setUsersFetched([]);
            }
            console.log(ordersResponse);
            ordersResponse.length === 0 &&
              setNoContent("Nenhum pedido encontrado");
            setOrders(ordersResponse);
            setOrdersFetched(ordersResponse);
          }
        );
      });
  }, []);

  function findUser(id) {
    const user = users.filter((u) => u.id === id);
    return user[0] ? user[0].name : "Não encontrado";
  }

  function dateFormated(date) {
    const dateFormat = new Date(date);
    return `${
      dateFormat.getDate() < 10
        ? `0${dateFormat.getDate()}`
        : `${dateFormat.getDate()}`
    }/${
      dateFormat.getMonth() + 1 < 10
        ? `0${dateFormat.getMonth() + 1}`
        : dateFormat.getMonth() + 1
    }/${dateFormat.getFullYear()}`;
  }

  function newTotalValue(total_value) {
    const formated = String(total_value / 100).replace(".", ",");
    return formated.split(",")[1].length === 1 ? `${formated}0` : formated;
  }

  return (
    <>
      <div className="container-orders">
        <Button
          onClickProp={() => setShowModal(true)}
          clsName="btn btn-create-order"
          text="Criar Pedido"
        />
        <div className="div-search">
          <label htmlFor="search">Pesquisar: </label>
          <input
            id="search"
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
          />
        </div>
        <div className="table-title">
          <h3 style={{ width: "28%" }}>Usuario</h3>
          <h3 style={{ width: "11%" }}>Valor Total</h3>
          <h3 style={{ width: "32%" }}>Descrição</h3>
          <h3 style={{ width: "9%" }}>Data do Pedido</h3>
          <h3 style={{ width: "9%" }}>Status</h3>
          <h3 style={{ width: "11%" }}>Mensageria</h3>
        </div>
      </div>

      {orders[0] ? (
        <div className="container-rows">
          {orders.map((order) => (
            <OrdersRow
              key={order.idOrder}
              id={order.idOrder}
              user={findUser(order.idUser)}
              total_value={order.totalValue}
              description={order.description}
              date={order.ordersDate}
              status={order.status}
              statusEmail={order.statusEmail}
            />
          ))}
        </div>
      ) : (
        <h1>{noContent}</h1>
      )}
      <Button
        onClickProp={() => history.push("/options")}
        clsName="btn btn-prev"
        text="Voltar"
      />
      <ModalOrders showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}
