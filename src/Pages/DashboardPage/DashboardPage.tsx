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
            <Row>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-10"
                    }
                >
                    <div className="app-block graph-block">
                        <DonutPlotContainer />
                    </div>
                </Col>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-14"
                    }
                >
                    <div className="app-block graph-block">
                        <ColumnsContainer />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                    }
                >
                    <div className="app-block list-block">
                        <CreateExpenseFormConitaner />
                    </div>
                </Col>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-12 ant-col-xl-8"
                    }
                >
                    <div className="app-block list-block">
                        <LastExpensesListContainer />
                    </div>
                </Col>
                <Col
                    span={12}
                    className={
                        "ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-8"
                    }
                >
                    <div className="app-block list-block">
                        <TopCategoriesContainer />
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default DashboardPage;
