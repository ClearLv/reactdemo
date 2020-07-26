import React,{useState , useEffect , useReducer ,createContext} from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, NotificationOutlined} from '@ant-design/icons';
import './index.css';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import {Index} from '../pages/index/index'
import {Library} from '../pages/library/library'
import {Note} from '../pages/note/note'
import {People} from '../pages/people/people'
import {reducer , defaultState} from "../reducer/context";
// import {listReducer} from "../reducer/listReducer";
// import {bookReducer} from "../reducer/bookReducer";

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
export const Context = createContext(null);

const HomeIndex = () => {
    let action = {};
    // const [menu , dispatchMenu] = useReducer(listReducer , action);
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [listMenu , setListMenu] = useState([
        {id: 0, path: '/tec', name: '技术采用'},
        {id: 1, path: '/tec', name: '最近更新'},
        {id: 2, path: '/tec', name: '下载源码'},
        {id: 3, path: '/tec', name: '关于我们'}]);
    const routerList = [
        {id: 0, path: '/index', name: '首页'},
        {id: 1, path: '/jotter', name: '笔记本'},
        {id: 2, path: '/library', name: '图书馆'},
        {id: 3, path: '/admin', name: '个人中心'}
    ]
    //
    // const listMenu = [

    // ]

    return (

        <Layout className="index-container">
            <Router>
                <Header>
                    <Menu mode="horizontal" defaultSelectedKeys={['0']}>
                        {
                            routerList.map((item, key) => {
                                return (
                                    <Menu.Item key={item.id} onClick={(e) => menuChange(e)}>
                                        <Link to={item.path} key={item.id}>{item.name}</Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}

                        >
                            {
                                listMenu.map((item, key) => {
                                    return <Menu.Item onClick={(e) => changeShowItem(e , item.name)} key={item.id}>{item.name}</Menu.Item>
                                    // return <SideMenu key={key} item={item}/>
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
                        {/*    <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            <div>
                                <Context.Provider value={{state, dispatch: dispatch}}>
                                    <Route exact path='/index' component={Index}></Route>
                                    <Route path='/jotter' component={Note}></Route>
                                    <Route path='/library' component={Library}></Route>
                                    <Route path='/admin' component={People}></Route>
                                </Context.Provider>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Router>

        </Layout>
    )
    // const menuChange = (e) => {
    //     console.log(e);
    // }
    function menuChange (e)  {
        const note = 1;
        const tushu = 2;
        const admin = 3;
        if(e.key == note){
            setListMenu([{id: 0, path: '/tec', name: '感悟'},
                {id: 1, path: '/tec', name: '分享'}])
        }else if(e.key == tushu){
            setListMenu([{id: 0, path: '/tec', name: '全部'},
                {id: 1, path: '/tec', name: '文学'},
                {id: 2, path: '/tec', name: '流行'},
                {id: 3, path: '/tec', name: '文化'},
                {id: 4, path: '/tec', name: '生活'},
                {id: 5, path: '/tec', name: '经营'},
                {id: 6, path: '/tec', name: '科技'}])
        }else if(e.key == admin){
            setListMenu([{id: 0, path: '/tec', name: '感悟'},
                {id: 1, path: '/tec', name: '分享'}])
        }
    };
    function changeShowItem(e , key){
        console.log(e);
        dispatch({type:'ADD_TITLE' , title : key});
        // dispatchMenu({type:'item',item : key});
    }
}

export default HomeIndex;
