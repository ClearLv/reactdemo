import React from "react";
import {Menu} from "antd";
import './index.css';
export const SideMenu = (props) => {
    return (
            <Menu.Item>{props.item.name}</Menu.Item>
        // <div>{props}</div>
    )
}
