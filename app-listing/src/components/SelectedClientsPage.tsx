import * as React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import type { SelectedClientsPageProps } from "../types";


const SelectedClientsPage: React.FC<SelectedClientsPageProps> = ({
  selectedClients,
  onClear,
}) => {
  const [stagedForRemoval, setStagedForRemoval] = React.useState<number[]>([]);

  const handleToggleStaged = (clientId: number) => {
    setStagedForRemoval((prevStaged) => {
      if (prevStaged.includes(clientId)) {
        return prevStaged.filter((id) => id !== clientId);
      } else {
        return [...prevStaged, clientId];
      }
    });
  };

  const handleClearClick = () => {
    onClear(stagedForRemoval);
    setStagedForRemoval([]);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Box sx={{ width: "100%", p: 3, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h6" component="h2" mb={3}>
        <strong>Clientes selecionados: {selectedClients.length}</strong>
      </Typography>

      <Grid container spacing={2}>
        {selectedClients && selectedClients.length > 0 ? (
          selectedClients.map((client, index) => {
            const isStaged = stagedForRemoval.includes(client.id);

            return (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                {" "}
                <Box
                  sx={{
                    position: "relative",
                    height: 140,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s, border 0.2s",
                    opacity: isStaged ? 0.6 : 1,
                    border: isStaged ? "2px solid #f37021" : "none",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
                      {client.name}
                    </Typography>
                    <Typography variant="body2" mb={0.5}>
                      Salário: {formatCurrency(client.salary)}
                    </Typography>
                    <Typography variant="body2">
                      Empresa: {client.companyValuation}
                    </Typography>
                  </Box>

                  <IconButton
                    size="small"
                    aria-label="stage for removal"
                    sx={{
                      color: "#f44336",
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                    }}
                    onClick={() => handleToggleStaged(client.id)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </Grid>
            );
          })
        ) : (
          <Grid size={{ xs: 12 }}>
            {" "}
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: 8,
              }}
            >
              <Typography>Nenhum cliente selecionado.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {selectedClients.length > 0 && (
        <Box mt={4}>
          <button
            onClick={handleClearClick}
            disabled={stagedForRemoval.length === 0}
            style={{
              width: "100%",
              padding: "12px 0",
              fontWeight: 700,
              textTransform: "none",
              border: "1px solid #f37021",
              color: "#f37021",
              borderRadius: "8px",
              backgroundColor: "transparent",
              cursor: stagedForRemoval.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            Limpar clientes selecionados
          </button>
        </Box>
      )}
    </Box>
  );
};

export default SelectedClientsPage;
