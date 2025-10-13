import type { FC } from "react";
import LoginForm from "./components/LoginForm";

interface AppProps {
  onLoginSuccess?: () => void;
}

const App: FC<AppProps> = ({ onLoginSuccess }) => {
  return <LoginForm onLoginSuccess={onLoginSuccess} />;
};

export default App;
