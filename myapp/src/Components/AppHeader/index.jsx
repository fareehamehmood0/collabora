import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";

function AppHeader() {

  return (
    <div className="AppHeader">
      <Image
        width={200}
        src="Collabora.png" height='100'
      ></Image>
      <Typography.Title>Aamir's Dashboard</Typography.Title>
      <Space>
        <Badge count={10} dot >
          <MailOutlined
            style={{ fontSize: 24 }}
          />
        </Badge>
        <Badge count={10}>
          <BellFilled
            style={{ fontSize: 24 }}
          />
        </Badge>
      </Space>
          </div>
  );
}
export default AppHeader;
