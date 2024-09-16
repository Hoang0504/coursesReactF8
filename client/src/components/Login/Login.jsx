import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import Wrapper from '../Wrapper';
import styles from './Login.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import config from '~/configs';
import { useContext, useEffect } from 'react';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, setUserLoggedIn, setToken } = useContext(Context);

    const handleLogin = async (value) => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_PUBLIC_URL_API}/users?username=${value.username}&password=${value.password}`,
            );
            if (response.status === 200) {
                // console.log(response.data.user);
                sessionStorage.setItem('token', JSON.stringify(response.data.accessToken));
                sessionStorage.setItem('userLoggedIn', JSON.stringify(response.data.user));
                setUserLoggedIn(response.data.user);
                setIsLoggedIn(true);
                setToken(response.data.accessToken);

                navigate(config.routes.admin.courses);
            }
            // alert(response.data.message);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate(config.routes.admin.courses);
        }
    }, []);

    return (
        <Wrapper center>
            <div>
                <h1>Form login</h1>
                <Form
                    className={cx('form')}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleLogin}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Wrapper>
    );
}

export default Login;
