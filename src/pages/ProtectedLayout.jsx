import { useEffect, useState } from "react";
import { Outlet, Navigate, useLoaderData } from "react-router-dom";
import CustomFetch from "../utills/CustomFetch";
import Header from "../components/Header/Header";
import Sidebar from "../components/sideBar";
import "../App.css";

export const loader = async () => {
  try {
    const res = await CustomFetch.get("/current/users", { withCredentials: true });
    return res.data;
  } catch {
    return { currentUser: null }; // don't throw
  }
};

const ProtectedLayout = () => {
  const [auth, setAuth] = useState(null);
  const user = useLoaderData();
  const signInUser = user?.currentUser?.name;
  const roleUser = user?.currentUser?.role;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await CustomFetch.get("/check-auth", { withCredentials: true });
        setAuth(res.status === 200);
      } catch (err) {
        console.log(err?.response?.data?.msg);
        setAuth(false);
      }
    };
    verifyUser();
  }, []); // 👈 only run once

  if (auth === null) return <div className="loading">Loading...</div>;
  if (!auth) return <Navigate to="/login" replace />;

  return (
    <div className="main-layout">
      <Header bgColor={"bgColor"} signInUser={signInUser} />
      <div className="wrapper">
        <Sidebar role={roleUser} />
        <main>
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
