import { Button, Checkbox, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import Wrapper from '../Wrapper';
import styles from './Register.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const handleRegister = async (value) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_PRIVATE_URL_API}/users`, value);
            alert(response.data.message);
        } catch (e) {
            console.error(e);
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
