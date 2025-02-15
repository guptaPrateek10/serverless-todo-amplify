"use client";
import { Button, useAuthenticator } from "@aws-amplify/ui-react";
import React from "react";

const Header = () => {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Todo App</h1>
      {user && <p>Welcome, {user.username}</p>}
      {user && <Button onClick={signOut}>Logout</Button>}
    </div>
  );
};

export default Header;
