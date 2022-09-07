import { Layout } from "antd";
import SideMenu from "../../Components/SideMenu/SideMenu";

const { Content, Footer } = Layout;

const AppPage = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }} hasSider={true}>
            <SideMenu />
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AppPage;
