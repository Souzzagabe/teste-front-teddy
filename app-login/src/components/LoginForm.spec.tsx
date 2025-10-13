import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("chama onLoginSuccess quando o nome é válido", async () => {
    const onLoginSuccess = jest.fn();
    render(<LoginForm onLoginSuccess={onLoginSuccess} />);

    const input = screen.getByLabelText("Digite o seu nome:");
    await userEvent.type(input, "Gabriel");

    const button = screen.getByRole("button", { name: /entrar/i });
    await userEvent.click(button);

    expect(onLoginSuccess).toHaveBeenCalled();
  });

  it("mostra erro se o nome estiver vazio", async () => {
    render(<LoginForm />);

    const button = screen.getByRole("button", { name: /entrar/i });
    await userEvent.click(button);

    expect(screen.getByText("O nome é obrigatório.")).toBeInTheDocument();
  });

  it("mostra erro se o nome tiver números", async () => {
    render(<LoginForm />);

    const input = screen.getByLabelText("Digite o seu nome:");
    await userEvent.type(input, "Gabriel123");

    const button = screen.getByRole("button", { name: /entrar/i });
    await userEvent.click(button);

    expect(screen.getByText("O nome não pode conter números.")).toBeInTheDocument();
  });

  it("mostra erro se o nome tiver menos de 3 letras", async () => {
    render(<LoginForm />);

    const input = screen.getByLabelText("Digite o seu nome:");
    await userEvent.type(input, "Al");

    const button = screen.getByRole("button", { name: /entrar/i });
    await userEvent.click(button);

    expect(screen.getByText("O nome deve ter pelo menos 3 letras.")).toBeInTheDocument();
  });
});
