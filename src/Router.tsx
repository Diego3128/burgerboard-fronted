import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/Login";
import { Register } from "./views/auth/Register";
import { Home } from "./views/Home";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
