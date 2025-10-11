import { lazy } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";


interface RemoteLoginProps {
  onLoginSuccess?: () => void;
}

const RemoteLogin = lazy(() => import("remote_login/Login")) as unknown as FC<RemoteLoginProps>;

const LoginWrapper: FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/home");
  };

  return (

      <RemoteLogin onLoginSuccess={handleLoginSuccess} />

  );
};

export default LoginWrapper;
