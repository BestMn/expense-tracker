import { Col, Row } from "antd";
import React from "react";
import "antd/dist/antd.css";
import "./DashboardPage.css";

import DonutPlotContainer from "../../Components/DonutPlot/DonutPlotContainer";
import ColumnsContainer from "../../Components/Columns/ColumnsContainer";
import LastExpensesListContainer from "../../Components/LastExpensesList/LastExpensesListContainer";
import TopCategoriesContainer from "../../Components/TopCategories/TopCategoriesContainer";
import CreateExpenseFormConitaner from "../../Components/CreateExpenseForm/CreateExpenseFormContainer";

const DashboardPage: React.FC = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-10"
                    }
                >
                    <div className="app-block dashboard-block">
                        <DonutPlotContainer />
                    </div>
                </Col>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-14"
                    }
                >
                    <div className="app-block dashboard-block">
                        <ColumnsContainer />
                    </div>
                </Col>
                <Col
                    span={8}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                    }
                >
                    <div className="app-block dashboard-block">
                        <h2>Quick Add</h2>
                        <CreateExpenseFormConitaner />
                    </div>
                </Col>
                <Col
                    span={8}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                    }
                >
                    <div className="app-block dashboard-block">
                        <h2>Last Expenses</h2>
                        <LastExpensesListContainer />
                    </div>
                </Col>
                <Col
                    span={8}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-8"
                    }
                >
                    <div className="app-block dashboard-block">
                        <TopCategoriesContainer />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default DashboardPage;
