import { Suspense } from "react";
import type { FC, ReactNode } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


interface SuspenseWrapperProps {
  children: ReactNode;
}

export const SuspenseWrapper: FC<SuspenseWrapperProps> = ({ children }) => (
  <Suspense
    fallback={
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
      >
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    }
  >
    {children}
  </Suspense>
);
