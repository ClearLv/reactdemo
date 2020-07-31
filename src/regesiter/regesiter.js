import React, {useState} from 'react'
import {Button, Input, Space ,Form,Checkbox } from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import '../login/login.css'
import axios from '../http/myAxios'

const Regesiter = (props) => {
    const [usernum, setUsernum] = useState('');
    const [userpwd, setUserpwd] = useState('');

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = values => {
        console.log('Success:', values);
        let params = {username : values.username , password : values.password};
        axios.post('/api/register',params).then((data) => {
            // console.log(data.data);
            if(data.data.code == 200){
                // window.localStorage.setItem("token" , '123');
                props.history.push('/');
                // console.log(props);
            }
        });
    };

    return (
        // <Provider store={store}>
        <div className="loginpage">
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="login-div"
            >
                <Form.Item
                    label="账号"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {/*<Form.Item {...tailLayout} name="remember" valuePropName="checked">*/}
                {/*    <Checkbox>记住账号</Checkbox>*/}
                {/*</Form.Item>*/}

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
        // </Provider>
    )
    function inputChange(e , key){
        if(key == 'num'){
            setUsernum(e.target.value)
        }else if(key == 'pwd'){
            setUserpwd(e.target.value)
        }

    }
}
export default Regesiter;
