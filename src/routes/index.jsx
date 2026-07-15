import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ExecutiveDashboard from "@/pages/ExecutiveDashboard";
import EVM from "@/pages/EVM";
import ExecutionDashboardPage from "@/pages/ExecutionDashboard";
import Materials from "@/pages/Materials";
import SiteDashboardPage from "@/pages/SiteDashboard";
import SiteReports from "@/pages/SiteReports";
import Gantt from "@/pages/Gantt";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/executive" element={<ExecutiveDashboard />} />

        <Route path="/dashboard/evm" element={<EVM />} />

        <Route
          path="/dashboard/execution"
          element={<ExecutionDashboardPage />}
        />
        <Route path="/dashboard/materials" element={<Materials />} />

        <Route path="/dashboard/site" element={<SiteDashboardPage />} />

        <Route path="/dashboard/site-reports" element={<SiteReports />} />
        <Route path="/dashboard/gantt" element={<Gantt />} />
      </Routes>
    </BrowserRouter>
  );
}
