export interface Client {
  id: number;
  name: string;
  salary: number;
  company: string;
}

export interface ClientsPageProps {
  clients: Client[];
  onSelect: (clientId: number) => void;
}

export interface HeaderProps {
  currentTab: number;
  onTabChange: (event: React.SyntheticEvent | null, newValue: number) => void;
}