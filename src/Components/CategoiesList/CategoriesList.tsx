import React from "react";
import { EnvironmentOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

type Category = {
    id: number;
    name: string;
    icon: string;
    color: string;
};

const CategoriesList = ({
    editable,
    categories,
}: {
    editable: boolean;
    categories: Array<Category>;
}) => {
    console.log(categories);

    const edit = editable ? <span>edit</span> : null;

    const addCategory = editable ? (
        <div className="expense-item" onClick={() => {}}></div>
    ) : null;

    const items = categories.map((item: any) => {
        return (
            <div
                key={item.id}
                id={item.id}
                className="expense-item"
                style={{ backgroundColor: item.color }}
            >
                {edit}
                <EnvironmentOutlined
                    style={{
                        fontSize: "50px",
                        color: "white",
                        display: "block",
                    }}
                />
                <span>{item.name}</span>
            </div>
        );
    });

    return (
        <div style={{ display: "flex" }}>
            {items}
            {addCategory}
        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        categories: state.categories,
    };
};

export default connect(mapStateToProps)(CategoriesList);
