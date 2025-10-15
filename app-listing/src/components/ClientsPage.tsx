import * as React from "react";
import { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { ClientsPageProps } from "../types";
import { Skeleton } from "@mui/material";
import { ClientModal } from "../components/modal/Modal";
import service from "../service/service";
import { DeleteClientModal } from "../components/modal/ModalDelete";

const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onSelect }) => {
  const [page, setPage] = React.useState(1);
  const [localClients, setLocalClients] = React.useState(clients);
  const [openModal, setOpenModal] = React.useState(false);
  const [editData, setEditData] = React.useState<any>(null);
  const [clientsPerPage, setClientsPerPage] = React.useState(16);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState<{
    id: number;
    name: string;
  } | null>(null);

  useEffect(() => {
    setLocalClients(clients);
  }, [clients]);

  const totalPages = Math.ceil(clients.length / clientsPerPage);
  const clientsOnPage = localClients.slice(
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

  const handleSubmitClient = async (data: {
    name: string;
    salary: string;
    companyValue: string;
  }) => {
    try {
      if (editData?.id) {
        await service.updateUser(editData.id, {
          name: data.name,
          salary: parseFloat(data.salary),
          companyValuation: parseFloat(data.companyValue),
        });

        setLocalClients((prev) =>
          prev.map((c) =>
            c.id === editData.id
              ? {
                  ...c,
                  name: data.name,
                  salary: parseFloat(data.salary),
                  companyValuation: parseFloat(data.companyValue),
                  company: data.companyValue,
                }
              : c
          )
        );
      } else {
        const response = await service.createUser({
          name: data.name,
          salary: parseFloat(data.salary),
          companyValuation: parseFloat(data.companyValue),
        });

        setLocalClients((prev) => [
          ...prev,
          {
            id: response.data.id,
            name: data.name,
            salary: parseFloat(data.salary),
            companyValuation: parseFloat(data.companyValue),
            company: data.companyValue,
          },
        ]);
      }

      setOpenModal(false);
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    try {
      await service.deleteUser(clientToDelete.id);

      setLocalClients((prev) => prev.filter((c) => c.id !== clientToDelete.id));

      setDeleteModalOpen(false);
      setClientToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", p: 3, backgroundColor: "#f9f9f9" }}>
      <Box
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body1" fontWeight={500}>
          <strong>{clients.length} clientes encontrados:</strong>
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" fontWeight={500}>
            Clientes por página:
          </Typography>

          <Select
            size="small"
            value={clientsPerPage}
            onChange={(e) => {
              setClientsPerPage(Number(e.target.value));
              setPage(1);
            }}
            sx={{
              height: 36,
              fontSize: 14,
              minWidth: 72,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ccc",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f37021",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#f37021",
              },
            }}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={24}>24</MenuItem>
            <MenuItem value={32}>32</MenuItem>
          </Select>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {clientsOnPage.length > 0
          ? clientsOnPage.map((client, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Box
                  sx={{
                    height: 136,
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textAlign: "center",
                    backgroundColor: "#fff",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
                      Empresa: {formatCurrency(client.companyValuation)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      mt: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => onSelect(client.id)}
                    >
                      <AddCircleOutlineIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditData({
                          ...client,
                          companyValue: client.companyValuation.toString(),
                        });
                        setOpenModal(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>

                    <IconButton
                      size="small"
                      sx={{ color: "#f44336" }}
                      onClick={() => {
                        setClientToDelete({ id: client.id, name: client.name });
                        setDeleteModalOpen(true);
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            ))
          : Array.from({ length: clientsPerPage }).map((_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Skeleton
                  variant="rectangular"
                  height={146}
                  sx={{ borderRadius: 2, mb: 2 }}
                />
              </Grid>
            ))}
      </Grid>

      <button
        style={{
          width: "100%",
          padding: "12px 0",
          fontWeight: 700,
          textTransform: "none",
          border: "1px solid #f37021",
          color: "#f37021",
          borderRadius: "8px",
          backgroundColor: "transparent",
          marginTop: "32px",
          cursor: "pointer",
        }}
        onClick={() => {
          setEditData(null);
          setOpenModal(true);
        }}
      >
        Criar cliente
      </button>

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: 1,
            },
            "& .Mui-selected": {
              backgroundColor: "#f37021 !important",
              color: "#fff",
            },
          }}
        />
      </Box>
      <ClientModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        onSubmit={handleSubmitClient}
        initialData={editData || {}}
      />
      {clientToDelete && (
        <DeleteClientModal
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteClient}
          clientName={clientToDelete.name}
        />
      )}
    </Box>
  );
};

export default ClientsPage;
