import React, { useEffect } from "react";
import { Button, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Wrapper from "../Wrapper";
import config from "../../configs";

function Courses() {
  const [courses, setCourses] = useState([]);

  const handleDelete = async (id) => {
    console.log(id);
    const isConfirm = window.confirm("Are you sure you want to delete");
    if (isConfirm) {
      try {
        const res = await axios.delete(
          `${process.env.REACT_APP_BASE_URL_API}/courses/${id}`
        );
        console.log(res);
        if (res.status === 200) {
          fetchCourses();
        }
      } catch (e) {}
    }
  };

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
      render: (_, record) => (
        <>
          <Link to={config.routes.admin.editCourse.replace(":id", record._id)}>
            <Button type="primary">Edit</Button>
          </Link>

          <Button
            onClick={() => handleDelete(record._id)}
            className="ml-4"
            type="primary"
            danger
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

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
      <h1>Courses</h1>
      <div className="d-flex align-items-center justify-content-between">
        <Link to={config.routes.admin.addCourse}>
          <Button className="my-4" type="primary">
            Add course
          </Button>
        </Link>
        <Link to={config.routes.admin.coursesDeleted}>
          <Button className="my-4" type="primary" danger>
            Course deleted
          </Button>
        </Link>
      </div>
      <Table columns={columns} dataSource={courses} rowKey="_id" />
    </Wrapper>
  );
}

export default Courses;
