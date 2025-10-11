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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("O nome é obrigatório.");
      setIsSubmitting(false);
      return;
    }

    if (/\d/.test(trimmedName)) {
      setError("O nome não pode conter números.");
      setIsSubmitting(false);
      return;
    }

    if (trimmedName.length < 3) {
      setError("O nome deve ter pelo menos 3 letras.");
      setIsSubmitting(false);
      return;
    }

    setError(null);

    try {
      localStorage.setItem("userName", trimmedName);
      localStorage.setItem("token", "fake-token");

      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setError("Não foi possível salvar os dados. Tente novamente.");
      console.error("Erro ao acessar o localStorage:", err);
    } finally {
      setIsSubmitting(false);
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
              error={!!error}
              helperText={error}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#f37021",
                ":hover": { backgroundColor: "#e65b00" },
                py: 1.2,
              }}
              fullWidth
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
