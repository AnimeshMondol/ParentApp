import { createBrowserRouter } from "react-router";
import rootlayout from "../layouts/rootlayout";
import Home from "../pages/home/home/Home";
import Blogs from "../pages/Blogs/Blogs";
import CalmTool from "../pages/CalmTool/CalmTool";
import Aboutus from "../pages/AboutUs/Aboutus";

export const router = createBrowserRouter([
    {
      path: "/",
      Component: rootlayout,
      children: [
        {
            index: true,
            Component: Home
        },
        {
          path: 'Blogs',
          Component: Blogs
        },
        {
          path: 'CalmTool',
          Component: CalmTool
        },
        {
          path: 'Aboutus',
          Component: Aboutus
        }
      ]
    },
  ]);