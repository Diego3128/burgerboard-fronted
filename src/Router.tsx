import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { AuthLayout } from "./layouts/AuthLayout";
import { Login } from "./views/auth/Login";
import { Register } from "./views/auth/Register";
import { Home } from "./views/Home";
import { RequireAuth } from "./views/guards/RequireAuth";
import { PublicAccess } from "./views/guards/PublicAccess";
import { Orders } from "./views/admin/Orders";
import { Products } from "./views/admin/Products";
import { AdminLayout } from "./layouts/AdminLayout";
import { RestrictAccessByRole } from "./views/guards/RestrictAccessByRole";

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>
        {/* protected routes */}
        <Route element={<RequireAuth />}>{/*RequireAuth checks for user authentication*/}
          <Route path="/" element={<Layout />}>
            <Route element={<RestrictAccessByRole allowAdmin={false} redirectTo="/admin" />}>
              <Route index element={<Home />} />
            </Route>
          </Route>

          {/* admin routes */}
          <Route element={<RestrictAccessByRole allowAdmin={true} redirectTo="/" />}>
            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<Orders />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Route>

        {/* public routes */}
        <Route element={<PublicAccess />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>

      </Routes>

    </BrowserRouter>
  );
};
