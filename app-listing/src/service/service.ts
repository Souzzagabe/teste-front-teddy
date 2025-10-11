import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

class Service {
  chargeAmount(page: number, limit: number): Promise<any> {
    return axios.get(`${API_BASE}/users`, {
      params: { page, limit },
    });
  }

  deleteUser(id: number): Promise<any> {
    return axios.delete(`${API_BASE}/users/${id}`);
  }

  createUser(data: {
    name: string;
    salary: number;
    companyValuation: number;
  }): Promise<any> {
    return axios.post(`${API_BASE}/users`, data);
  }

  updateUser(id: number, data: {
    name: string;
    salary: number;
    companyValuation: number;
  }): Promise<any> {
    return axios.patch(`${API_BASE}/users/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
  }
}

export default new Service();
