import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ListingPage from "./ListingPage";
import Service from "../service/Service";

jest.mock("../service/service", () => ({
  chargeAmount: jest.fn(),
}));

jest.mock("./Header", () => (props: any) => (
  <div>
    <button onClick={() => props.onTabChange(null, 0)}>Tab 0</button>
    <button onClick={() => props.onTabChange(null, 1)}>Tab 1</button>
    <button onClick={() => props.onTabChange(null, 2)}>Logout</button>
  </div>
));

jest.mock("./ClientsPage", () => (props: any) => (
  <div>
    ClientsPage
    {props.clients.map((c: any) => (
      <button key={c.id} onClick={() => props.onSelect(c.id)}>
        Select {c.name}
      </button>
    ))}
  </div>
));

jest.mock("./SelectedClientsPage", () => (props: any) => (
  <div>
    SelectedClientsPage
    {props.selectedClients.map((c: any) => (
      <div key={c.id}>{c.name}</div>
    ))}
    <button onClick={props.onClear}>Clear</button>
  </div>
));

describe("ListingPage", () => {
  const mockClients = [
    { id: 1, name: "Client 1", salary: 1000, companyValuation: 5000 },
    { id: 2, name: "Client 2", salary: 2000, companyValuation: 10000 },
  ];

  beforeEach(() => {
    (Service.chargeAmount as jest.Mock).mockResolvedValue({
      data: { clients: mockClients },
    });
    localStorage.clear();
  });

  test("renderiza o loading e depois a lista de clientes", async () => {
    render(
      <BrowserRouter>
        <ListingPage />
      </BrowserRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("ClientsPage")).toBeInTheDocument();
    });

    expect(screen.getByText("Select Client 1")).toBeInTheDocument();
    expect(screen.getByText("Select Client 2")).toBeInTheDocument();
  });

  test("seleciona um cliente e mostra na aba selecionada", async () => {
    render(
      <BrowserRouter>
        <ListingPage />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("ClientsPage"));

    fireEvent.click(screen.getByText("Select Client 1"));

    fireEvent.click(screen.getByText("Tab 1"));

    await waitFor(() => {
      expect(screen.getByText("SelectedClientsPage")).toBeInTheDocument();
    });

    expect(screen.getByText("Client 1")).toBeInTheDocument();
    expect(screen.queryByText("Client 2")).not.toBeInTheDocument();
  });

  test("limpa clientes selecionados", async () => {
    render(
      <BrowserRouter>
        <ListingPage />
      </BrowserRouter>
    );

    await waitFor(() => screen.getByText("ClientsPage"));

    fireEvent.click(screen.getByText("Select Client 1"));
    fireEvent.click(screen.getByText("Tab 1"));

    await waitFor(() => screen.getByText("SelectedClientsPage"));

    fireEvent.click(screen.getByText("Clear"));

    expect(screen.queryByText("Client 1")).not.toBeInTheDocument();
  });
});
