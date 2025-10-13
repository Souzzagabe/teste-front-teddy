import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

jest.mock("@mui/material", () => {
  const actual = jest.requireActual("@mui/material");
  return {
    ...actual,
    useMediaQuery: jest.fn(),
  };
});

import { useMediaQuery } from "@mui/material";

describe("Header component", () => {
  const onTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the tabs when not mobile", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // desktop
    render(<Header currentTab={0} onTabChange={onTabChange} />);

    expect(screen.getByText("Clientes")).toBeInTheDocument();
    expect(screen.getByText("Clientes selecionados")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("renders drawer menu when mobile", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // mobile
    render(<Header currentTab={0} onTabChange={onTabChange} />);

    const menuButton = screen.getByLabelText("menu");
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Clientes Selecionados")).toBeInTheDocument();
    expect(screen.getByText("Sair")).toBeInTheDocument();
  });

  it("calls onTabChange when drawer item is clicked", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // mobile
    render(<Header currentTab={0} onTabChange={onTabChange} />);

    fireEvent.click(screen.getByLabelText("menu")); // abre o drawer
    fireEvent.click(screen.getByText("Home"));

    expect(onTabChange).toHaveBeenCalledWith(null, 0);
  });
});
