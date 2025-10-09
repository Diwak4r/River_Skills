import React from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AppProviders } from "@/components/AppProviders";

// Pages
import RiverSkills20Home from "./pages/RiverSkills20Home";
import Courses from "./pages/Courses";
import Resources from "./pages/Resources";
import AITools from "./pages/AITools";
import Chat from "./pages/Chat";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <ErrorBoundary>
      <AppProviders>
        <Routes>
          <Route path="/" element={<RiverSkills20Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/ai-tools" element={<AITools />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProviders>
    </ErrorBoundary>
  );
};

export default App;
