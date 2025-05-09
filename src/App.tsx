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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import RootPage from './pages/RootPage';
import DashboardPage from './pages/DashboardPage';
import DayPage from './pages/DayPage';
import DayTransitPage from './pages/DayTransitPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
// import ProfilePage from './pages/ProfilePage';
import ProjectCompletePage from './pages/ProjectCompletePage';
import CreateProjectPage from './pages/ProjectCreatePage';
import ProjectPage from './pages/ProjectPage';
import RegPage from './pages/RegistrationPage';

const App: React.FC = () => (
  <BrowserRouter>
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />

      <main className="flex-grow p-8 border-l border-r border-gray-200">
        <div className="container mx-auto py-10 rounded-3xl">
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

            <Route path="/login" element={<LoginPage />} />
            <Route path="/logout" element={<LogoutPage />} />

            {/* User */}
            {/*<Route path="/profile" element={<ProfilePage />} />*/}

            <Route path="/reg" element={<RegPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>

      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
