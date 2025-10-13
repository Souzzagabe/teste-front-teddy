import axios from "axios";
import Service from "./Service";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const API_BASE = "https://boasorte.teddybackoffice.com.br";

describe("Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar GET /users com page e limit", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: [{ id: 1 }] });

    await Service.chargeAmount(1, 10);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${API_BASE}/users`, {
      params: { page: 1, limit: 10 },
    });
  });

  it("deve chamar DELETE /users/:id", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    await Service.deleteUser(5);

    expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_BASE}/users/5`);
  });

  it("deve chamar POST /users com os dados corretos", async () => {
    const newUser = { name: "Gabriel", salary: 5000, companyValuation: 100 };
    mockedAxios.post.mockResolvedValueOnce({ data: newUser });

    await Service.createUser(newUser);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${API_BASE}/users`, newUser);
  });

  it("deve chamar PATCH /users/:id com os dados e headers corretos", async () => {
    const updated = { name: "Novo Nome", salary: 6000, companyValuation: 200 };
    mockedAxios.patch.mockResolvedValueOnce({ data: updated });

    await Service.updateUser(2, updated);

    expect(mockedAxios.patch).toHaveBeenCalledWith(
      `${API_BASE}/users/2`,
      updated,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
      }
    );
  });
});
