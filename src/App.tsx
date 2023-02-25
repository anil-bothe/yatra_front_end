import axios from "axios";

import {
  BrowserRouter, Navigate,
  Outlet, Route, Routes
} from "react-router-dom";
import './App.css';
import AttendancePage from "./components/AttendancePage";
import Dashboard from "./components/Dashboard";
import Error404 from "./components/Error404";
import Layout from './components/Layout';
import LoginPage from './components/LoginPage';
import MyAccPage from './components/MyAccPage';
import SpotPage from './components/SpotPage';
import YatriPage from './components/YatriPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateOutlet />}>
            <Route path="/" element={Wrapper(<Dashboard />)} />
            <Route path="/yatri" element={Wrapper(<YatriPage />)} />
            <Route path="/spot" element={Wrapper(<SpotPage />)} />
            <Route path="/attendance" element={Wrapper(<AttendancePage />)} />
            <Route path="/my/acc" element={Wrapper(<MyAccPage />)} />
            <Route path="*" element={Wrapper(<Error404 />)} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function Wrapper(children:any) {
  return <Layout>{children}</Layout>
}

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function useAuth() {
  if (axios.defaults.headers.common['Authorization'] !== undefined){
    return true;
  }

  return false;
}

export default App;
