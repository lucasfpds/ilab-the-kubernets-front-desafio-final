/* eslint-disable operator-linebreak */
import useGlobal from "./useGlobal";
import toast from "../helpers/toast";

export default function useRequest() {
  const { token } = useGlobal();

  async function get(route, withToken) {
    const config = withToken ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await fetch(
        route,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: null,
        }
      );
      const dataObj = await response.json();
      if (!response.ok) {
        throw new Error(dataObj.message);
      }
      return dataObj;
    } catch (error) {
      console.log(error);
      !error.message.includes("Unexpected end of JSON input") &&
        toast.messageError(error.message);
    }
    return [];
  }

  async function post(route, body, withToken) {
    const config = withToken ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await fetch(
        route,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: JSON.stringify(body),
        }
      );

      const dataObj = await response.json();
      if (!response.ok && response.status >= 300) {
        throw new Error(dataObj.message);
      }
      return { status: response.ok, ...dataObj };
    } catch (error) {
      console.log(error);
      !error.message.includes("Unexpected end of JSON input") &&
        toast.messageError(error.message);
    }
    return [];
  }

  async function put(route, body, withToken) {
    const config = withToken ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await fetch(
        route,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: JSON.stringify(body),
        }
      );
      const dataObj = await response.json();
      console.log(dataObj);
      if (!response.ok) {
        throw new Error(dataObj.message);
      }
      return { ...dataObj, status: response.ok };
    } catch (error) {
      console.log(error);
      toast.messageError(error.message);
    }
  }

  async function deleteRequest(route, withToken) {
    const config = withToken ? { Authorization: `Bearer ${token}` } : {};
    try {
      const response = await fetch(
        route,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: null,
        }
      );
      if (!response.ok) {
        const dataObj = await response.json();
        throw new Error(dataObj.message);
      }
      return { status: response.ok };
    } catch (error) {
      console.log(error);
      toast.messageError(error.message);
    }
  }

  return {
    get,
    post,
    put,
    deleteRequest,
  };
}
