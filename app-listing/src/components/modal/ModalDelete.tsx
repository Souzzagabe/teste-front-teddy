import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DeleteClientModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  clientName: string;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: 'center'
};

export const DeleteClientModal: React.FC<DeleteClientModalProps> = ({
  open,
  onClose,
  onConfirm,
  clientName
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            Excluir cliente:
          </Typography>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography mb={3}>
          Você está prestes a excluir o cliente: <strong>{clientName}</strong>
        </Typography>
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#F26522', '&:hover': { backgroundColor: '#d6551d' } }}
          onClick={onConfirm}
        >
          Excluir cliente
        </Button>
      </Box>
    </Modal>
  );
};
