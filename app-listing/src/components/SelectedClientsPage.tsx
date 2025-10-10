import * as React from 'react';
import { Box, Typography, Grid, Paper, IconButton, Button } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import type { Client } from '../types';

interface SelectedClientsPageProps {
  selectedClients: Client[];
  onClear: (idsToRemove: number[]) => void;
}

const SelectedClientsPage: React.FC<SelectedClientsPageProps> = ({ selectedClients, onClear }) => {
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
  
  const formatCurrency = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  return (
    <Box sx={{ width: '100%', p: 3, backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" component="h2" mb={3}>
        <strong>Clientes selecionados:</strong>
      </Typography>

      <Grid container spacing={3}>
        {selectedClients && selectedClients.length > 0 ? (
          selectedClients.map((client,index) => {
            const isStaged = stagedForRemoval.includes(client.id);

            return (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    position: 'relative',
                    opacity: isStaged ? 0.6 : 1,
                    border: isStaged ? '2px solid #f37021' : 'none',
                    transition: 'opacity 0.2s, border 0.2s',
                  }}
                >
                  <Typography variant="h6" component="div" fontWeight="bold">{client.name}</Typography>
                  <Typography variant="body2" color="text.secondary">Salário: {formatCurrency(client.salary)}</Typography>
                  <Typography variant="body2" color="text.secondary">Empresa: {client.company}</Typography>
                  <IconButton
                    size="small"
                    aria-label="stage for removal"
                    sx={{ color: 'error.main', position: 'absolute', bottom: 8, right: 8 }}
                    onClick={() => handleToggleStaged(client.id)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Paper>
              </Grid>
            );
          })
        ) : (
            <Grid size={{ xs: 12}}>
            <Typography variant="body1" align="center" sx={{ mt: 4 }}>Nenhum cliente selecionado.</Typography>
          </Grid>
        )}
      </Grid>
      
      {selectedClients.length > 0 && (
        <Button
          variant="outlined"
          fullWidth
          onClick={handleClearClick}
          disabled={stagedForRemoval.length === 0}
          sx={{ }}
        >
          Limpar clientes selecionados
        </Button>
      )}
    </Box>
  );
};

export default SelectedClientsPage;