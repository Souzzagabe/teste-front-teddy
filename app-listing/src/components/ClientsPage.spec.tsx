import { render, screen, fireEvent, within } from "@testing-library/react";
import ClientsPage from "./ClientsPage";
import service from "../service/service";

jest.mock("../components/modal/Modal", () => ({
  ClientModal: ({ open, handleClose, onSubmit }: any) =>
    open ? (
      <div data-testid="client-modal">
        <button
          onClick={() =>
            onSubmit({ name: "João", salary: "1000", companyValue: "2000" })
          }
        >
          Submit
        </button>
        <button onClick={handleClose}>Close Modal</button>
      </div>
    ) : null,
}));

jest.mock("../components/modal/ModalDelete", () => ({
  DeleteClientModal: ({ open, onClose, onConfirm, clientName }: any) =>
    open ? (
      <div data-testid="delete-modal">
        <span>{clientName}</span>
        <button onClick={onConfirm} data-testid="confirm-delete">
          Confirm Delete
        </button>
        <button onClick={onClose}>Close Delete Modal</button>
      </div>
    ) : null,
}));

jest.mock("../service/service", () => ({
  deleteUser: jest.fn(),
  createUser: jest.fn().mockResolvedValue({ data: { id: 3 } }),
  updateUser: jest.fn().mockResolvedValue({}),
}));

describe("ClientsPage", () => {
  const mockOnSelect = jest.fn();

  const clientsMock = [
    {
      id: 1,
      name: "Gabriel",
      salary: 5000,
      companyValuation: 10000,
      company: "Empresa A",
    },
    {
      id: 2,
      name: "Maria",
      salary: 3000,
      companyValuation: 5000,
      company: "Empresa B",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza corretamente a lista de clientes", () => {
    render(<ClientsPage clients={clientsMock} onSelect={mockOnSelect} />);
    expect(screen.getByText("Gabriel")).toBeInTheDocument();
    expect(screen.getByText("Maria")).toBeInTheDocument();
  });

  it("abre modal de criação ao clicar no botão 'Criar cliente'", () => {
    render(<ClientsPage clients={clientsMock} onSelect={mockOnSelect} />);
    const createButton = screen.getByText("Criar cliente");
    fireEvent.click(createButton);
    expect(screen.getByTestId("client-modal")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("abre modal de edição ao clicar no ícone de editar", () => {
    render(<ClientsPage clients={clientsMock} onSelect={mockOnSelect} />);
    const editButtons = screen
      .getAllByRole("button")
      .filter((btn) =>
        btn
          .querySelector("svg")
          ?.getAttribute("data-testid")
          ?.includes("EditIcon")
      );
    fireEvent.click(editButtons[0]);
    expect(screen.getByTestId("client-modal")).toBeInTheDocument();
  });

  it("abre modal de exclusão e confirma exclusão", async () => {
    render(<ClientsPage clients={clientsMock} onSelect={mockOnSelect} />);
    const deleteButtons = screen
      .getAllByRole("button")
      .filter((btn) =>
        btn
          .querySelector("svg")
          ?.getAttribute("data-testid")
          ?.includes("DeleteIcon")
      );
    fireEvent.click(deleteButtons[0]);

    const modal = await screen.findByTestId("delete-modal");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText("Gabriel")).toBeInTheDocument();

    const confirmButton = within(modal).getByTestId("confirm-delete");
    fireEvent.click(confirmButton);
    expect(service.deleteUser).toHaveBeenCalledWith(1);
  });

  it("chama onSelect ao clicar no botão de adicionar", () => {
    render(<ClientsPage clients={clientsMock} onSelect={mockOnSelect} />);
    const addButtons = screen
      .getAllByRole("button")
      .filter((btn) =>
        btn
          .querySelector("svg")
          ?.getAttribute("data-testid")
          ?.includes("AddCircleOutlineIcon")
      );
    fireEvent.click(addButtons[0]);
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });
});
