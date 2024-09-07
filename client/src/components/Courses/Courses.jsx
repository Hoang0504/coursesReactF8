import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Wrapper from "../Wrapper";
import config from "../../configs";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      <>
        <Button type="primary">Edit</Button>
        <Button className="ml-4" type="primary" danger>
          Delete
        </Button>
      </>
    ),
  },
];

function Courses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await axios("http://localhost:3001/api/courses");
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
      <h1>Courses</h1>
      <Link to={config.routes.admin.addCourse}>
        <Button className="my-4" type="primary">
          Add course
        </Button>
      </Link>
      <Table columns={columns} dataSource={courses} rowKey="_id" />
    </Wrapper>
  );
}

export default Courses;
