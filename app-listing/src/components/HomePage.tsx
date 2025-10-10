import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import Header from "./Header";
// import ClientsPage from "./ClientsPage";
// import SelectedClientsPage from "./SelectedClientsPage";

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleTabChange = (_event: React.SyntheticEvent | null, newValue: number) => {
    if (newValue === 2) {
      localStorage.clear();
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setCurrentTab(newValue);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [currentTab]);

  return (
    <div>
      <Header currentTab={currentTab} onTabChange={handleTabChange} />

      <Box
        sx={{
          mt: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 100px)",
        }}
      >
        {loading ? (
          <CircularProgress sx={{ color: "#f37021" }} size={40} thickness={5} />
        ) : (
          <>
            {currentTab === 0 && <Typography>Conteúdo da Aba Clientes</Typography>}
            {currentTab === 1 && (
              <Typography>Conteúdo da Aba Clientes Selecionados</Typography>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default HomePage;