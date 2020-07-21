import React, {useState , useEffect} from 'react'
import {Button, Input, Space} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import {login} from '../http/http'
import './login.css'

const Login = () => {
    const [usernum, setUsernum] = useState('');
    const [userpwd, setUserpwd] = useState('');

    useEffect(() => {
        console.log(usernum,userpwd);
    })

    return (
        <div className="loginpage">
            <Space direction="vertical">
                <Input placeholder="账号" defaultValue={usernum}
                       onChange={(e) => inputChange(e, 'num')}/>
                <Input.Password
                    placeholder="密码"
                    defaultValue={userpwd}
                    onChange={(e) => inputChange(e, 'pwd')}
                    iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                />
                <Button type="primary" onClick={(e) => goLogin()}>登录</Button>
            </Space>
        </div>
    )
    function inputChange(e , key){
        if(key == 'num'){
            setUsernum(e.target.value)
        }else if(key == 'pwd'){
            setUserpwd(e.target.value)
        }

    }
    function goLogin() {
        console.log(6324);
        let params = {username : usernum , password : userpwd};
        login(params).then((data) => {
            console.log(data.data);
        });
    }
}
export default Login;
