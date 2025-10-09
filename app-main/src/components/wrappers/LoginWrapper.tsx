import { lazy } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { SuspenseWrapper } from "../wrappers/SuspenseWrapper";

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
    <SuspenseWrapper>
      <RemoteLogin onLoginSuccess={handleLoginSuccess} />
    </SuspenseWrapper>
  );
};

export default LoginWrapper;
