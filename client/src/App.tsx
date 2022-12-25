import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/container/protected-route';
import UserContextProvider from './context/userContext';
import Layout from './layout';
import LoginView from './views/auth/login';
import ManageClassView from './views/class';
import HomeView from './views/home';
import StudentsView from './views/students';
import TeacherView from './views/teacher';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Layout>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomeView />} />
              <Route path="/class" element={<ManageClassView />} />
              <Route path="/teacher" element={<TeacherView />} />
              <Route path="/student" element={<StudentsView />} />
            </Route>

            <Route path="/auth/login" element={<LoginView />} />
            <Route path="/auth" element={<Navigate to="/auth/login" />} />
          </Routes>
        </Layout>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
