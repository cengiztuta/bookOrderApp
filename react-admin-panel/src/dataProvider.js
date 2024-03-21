import { fetchUtils } from "react-admin";
const apiUrl = "http://localhost:3000";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
    options.headers.set("Content-Type", "application/json");
  }

  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  getList: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "GET",
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then(({ json }) => ({
      data: json.map((item) => ({ id: item.id, ...item })),
      total: json.length,
    })),

  getOne: async (resource, params) => {
    try {
      const url = `${apiUrl}/${resource}/${params.id}`;

      const { json } = await httpClient(url, {
        method: "GET",
      });

      return { data: { ...json, id: params.id } };
    } catch (error) {
      console.log("getOne error: ", error);
      throw error;
    }
  },

  update: async (resource, params) => {
    try {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const { json } = await httpClient(url, {
        method: "PUT",
        body: JSON.stringify(params.data),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      return { data: json };
    } catch (error) {
      console.error("update error: ", error);
      throw error;
    }
  },
  updateMany: async (resource, params) => {
    try {
      const { data } = params;
      const updatePromises = data.map(async (item) => {
        const url = `${apiUrl}/${resource}/${item.id}`;
        const response = await httpClient(url, {
          method: "PUT",
          body: JSON.stringify(item),
          headers: new Headers({ "Content-Type": "application/json" }),
        });
        return response.json;
      });

      const updatedData = await Promise.all(updatePromises);

      return { data: updatedData };
    } catch (error) {
      console.error("updateMany error: ", error);
      throw error;
    }
  },
  create: (resource, params) =>
    httpClient(`${apiUrl}/book`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: new Headers({ "Content-Type": "application/json" }),
    }).then(({ json }) => ({
      data: { id: json.id, ...json },
    })),

  delete: async (resource, params) => {
    try {
      const url = `${apiUrl}/${resource}/${params.id}`;
      const { json } = await httpClient(url, {
        method: "DELETE",
      });

      return { data: json };
    } catch (error) {
      console.error("delete error: ", error);
      throw error;
    }
  },

  deleteMany: async (resource, params) => {
    try {
      const url = `${apiUrl}/${resource}`;
      const { json } = await httpClient(url, {
        method: "DELETE",
        body: JSON.stringify({ ids: params.ids }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      return { data: json };
    } catch (error) {
      console.error("deleteMany error: ", error);
      throw error;
    }
  },
};
export default dataProvider;
