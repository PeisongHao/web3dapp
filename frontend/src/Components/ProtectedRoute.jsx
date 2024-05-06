import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    // 用户未登录，重定向到登录页面
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;