import * as React from "react";
import * as FontIcon from "react-icons/fa";
import { IconList } from "./iconType";

interface IconPickerItemProps {
    icon: IconList;
    size?: number;
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
    size: 24,
    onClick: (_: string) => {},
};

export { IconPickerItem };
