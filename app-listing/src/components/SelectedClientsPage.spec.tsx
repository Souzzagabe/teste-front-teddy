import { render, screen, fireEvent } from "@testing-library/react";
import SelectedClientsPage from "./SelectedClientsPage";

describe("SelectedClientsPage", () => {
  const clients = [
    { id: 1, name: "Cliente 1", salary: 5000, company: "1000000", companyValuation: 1000000 },
    { id: 2, name: "Cliente 2", salary: 7000, company: "2000000", companyValuation: 2000000 },
  ];

  test("renderiza mensagem quando não há clientes selecionados", () => {
    render(<SelectedClientsPage selectedClients={[]} onClear={jest.fn()} />);
    expect(screen.getByText("Nenhum cliente selecionado.")).toBeInTheDocument();
  });

  test("renderiza clientes selecionados corretamente", () => {
    render(<SelectedClientsPage selectedClients={clients} onClear={jest.fn()} />);

    clients.forEach((client) => {
      expect(screen.getByText(client.name)).toBeInTheDocument();

      const salaryRegex = new RegExp(`R\\$\\s*${client.salary.toLocaleString("pt-BR").replace(/\./g, "\\.")}`);
      expect(screen.getByText(salaryRegex)).toBeInTheDocument();

      expect(screen.getByText((content) => content.replace(/\D/g, "") === client.company)).toBeInTheDocument();

      expect(screen.getByText((content) => content.replace(/\D/g, "") === client.companyValuation.toString())).toBeInTheDocument();
    });
  });

  test("chama onClear com os IDs dos clientes marcados", () => {
    const onClearMock = jest.fn();
    render(<SelectedClientsPage selectedClients={clients} onClear={onClearMock} />);

    const buttons = screen.getAllByLabelText("stage for removal");

    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    const clearButton = screen.getByRole("button", { name: /limpar clientes selecionados/i });
    fireEvent.click(clearButton);

    expect(onClearMock).toHaveBeenCalledWith([1, 2]);
  });
});
