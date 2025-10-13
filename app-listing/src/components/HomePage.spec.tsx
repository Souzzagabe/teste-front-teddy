// src/components/HomePage.spec.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

jest.mock("./Header", () => ({
  __esModule: true,
  default: ({ onTabChange }: any) => (
    <div>
      <button onClick={(e) => onTabChange(e, 0)}>Clientes</button>
      <button onClick={(e) => onTabChange(e, 1)}>Clientes Selecionados</button>
      <button onClick={(e) => onTabChange(e, 2)}>Logout</button>
    </div>
  ),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  __esModule: true,
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("HomePage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test("renderiza o loading inicialmente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("exibe conteúdo da aba Clientes após loading", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    jest.advanceTimersByTime(1000);

    const abaClientes = await screen.findByText("Conteúdo da Aba Clientes");
    expect(abaClientes).toBeInTheDocument();
  });

  test("muda para aba Clientes Selecionados corretamente", async () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    jest.advanceTimersByTime(1000);

    const btnClientesSelecionados = screen.getByText("Clientes Selecionados");
    fireEvent.click(btnClientesSelecionados);

    jest.advanceTimersByTime(1000);

    const abaSelecionados = await screen.findByText(
      "Conteúdo da Aba Clientes Selecionados"
    );
    expect(abaSelecionados).toBeInTheDocument();
  });

  test("realiza logout ao clicar na aba Logout", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.length).toBe(0);
    expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
