import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import axios from 'axios';
import useRedirectLogin from '~/hooks/useRedirectLogin';
import Wrapper from '../Wrapper';
import { Context } from '../Context';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import config from '~/configs';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const handleError = useRedirectLogin();
    const { token } = useContext(Context);
    const handleRegister = async (value) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_PRIVATE_URL_API}/users`, value, {
                headers: { Authorization: token },
            });
            alert(response.data.message);
            navigate(config.routes.admin.courses);
        } catch (e) {
            handleError(e);
        }
    };

    return (
        <Wrapper center>
            {/* wrapper d-flex */}
            <div>
                <h1>Form register</h1>
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
                    onFinish={handleRegister}
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

export default Register;
