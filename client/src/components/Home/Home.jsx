import React, { useContext, useEffect } from 'react';
import { Button, Card, Col, Row } from 'antd';
import { useState } from 'react';
import axios from 'axios';

import Wrapper from '../Wrapper';
import { Context } from '../Context';

function Home() {
    const [courses, setCourses] = useState([]);
    const { cart, setCart } = useContext(Context);

    const fetchCourses = async () => {
        try {
            const res = await axios(`${process.env.REACT_APP_PUBLIC_URL_API}/courses`);
            setCourses(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <Wrapper my={3}>
            <Row gutter={[16, 8]}>
                {courses.map((course, idx) => (
                    <Col key={idx} xs={24} sm={24} md={8} lg={6}>
                        <Card title={course.name} bordered={false}>
                            <p>Price: ${course.price}</p>
                            <p>Description: {course.description}</p>
                            <Button type="primary" style={{ marginRight: '5px' }}>
                                Buy now
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => {
                                    setCart([...cart, course]);
                                }}
                            >
                                Add to cart
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Wrapper>
    );
}

export default Home;
