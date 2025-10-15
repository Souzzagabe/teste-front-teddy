import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Header from "./Header";
import ClientsPage from "./ClientsPage";
import SelectedClientsPage from "./SelectedClientsPage";
import type { Client } from "../types";
import Service from "../service/Service";

const ListingPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [allClients, setAllClients] = useState<Client[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectClient = (clientId: number) => {
    if (!selectedIds.includes(clientId)) {
      setSelectedIds((prevIds) => [...prevIds, clientId]);
    }
  };

  const handleClearSelected = () => {
    setSelectedIds([]);
  };

  const handleTabChange = (
    _event: React.SyntheticEvent | null,
    newValue: number
  ) => {
    if (newValue === 2) {
      localStorage.clear();
      navigate("/login", { replace: true });
      return;
    }
    setLoading(true);
    setCurrentTab(newValue);
  };

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);

        const response = await Service.chargeAmount(1, 50);
        const rawData = response.data.clients;

        const clients: Client[] = rawData.map((item: any) => ({
          id: item.id,
          name: item.name ?? "Sem nome",
          salary: item.salary ?? 0,
          companyValuation: item.companyValuation ?? 0,
        }));

        setAllClients(clients);
      } catch (error) {
        console.error("❌ Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [currentTab]);

  const availableClients = allClients.filter(
    (client) => !selectedIds.includes(client.id)
  );
  const selectedClients = allClients.filter((client) =>
    selectedIds.includes(client.id)
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          px: 2,
        }}
      >
        <Header currentTab={currentTab} onTabChange={handleTabChange} />

        <Box
          sx={{
            mt: "100px",
            minHeight: "calc(100vh - 100px)",
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 100px)",
              }}
            >
              <CircularProgress
                sx={{ color: "#f37021" }}
                size={40}
                thickness={5}
              />
            </Box>
          ) : (
            <>
              {currentTab === 0 && (
                <ClientsPage
                  clients={availableClients}
                  onSelect={handleSelectClient}
                />
              )}

              {currentTab === 1 && (
                <SelectedClientsPage
                  selectedClients={selectedClients}
                  onClear={handleClearSelected}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ListingPage;
