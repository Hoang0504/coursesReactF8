import { Button, Form, Input, InputNumber, Space } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import useRedirectLogin from '~/hooks/useRedirectLogin';
import config from '../../configs';
import Wrapper from '../Wrapper';
import { useContext } from 'react';
import { Context } from '../Context';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
function AddUser() {
    const navigate = useNavigate();
    const { token } = useContext(Context);
    const [form] = Form.useForm();
    const handleError = useRedirectLogin();

    const onFinish = async (values) => {
        // console.log(process.env.REACT_APP_BASE_URL_API);
        try {
            const res = await axios.post(`${process.env.REACT_APP_PRIVATE_URL_API}/users`, values, {
                headers: { Authorization: token },
            });
            if (res.status === 200) {
                navigate(config.routes.admin.users);
            }
        } catch (err) {
            handleError(err);
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Wrapper my={3}>
            <Button type="primary" danger>
                <Link to={config.routes.admin.users}>Back</Link>
            </Button>
            <h1>Add User</h1>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Enter password" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </Wrapper>
    );
}

export default AddUser;
