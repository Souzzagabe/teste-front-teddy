import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit chamado", name);

    if (!name.trim()) {
      alert("Por favor, digite o seu nome");
      return;
    }

    localStorage.setItem("token", "fake-token");
    console.log("token setado no localStorage: fake-token");

    if (onLoginSuccess) {
      console.log("Chamando callback onLoginSuccess");
      onLoginSuccess();
    } else {
      console.warn("Callback onLoginSuccess não definido");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 380,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 4 }}>
          Olá, seja bem-vindo!
        </Typography>
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Digite o seu nome:"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#f37021",
                ":hover": { backgroundColor: "#e65b00" },
                py: 1.2,
              }}
              fullWidth
            >
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
