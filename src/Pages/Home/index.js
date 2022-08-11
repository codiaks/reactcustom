import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const list = [
    {
      key : '0',
      path : '/strapi',
      title : 'Strapi'
    },
    {
      key : '1',
      path : '/dnd',
      title : ' Drag & Drop'
    },
    {
      key : '2',
      path : '/touch_event',
      title : 'Touch Events'
    },
  ]
  return (
    <div className="mt-10">
      <ol>
        {list.map((item,i) => (
          <li key={item.key}>
             <NavLink to={item.path}>
              {item.title}
             </NavLink>
          </li>
        ))}
      </ol>
    </div>
  );
}
