// url = /projects page = dashboardPage ()
// url = /project/{projectblueprintuuid}/day/{dayorder} page = DayPage (projectblueprintuuid, dayorder)
// url = /project/{projectblueprintuuid}/day/next/{dayorder}\ page = DayTransitPage (projectblueprintuuid, dayorder)
// url = /login Page = LoginPage
// url = /logout Page = LogoutPage
// url = /profile/ page = profile page ()
// url = /project/{projectblueprintuuid}/complete page = projectomplete page (projectblueprintuuid)
// url = /projects/new page = createproject page ()
// url = /projects/{blueprintuuid} page = project page ()
// url = /reg Page = Reg page 
// url = / page = Root Page

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import RootPage from './pages/RootPage';
import DashboardPage from './pages/DashboardPage';
import DayPage from './pages/DayPage';
import DayTransitPage from './pages/DayTransitPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ProfilePage from './pages/ProfilePage';
import ProjectCompletePage from './pages/ProjectCompletePage';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectPage from './pages/ProjectPage';
import RegPage from './pages/RegPage';

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* Home */}
      <Route path="/" element={<RootPage />} />

      {/* Projects list & creation */}
      <Route path="/projects" element={<DashboardPage />} />
      <Route path="/projects/new" element={<CreateProjectPage />} />
      <Route path="/projects/:blueprintuuid" element={<ProjectPage />} />

      {/* Single project flow */}
      <Route
        path="/project/:projectblueprintuuid/day/:dayorder"
        element={<DayPage />}
      />
      <Route
        path="/project/:projectblueprintuuid/day/next/:dayorder"
        element={<DayTransitPage />}
      />
      <Route
        path="/project/:projectblueprintuuid/complete"
        element={<ProjectCompletePage />}
      />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* User */}
      <Route path="/profile" element={<ProfilePage />} />

      {/* Registration */}
      <Route path="/reg" element={<RegPage />} />

      {/* Catch-all: redirect unknown paths to home (optional) */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
