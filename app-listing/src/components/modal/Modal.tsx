import * as React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import type { ClientModalProps } from "../../types";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  zIndex: 1500,
};

// Função para formatar número em moeda brasileira
const formatCurrency = (value: string) => {
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(numericValue) / 100);
};

// Função para converter valor formatado para número puro
const unformatCurrency = (value: string) => value.replace(/\D/g, "");

export const ClientModal: React.FC<ClientModalProps> = ({
  open,
  handleClose,
  onSubmit,
  initialData = {},
}) => {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [companyValue, setCompanyValue] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    salary: "",
    companyValue: "",
  });

  useEffect(() => {
    if (open) {
      setName(initialData.name ?? "");
      setSalary(initialData.salary ? formatCurrency(initialData.salary) : "");
      setCompanyValue(initialData.companyValue ? formatCurrency(initialData.companyValue) : "");
      setErrors({ name: "", salary: "", companyValue: "" });
    }
  }, [open]);

  const handleSubmit = () => {
    const newErrors = {
      name: name.trim() ? "" : "O nome é obrigatório",
      salary: salary.trim() ? "" : "O salário é obrigatório",
      companyValue: companyValue.trim() ? "" : "O valor da empresa é obrigatório",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) return;

    onSubmit({
      name,
      salary: unformatCurrency(salary),
      companyValue: unformatCurrency(companyValue),
    });
    handleClose();
  };

  const isEditMode = Boolean(initialData.name);

  return (
    <Modal open={open} onClose={handleClose} disableEnforceFocus>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            {isEditMode ? "Editar cliente" : "Criar cliente:"}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          label="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Digite o salário"
          placeholder="R$ 1.000,00"
          value={salary}
          onChange={(e) => setSalary(formatCurrency(e.target.value))}
          error={!!errors.salary}
          helperText={errors.salary}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Digite o valor da empresa"
          placeholder="R$ 1.000,00"
          value={companyValue}
          onChange={(e) => setCompanyValue(formatCurrency(e.target.value))}
          error={!!errors.companyValue}
          helperText={errors.companyValue}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#f26522", "&:hover": { bgcolor: "#d8551d" } }}
          onClick={handleSubmit}
        >
          {isEditMode ? "Salvar alterações" : "Criar cliente"}
        </Button>
      </Box>
    </Modal>
  );
};
