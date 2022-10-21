import * as React from "react";
import * as FontIcon from "react-icons/fa";
import { IconList } from "./iconType";

interface IconPickerItemProps {
    icon: IconList;
    size?: string;
    color?: string;
    onClick?: (icon: IconList) => void;
}

const IconPickerItem: React.FC<IconPickerItemProps> = ({
    icon,
    size,
    color,
    onClick,
}) => {
    const iconDiv = !!icon ? React.createElement(FontIcon[icon]) : <div />;
    return (
        <div
            onClick={() => !!onClick && onClick(icon)}
            style={{
                fontSize: size,
                lineHeight: size,
                color: color,
                padding: 2,
            }}
        >
            {iconDiv}
        </div>
    );
};

IconPickerItem.defaultProps = {
    color: "#000",
    size: "28px",
    onClick: (_: string) => {},
};

export { IconPickerItem };
