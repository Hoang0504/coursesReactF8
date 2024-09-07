import { Layout } from "antd";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Wrapper from "../../components/Wrapper";

function DefaultLayout({ children }) {
  return (
    <Layout>
      <Header />
      <Wrapper>{children}</Wrapper>
      <Footer />
    </Layout>
  );
}

export default DefaultLayout;
