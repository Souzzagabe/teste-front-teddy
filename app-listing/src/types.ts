export interface Client {
  id: number;
  name: string;
  salary: number;
  company: string;
  companyValuation: number;
}

export interface ClientsPageProps {
  clients: Client[];
  onSelect: (clientId: number) => void;
  sx?: object;
}

export interface SelectedClientsPageProps {
  selectedClients: Client[];
  onClear: (idsToRemove: number[]) => void;
  onSelect?: (clientId: number) => void;
}

export interface HeaderProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent | null, newValue: number) => void;
}

export interface ClientData {
  name: string;
  salary: string;
  companyValue: string;
}

export interface ClientModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: ClientData) => void;
  initialData?: Partial<ClientData>;
}

// src/types/global.d.ts
// src/types/global.d.ts
declare var global: typeof globalThis;
