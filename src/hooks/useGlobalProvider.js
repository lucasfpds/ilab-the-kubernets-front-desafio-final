/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [header, setHeader] = useState(true);
  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState([]);
  const [modalMsg, setModalMsg] = useState(false);
  const [modalUsr, setModalUsr] = useState(false);
  const orderRef = useRef({});
  const [userEdit, setUserEdit] = useState({
    name: "",
    telephone: "",
    email: "",
    cpf: "",
    birthDate: "",
    id: "",
  });

  const [orders, setOrders] = useState([]);
  const [ordersFetched, setOrdersFetched] = useState([]);

  return {
    token,
    setToken,
    removeToken,
    header,
    setHeader,
    users,
    setUsers,
    userEdit,
    setUserEdit,
    orders,
    setOrders,
    modalMsg,
    setModalMsg,
    orderRef,
    modalUsr,
    setModalUsr,
    usersFetched,
    setUsersFetched,
    ordersFetched,
    setOrdersFetched,
  };
}

export default useGlobalProvider;
