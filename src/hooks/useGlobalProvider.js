/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useLocalStorage } from "react-use";

function useGlobalProvider() {
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState({ id: 1, name: "" });
  const [usersFetched, setUsersFetched] = useState([]);
  const [modalMsg, setModalMsg] = useState(false);
  const [modalUsr, setModalUsr] = useState(false);
  const [noContent, setNoContent] = useState(false);
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
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  return {
    token,
    setToken,
    removeToken,
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
    loading,
    setLoading,
    loadingRef,
    admin,
    setAdmin,
    noContent,
    setNoContent,
  };
}

export default useGlobalProvider;
