import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import Wrapper from "../Wrapper";
import { Button, Card, Col, Row } from "antd";

function Home() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios(`${process.env.REACT_APP_BASE_URL_API}/courses`);
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
          <Col key={idx} span={8}>
            <Card title={course.name} bordered={false}>
              <p>Price: ${course.price}</p>
              <p>Description: {course.description}</p>
              <Button type="primary">Buy now</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Wrapper>
  );
}

export default Home;
