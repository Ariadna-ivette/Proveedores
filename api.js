import axios from "axios";
import store from "../store";
import router from "@/router";


const instance = axios.create({
    baseURL: "http://localhost:",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

export default instance;

export class API {
    constructor() {
      this._axios = instance;
    }
    get axios() {
      return this._axios;
    }
    set axios(axios) {
      this._axios = axios;
    }

    GetProveedor({ id }) {
        return this.axios.get(`/proveedores`, {
          params: {
            id,
          },
        });
      }
    GetProveedores({ nombre, id }) {
        return this.axios.get("/proveedores", {
          params: {
            nombre,
            id
        }

        });
    }
    CreateProveedor({ proveedor }) {
        return this.axios.post(`/proveedores`, proveedor);
      }
    UpdateProveedor({ proveedor }) {
        return this.axios.put(`/proveedores/${proveedor.id}`, proveedor);
      }
    DeleteProveedor({ id }) {
        return this.axios.delete(`/proveedores/${id}`);
      }
}