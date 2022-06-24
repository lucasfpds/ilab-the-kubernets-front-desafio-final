/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import "./styles.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UsersRow from "../../components/UsersRow";
import useGlobal from "../../hooks/useGlobal";
import Button from "../../components/Button";
import ModalUsers from "../../components/ModalUsers/Index";
import useRequest from "../../hooks/useRequest";

export default function Users() {
  const history = useHistory();
  const {
    users,
    setUserEdit,
    setUsers,
    setModalUsr,
    usersFetched,
    setUsersFetched,
    noContent,
    setNoContent,
    token,
  } = useGlobal();
  const { get } = useRequest();

  useEffect(() => {
    setNoContent("Aguarde...");
    get(`${process.env.REACT_APP_API_USER_URL}/read`, token).then(
      (response) => {
        console.log(response);
        setUsers(response);
        setUsersFetched(response);
        response.length === 0 && setNoContent("Não há usuários cadastrados");
      }
    );
  }, []);

  const [searchUsers, setSearchUsers] = useState("");

  function handleSearch(input) {
    const value = input.toLowerCase();
    const usersFiltered = usersFetched.filter(
      (u) =>
        u.name.toLowerCase().includes(value.toLowerCase()) ||
        u.email.includes(value) ||
        u.telephone.includes(value) ||
        u.cpf.includes(value) ||
        u.birthDate.includes(value) ||
        String(u.id).includes(value)
    );
    console.log(usersFiltered);
    setUsers(usersFiltered);
  }

  useEffect(() => {
    handleSearch(searchUsers);
  }, [searchUsers]);

  function handleCreate() {
    setUserEdit({});
    setModalUsr(true);
  }

  return (
    <>
      <div className="container-users">
        <Button
          onClickProp={handleCreate}
          clsName="btn btn-create-user"
          text="Cadastrar Usuario"
        />
        <div className="div-search">
          <label htmlFor="search">Pesquisar: </label>
          <input
            id="search"
            type="text"
            value={searchUsers}
            onChange={(e) => setSearchUsers(e.target.value)}
          />
        </div>
        <div className="table-title">
          <h3 style={{ width: "25%" }}>Nome</h3>
          <h3 style={{ width: "12.5%" }}>CPF</h3>
          <h3 style={{ width: "20%" }}>Email</h3>
          <h3 style={{ width: "12.5%" }}>Telefone</h3>
          <h3 style={{ width: "16%" }}>Data Nascimento</h3>
          <h3 style={{ width: "7%" }}>Editar</h3>
          <h3 style={{ width: "7%" }}>Excluir</h3>
        </div>
      </div>
      {users[0] ? (
        <div className="container-rows">
          {users.map((user) => (
            <UsersRow
              key={user.id}
              name={user.name}
              telephone={user.telephone}
              email={user.email}
              cpf={user.cpf}
              birthDate={user.birthDate}
              id={user.id}
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
      <ModalUsers />
    </>
  );
}
