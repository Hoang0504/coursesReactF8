import { Button, Form, Input, InputNumber, Space } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../configs";
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
function EditCourse() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { id: courseId } = useParams();

  const onFinish = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post("http://localhost:3001/api/courses", values);
      if (res.status === 200) {
        navigate(config.routes.home);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
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
        <Input />
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
        <Input />
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
            Save
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default EditCourse;
