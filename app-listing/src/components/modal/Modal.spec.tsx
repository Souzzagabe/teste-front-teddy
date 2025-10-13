import { render, screen, fireEvent } from "@testing-library/react";
import { ClientModal } from "./Modal";

describe("ClientModal", () => {
  const mockHandleClose = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const openModal = (props = {}) =>
    render(
      <ClientModal
        open={true}
        handleClose={mockHandleClose}
        onSubmit={mockOnSubmit}
        {...props}
      />
    );

  it("renderiza corretamente no modo criação", () => {
    openModal();

    expect(screen.getByText("Criar cliente:")).toBeInTheDocument();
    expect(screen.getByLabelText("Digite o nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Digite o salário")).toBeInTheDocument();
    expect(screen.getByLabelText("Digite o valor da empresa")).toBeInTheDocument();
  });

  it("renderiza corretamente no modo edição", () => {
    openModal({
      initialData: {
        name: "Gabriel",
        salary: "500000",       // 500.000 centavos = R$ 5.000,00
        companyValue: "1000000",// 1.000.000 centavos = R$ 10.000,00
      },
    });

    expect(screen.getByText("Editar cliente")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Gabriel")).toBeInTheDocument();

    // Verifica valores monetários via regex
    const salaryInput = screen.getByLabelText("Digite o salário") as HTMLInputElement;
    const companyValueInput = screen.getByLabelText("Digite o valor da empresa") as HTMLInputElement;

    const moneyRegex = /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/;

    expect(salaryInput.value).toMatch(moneyRegex);
    expect(companyValueInput.value).toMatch(moneyRegex);
  });

  it("mostra erros ao tentar enviar sem preencher os campos", () => {
    openModal();

    const submitButton = screen.getByRole("button", { name: /criar cliente/i });
    fireEvent.click(submitButton);

    expect(screen.getByText("O nome é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O salário é obrigatório")).toBeInTheDocument();
    expect(screen.getByText("O valor da empresa é obrigatório")).toBeInTheDocument();
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("formata valores monetários corretamente ao digitar", () => {
    openModal();

    const salaryInput = screen.getByLabelText("Digite o salário") as HTMLInputElement;
    fireEvent.change(salaryInput, { target: { value: "1000" } });

    const moneyRegex = /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/;
    expect(salaryInput.value).toMatch(moneyRegex);
  });

  it("chama onSubmit com os valores corretos ao enviar", () => {
    openModal();

    fireEvent.change(screen.getByLabelText("Digite o nome"), {
      target: { value: "João" },
    });

    fireEvent.change(screen.getByLabelText("Digite o salário"), {
      target: { value: "500000" },
    });

    fireEvent.change(screen.getByLabelText("Digite o valor da empresa"), {
      target: { value: "1000000" },
    });

    fireEvent.click(screen.getByRole("button", { name: /criar cliente/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: "João",
      salary: "500000",
      companyValue: "1000000",
    });

    expect(mockHandleClose).toHaveBeenCalled();
  });

  it("fecha o modal ao clicar no botão de fechar", () => {
    openModal();

    // Seleciona o botão que contém o CloseIcon (SVG)
    const closeButton = screen
      .getAllByRole("button")
      .find((btn) => btn.querySelector("svg"));

    expect(closeButton).toBeDefined();
    if (closeButton) fireEvent.click(closeButton);

    expect(mockHandleClose).toHaveBeenCalled();
  });
});
