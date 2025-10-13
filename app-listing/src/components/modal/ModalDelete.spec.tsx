import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteClientModal } from "./ModalDelete";

describe("DeleteClientModal", () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();
  const clientName = "Gabriel";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const openModal = (props = {}) =>
    render(
      <DeleteClientModal
        open={true}
        onClose={mockOnClose}
        onConfirm={mockOnConfirm}
        clientName={clientName}
        {...props}
      />
    );

  it("renderiza corretamente com o nome do cliente", () => {
    openModal();

    expect(screen.getByText("Excluir cliente:")).toBeInTheDocument();
    expect(screen.getByText(`Você está prestes a excluir o cliente:`, { exact: false })).toBeInTheDocument();
    expect(screen.getByText(clientName)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /excluir cliente/i })).toBeInTheDocument();
  });

  it("chama onClose ao clicar no botão de fechar", () => {
    openModal();

    const closeButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector("svg"));

    expect(closeButton).toBeDefined();
    if (closeButton) fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("chama onConfirm ao clicar no botão de excluir", () => {
    openModal();

    const confirmButton = screen.getByRole("button", { name: /excluir cliente/i });
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });
});
