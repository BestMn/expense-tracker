import * as React from "react";
import { IconPickerItem } from "./IconListItem";
import { iconList } from "./iconList";
import { useState, useEffect, useRef } from "react";
import { IconList } from "./iconType";
import "./IconPicker.css";
import { Button } from "antd";

interface IconPickerProps {
    iconValue: string;
    onChange: (value: IconList) => void;
    hideSearch?: boolean;
}

const IconPicker: React.FC<IconPickerProps> = ({
    iconValue,
    onChange,
    hideSearch,
}) => {
    const ref = useRef(null);
    const [display, changeDisplay] = useState(false);
    const [searchString, setSearchString] = useState("");
    useEffect(() => {
        onChange(iconValue);
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (ref.current && !ref.current.contains(event.target)) {
                changeDisplay(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
    const buttonClick = () => changeDisplay(!display);
    const onChangeSearch = (event: any) => {
        setSearchString(event.target.value);
    };
    return (
        <div ref={ref} onClick={() => buttonClick()} className={"container"}>
            <IconPickerItem icon={iconValue} />
            {display && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={"picker-container"}
                >
                    {!hideSearch && (
                        <input
                            onChange={onChangeSearch}
                            value={searchString}
                            placeholder="Search"
                            className="app-input"
                        />
                    )}
                    {iconList
                        .filter((i: string) =>
                            i.toLowerCase().includes(searchString.toLowerCase())
                        )
                        .map((icon) => {
                            return (
                                <IconPickerItem
                                    key={icon}
                                    icon={`${icon}`}
                                    onClick={(value: IconList) => {
                                        onChange(value);
                                        changeDisplay(false);
                                        setSearchString("");
                                    }}
                                />
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default IconPicker;
