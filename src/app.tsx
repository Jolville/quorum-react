import { Suspense } from "react";
import "./index.css";
import { Nav } from "./nav";
import { Outlet } from "react-router-dom";
import { client } from "./apollo";
import { ApolloProvider } from "@apollo/client";
import { ToastProvider } from "./components/toast";

function App() {
  return (
    <ApolloProvider client={client}>
      <ToastProvider>
        <div className="flex flex-col h-screen w-screen bg-gray-100">
          <Nav />
          <Suspense fallback={<>Loading...</>}>
            <Outlet />
          </Suspense>
        </div>
      </ToastProvider>
    </ApolloProvider>
  );
}

export default App;
