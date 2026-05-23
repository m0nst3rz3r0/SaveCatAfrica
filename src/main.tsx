import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./lib/auth.tsx";
import { ToastProvider } from "./lib/toast.tsx";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function Root() {
  const app = (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );

  if (!convex) {
    return <StrictMode>{app}</StrictMode>;
  }

  return (
    <StrictMode>
      <ConvexProvider client={convex}>{app}</ConvexProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
