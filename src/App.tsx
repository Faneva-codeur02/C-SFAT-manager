import AppRoutes from "./app/router";

import { Sonner } from "@/shared/components/ui/sonner";
import { SearchProvider } from "./shared/context/SearchContext";

function App() {
  return (
    <>
      <SearchProvider>

        <AppRoutes />
        <Sonner />

      </SearchProvider>



    </>
  );
}

export default App;