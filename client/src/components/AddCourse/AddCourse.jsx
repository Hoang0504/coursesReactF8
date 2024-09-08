import { Button, Form, Input, InputNumber, Space } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../../configs";
import Wrapper from "../Wrapper";
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
function AddCourse() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post("http://localhost:3001/api/courses", values);
      if (res.status === 200) {
        navigate(config.routes.admin.courses);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Wrapper my={3}>
      <Button type="primary" danger>
        <Link to={config.routes.admin.courses}>Back</Link>
      </Button>
      <h1>Add Course</h1>
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
          name="name"
          label="Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Enter description" />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            step={0.01}
            placeholder="Enter price"
          />
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

export default AddCourse;
