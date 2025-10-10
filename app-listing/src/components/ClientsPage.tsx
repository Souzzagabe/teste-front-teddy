import * as React from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Button,
  Pagination,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ClientsPageProps } from "../types";

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onSelect }) => {
  const [page, setPage] = React.useState(1);
  const clientsPerPage = 16;

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const clientsOnPage = clients.slice(
    (page - 1) * clientsPerPage,
    page * clientsPerPage
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <Box sx={{ width: "100%", p: 3, backgroundColor: "#f9f9f9" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="body1">
          <strong>{clients.length} clientes disponíveis:</strong>
        </Typography>
        <Typography variant="body1">
          Clientes por página: <strong>{clientsPerPage}</strong>
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {clientsOnPage && clientsOnPage.length > 0 ? (
          clientsOnPage.map((client, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Box
                sx={{
                  height: 138,
                  borderRadius: "8px",
                  boxShadow: "none",
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                  backgroundColor: "#fff",
                  transition: "opacity 300ms ease, transform 300ms ease",
                }}
              >
                <Box sx={{ padding: 0 }}>
                  <Typography variant="subtitle1" fontWeight="bold" mb={0.5}>
                    {client.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }}>
                    Salário: {formatCurrency(client.salary)}
                  </Typography>
                  <Typography variant="body2">
                    Empresa: {client.company}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    mt: 1,
                    px: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    color="default"
                    onClick={() => onSelect(client.id)}
                  >
                    <AddCircleOutlineIcon fontSize="medium" />
                  </IconButton>

                  <IconButton size="small" color="default">
                    <EditIcon fontSize="medium" />
                  </IconButton>

                  <IconButton size="small" sx={{ color: "#f44336" }}>
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <Typography variant="body1">
                Nenhum cliente disponível.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Button
        fullWidth
        variant="outlined"
        // onClick={() => setModalOpen(true)}
        sx={{
          height: 40,
          borderRadius: "4px",
          border: "2px solid #ED6C02",
          color: "#ED6C02",
          fontWeight: "bold",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "transparent",
            borderColor: "#ED6C02",
          },
        }}
      >
        Criar cliente
      </Button>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          sx={{
            "& .Mui-selected": {
              backgroundColor: "#f37021 !important",
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ClientsPage;
