import AppRoutes from "./app/routes/AppRoutes";
import { SearchProvider } from "./shared/context/SearchContext";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <SearchProvider>

        <AppRoutes />
        <Toaster

          position="top-right"

          richColors

          closeButton

        />

      </SearchProvider>



    </>
  );
}

export default App;