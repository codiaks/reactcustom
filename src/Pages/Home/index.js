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
    {
      key : '3',
      path : '/antd_menu_horizontal',
      title : 'Antd Menu Horizontal'
    },
    {
      key : '4',
      path : '/csv_download',
      title : 'CSV download'
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
