/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";
import { useLocation, useHistory } from "react-router-dom";
import { usuarios } from "../utils/arrays";

function useGlobalProvider() {
  const history = useHistory();
  const [token, setToken, removeToken] = useLocalStorage("token", "");
  const [header, setHeader] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState(usuarios);
  const [userEdit, setUserEdit] = useState({});

  return {
    token,
    setToken,
    removeToken,
    header,
    setHeader,
    openModal,
    setOpenModal,
    users,
    setUsers,
    userEdit,
    setUserEdit,
  };
}

export default useGlobalProvider;
