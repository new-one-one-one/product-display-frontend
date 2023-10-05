import React from "react";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, Container } from "@mui/material";
import { ToastProvider } from "react-toast-notifications";
import { ProductListingPage } from "./pages/productsListing";

function App() {
  const theme = useTheme();
  return (
    <ToastProvider>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <div className="App">
            <ProductListingPage />
          </div>
        </Container>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
