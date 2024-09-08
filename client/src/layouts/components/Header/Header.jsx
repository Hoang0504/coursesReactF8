import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Wrapper from "../../../components/Wrapper";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import config from "../../../configs";

const { Header: HeaderAntd } = Layout;

const items = [
  {
    label: <Link to={config.routes.home}>Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: "Admin",
    key: "admin",
    icon: <UserOutlined />,
    children: [
      {
        label: "Course",
        key: "courses",
        icon: <PlusCircleOutlined />,
      },
      { label: "Add course", key: "add-course", icon: <PlusCircleOutlined /> },
    ],
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const menuName = pathName.substring(pathName.lastIndexOf("/") + 1);
  console.log(menuName);

  // const [currentSelected, setCurrentSelected] = useState(menuName);
  let currentSelected = menuName;
  if (!currentSelected) {
    currentSelected = "home";
  }

  const handleMenuClick = (e) => {
    const btnName = e.key;
    console.log(btnName);

    switch (btnName) {
      case "home":
        navigate(config.routes.home);
        break;
      case "courses":
        navigate(config.routes.admin.courses);
        break;
      case "add-course":
        navigate(config.routes.admin.addCourse);
        break;
      default:
        console.log("Not set this menu");
    }
  };

  return (
    <HeaderAntd
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0",
      }}
    >
      <Wrapper>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[currentSelected]}
          items={items}
          onClick={handleMenuClick}
        />
      </Wrapper>
    </HeaderAntd>
  );
}

export default Header;
