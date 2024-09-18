import { Button, Form, Input, InputNumber, Modal, Result, Table } from 'antd';
import { useContext, useState } from 'react';
import { Context } from '../Context';
import Wrapper from '../Wrapper';

function Checkout() {
    const { cart, setCart } = useContext(Context);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
    const [customerName, setCustomerName] = useState('');
    const [addressOrder, setAddressOrder] = useState('');

    const handleChangeQuantityCartItem = (value, record) => {
        const oldCart = cart.filter((c) => c._id !== record._id);
        const newCart = [...oldCart, { ...record, quantity: value }];
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
    };
    const handleRemoveCart = (record) => {
        const newCart = cart.filter((item) => item._id !== record._id);
        setCart(newCart);
        sessionStorage.setItem('cart', JSON.stringify(newCart));
    };
    const handleCheckoutForm = (values) => {
        setCustomerName(values.customerName);
        setAddressOrder(values.address);
        setIsModalConfirmOpen(true);
    };
    const handleConfirmOk = () => {
        setIsModalConfirmOpen(false);
        setIsCheckoutSuccess(true);
    };

    const columns = [
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => `$${record.price}`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record) => (
                <InputNumber
                    min={1}
                    defaultValue={record.quantity}
                    onChange={(value) => handleChangeQuantityCartItem(value, record)}
                />
            ),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Button onClick={() => handleRemoveCart(record)} className="ml-4" type="primary" danger>
                    X
                </Button>
            ),
        },
    ];
    return (
        <Wrapper my={3}>
            <h1 style={{ marginBottom: '10px' }}>Checkout</h1>
            <Table columns={columns} dataSource={cart} rowKey="_id" />
            <h3>
                Total: $
                <InputNumber
                    min={1}
                    controls={false}
                    readOnly
                    value={cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}
                />
            </h3>
            <Form
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
                onFinish={handleCheckoutForm}
                autoComplete="off"
            >
                <Form.Item
                    label="Customer name"
                    name="customerName"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your address!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Checkout
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Confirm"
                open={isModalConfirmOpen}
                onOk={handleConfirmOk}
                onCancel={() => setIsModalConfirmOpen(false)}
            >
                {cart.map((c, i) => (
                    <p key={i}>
                        Name: {c.name}, price: {c.price}, quantity: {c.quantity}
                    </p>
                ))}
                <h5>Total: {cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2)}</h5>
                <br />
                <h4>Information</h4>
                <p>Customer name: {customerName}</p>
                <p>Address: {addressOrder}</p>
            </Modal>
            <Modal
                title="Success"
                open={isCheckoutSuccess}
                onOk={() => setIsCheckoutSuccess(false)}
                onCancel={() => setIsCheckoutSuccess(false)}
            >
                <Result status="success" title="Successfully checkout!" subTitle="Thank you" />
            </Modal>
        </Wrapper>
    );
}

export default Checkout;
