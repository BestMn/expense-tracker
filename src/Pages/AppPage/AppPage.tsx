import { Layout } from "antd";
import SideMenu from "../../Components/SideMenu/SideMenu";
import { AppPageProps } from "../../types";

const { Content } = Layout;

const AppPage: React.FC<AppPageProps> = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }} hasSider={true}>
            <SideMenu />
            <Layout className="site-layout">
                <Content style={{ padding: "0 16px" }}>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default AppPage;
