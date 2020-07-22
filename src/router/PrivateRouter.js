import React from "react";
import {BrowserRouter as Router , Route ,Redirect } from "react-router-dom";

export const PrivateRouter = ({component: Component, ...props}) => {
    // 解构赋值 将 props 里面的 component 赋值给 Component
    return <Route {...props} render={(p) => {
        const login = document.cookie.includes('login=true')
        if (login){ // 如果登录了, 返回正确的路由
            return <Component />
        } else { // 没有登录就重定向至登录页面
            alert("你还没有登录哦, 确认将跳转登录界面进行登录!")
            return <Redirect to={{
                pathname: '/login',
                state: {
                    from: p.location.pathname
                }
            }}/>
        }
    }}/>
}

