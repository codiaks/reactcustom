import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="">
      <NavLink to={'/strapi'}>
        strapi
      </NavLink>
      <NavLink to={'/dnd'}>
        Drag & Drop
      </NavLink>
    </div>
  );
}
