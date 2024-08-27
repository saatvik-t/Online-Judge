import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import RequireAuth from './components/RequireAuth'
import Unauthorized from './components/Unauthorized'
import Missing from './components/Missing'
import Profile from './components/Profile'
import WelcomePage from './components/Welcome'
import ProblemsPage from './components/Problems'
import ProblemDetailPage from './components/Problem'
import SubmissionsPage from './components/Submissions'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="problems" element={<ProblemsPage />} />
          <Route path="problems/:id" element={<ProblemDetailPage />} />
          <Route path="submissions" element={<SubmissionsPage />} />
        </Route>
        {/* Catch All */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { WelcomePage } from "./components/Welcome";
// import Profile from "./components/Profile";
// import Problems from "./components/Problems";
// import Submissions from "./components/Submissions";
// import LoginForm from "./components/LoginForm";
// import RegistrationForm from "./components/RegistrationForm";
// import Layout from "./components/Layout";
// import Unauthorized from "./components/Unauthorized";

// function App() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<LoginForm />} />
//       <Route path="/login" element={<LoginForm />} />  {/* Add this route */}
//       <Route path="/register" element={<RegistrationForm />} />
//       <Route path="/unauthorized" element={<Unauthorized />} />
      
//       {/* Protected Routes */}
//       <Route element={<Layout />}>
//         <Route path="/welcome" element={<WelcomePage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/problems" element={<Problems />} />
//         <Route path="/submissions" element={<Submissions />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;