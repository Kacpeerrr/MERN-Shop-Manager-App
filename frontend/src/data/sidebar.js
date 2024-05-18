import { FaTh, FaRegChartBar, FaCommentAlt } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Dodaj Produkt",
    icon: <BiImageAdd />,
    path: "/dodaj-produkt",
  },
  {
    title: "Twoje Konto",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profil",
      },
      {
        title: "Edytuj Profil",
        path: "/edytuj-profil",
      },
    ],
  },
  {
    title: "Zgłoś Błąd",
    icon: <FaCommentAlt />,
    path: "/kontakt",
  },
];

export default menu;