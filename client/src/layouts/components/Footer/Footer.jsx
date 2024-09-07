import { Layout } from "antd";

const { Footer: FooterAntd } = Layout;

function Footer() {
  return (
    <FooterAntd style={{ textAlign: "center" }}>
      Ant Design ©{new Date().getFullYear()} Created by Hoàng Trần
    </FooterAntd>
  );
}

export default Footer;
