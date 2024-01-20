import { Widgets ,Payment } from "@mui/icons-material";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CategoryIcon from '@mui/icons-material/Category';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';


export const elements = [
  {
    id: "products",
    title: "products",
    path: "/products",
    icon: Widgets,
    // children: [
    //   {
    //     id: "createProduct",
    //     title: "Create Product",
    //     path: "/positions/create",
    //   },
    //   {
    //     id: "updateProduct",
    //     title: "Update Project",
    //     path: "/positions/update",
    //   },
    // ],
  },
  {
    id: "menu",
    title: "menu",
    path: "/menu",
    icon: RestaurantMenuIcon,
    // children: [
    //   {
    //     id: "childPage",
    //     title: "childPage",
    //     path: "/positions/create",
    //     icon: Widgets,
    //   },
    // ],
  },
  {
    id: "category",
    title: "category",
    path: "/category",
    icon: CategoryIcon,
  },
  {
    id: "orders",
    title: "orders",
    path: "/orders",
    icon: ListAltIcon,
    children: [
      {
        id: "childPage",
        title: "childPage",
        path: "/positions/create",
        icon: Widgets,
      },
    ],
  },
  {
    id: "users",
    title: "users",
    path: "/users",
    icon: GroupIcon,
    children: [
      {
        id: "childPage",
        title: "childPage",
        path: "/positions/create",
        icon: Widgets,
      },
    ],
  },
  
];
