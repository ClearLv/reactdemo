import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import './index.css';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
const homeIndex = () => {
    // const state = {
    //     current: 'mail',
    // };
    //
    // const handleClick = e => {
    //     console.log('click ', e);
    //     this.setState({ current: e.key });
    // };
    // const { current } = state;
    const routerList = [
        {id: 0, path: '/index', name: '首页'},
        {id: 1, path: '/jotter', name: '笔记本'},
        {id: 2, path: '/library', name: '图书馆'},
        {id: 3, path: '/admin', name: '个人中心'}
    ]

    const listMenu = [
        {id : 0 , path:'/tec' , name :'技术采用'},
        {id : 1 , path:'/tec' , name :'最近更新'},
        {id : 2 , path:'/tec' , name :'下载源码'},
        {id : 3 , path:'/tec' , name :'关于我们'},
    ]

    return (
        <Layout className="index-container">
            <Header>
                {/*<div className="logo" />*/}
                <Menu mode="horizontal" defaultSelectedKeys={['0']}>
                    {/*<Menu.Item key="1">nav 1</Menu.Item>*/}
                    {/*<Menu.Item key="2">nav 2</Menu.Item>*/}
                    {/*<Menu.Item key="3">nav 3</Menu.Item>*/}
                    {
                        routerList.map((item , key) => {
                            return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                        })
                    }
                </Menu>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        {
                            listMenu.map((item , key) => {
                                return <Menu.Item key={item.id}>{item.name}</Menu.Item>
                            })
                        }
                        {/*<SubMenu key="sub1" icon={<UserOutlined/>} title="subnav 1">*/}
                        {/*    <Menu.Item key="1">option1</Menu.Item>*/}
                        {/*    <Menu.Item key="2">option2</Menu.Item>*/}
                        {/*    <Menu.Item key="3">option3</Menu.Item>*/}
                        {/*    <Menu.Item key="4">option4</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu key="sub2" icon={<LaptopOutlined/>} title="subnav 2">*/}
                        {/*    <Menu.Item key="5">option5</Menu.Item>*/}
                        {/*    <Menu.Item key="6">option6</Menu.Item>*/}
                        {/*    <Menu.Item key="7">option7</Menu.Item>*/}
                        {/*    <Menu.Item key="8">option8</Menu.Item>*/}
                        {/*</SubMenu>*/}
                        {/*<SubMenu key="sub3" icon={<NotificationOutlined/>} title="subnav 3">*/}
                        {/*    <Menu.Item key="9">option9</Menu.Item>*/}
                        {/*    <Menu.Item key="10">option10</Menu.Item>*/}
                        {/*    <Menu.Item key="11">option11</Menu.Item>*/}
                        {/*    <Menu.Item key="12">option12</Menu.Item>*/}
                        {/*</SubMenu>*/}
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default homeIndex;
