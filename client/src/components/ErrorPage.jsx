// src/components/ErrorPage.jsx
import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <a href="/">Go Home</a>
    </div>
  );
};

export default ErrorPage;
