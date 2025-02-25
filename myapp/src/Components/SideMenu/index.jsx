import {
  AppstoreOutlined,
  HddOutlined,
  ProfileOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
  CalendarOutlined,
  MailOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

function SideMenu() {
  const navigate = useNavigate ()
  return (
    <div className="SideMenu">
      <Menu
       className="SideMenuVertical"
      mode="vertical"
      onClick={(item)=>{
        //items.key
        navigate(item.key)
      }}
          items={[
          {
            label: "Dashbaord",
            icon: <AppstoreOutlined />,
            key: "/",
          },
          {
            label: "AddSupervisor",
            key: "/addsupervisor",
            icon: <UserAddOutlined />,
          },
          {
            label: "AddStudent",
            key: "/addstudent",
            icon: <UsergroupAddOutlined />,
          },
          {
            label: "Projects",
            key: "/projects",
            icon: <ProfileOutlined />,
          },
          {
            label: "Events",
            key: "/events",
            icon: <CalendarOutlined />,
          },
          {
            label: "ContactUs",
            key: "/contactus",
            icon: <MailOutlined />,
          },
          {
            label: "Logout",
            key: "/logout",
            icon: <LogoutOutlined />,
          },
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;

