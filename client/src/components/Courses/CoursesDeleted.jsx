import React, { useContext, useEffect } from 'react';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../Wrapper';
import config from '../../configs';
import { Context } from '../Context';
import useRedirectLogin from '~/hooks/useRedirectLogin';

function CoursesDeleted() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const { token } = useContext(Context);

    const handleError = useRedirectLogin();
    const handleRestore = async (id) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_PRIVATE_URL_API}/courses/${id}/restore`, null, {
                headers: { Authorization: token },
            });
            if (res.status === 200) {
                navigate(config.routes.admin.courses);
            }
        } catch (err) {
            handleError(err);
        }
    };
    const handleDeleteForever = async (id) => {
        const isConfirm = window.confirm('Are you sure you want to forever delete');
        if (isConfirm) {
            try {
                const res = await axios.delete(
                    `${process.env.REACT_APP_PRIVATE_URL_API}/courses/${id}/delete-forever`,
                    { headers: { Authorization: token } },
                );
                if (res.status === 200) {
                    fetchCoursesDeleted();
                }
            } catch (err) {
                handleError(err);
            }
        }
    };

    const fetchCoursesDeleted = async () => {
        try {
            const res = await axios(`${process.env.REACT_APP_PRIVATE_URL_API}/courses/list-deleted`, {
                headers: { Authorization: token },
            });
            setCourses(res.data);
            console.log(res.data);
        } catch (err) {
            handleError(err);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => handleRestore(record._id)}>
                        Restore
                    </Button>

                    <Button onClick={() => handleDeleteForever(record._id)} className="ml-4" type="primary" danger>
                        Delete forever
                    </Button>
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchCoursesDeleted();
    }, []);

    return (
        <Wrapper my={3}>
            <h1>Courses deleted</h1>
            <Link to={config.routes.admin.courses}>
                <Button className="my-4" type="primary">
                    Back
                </Button>
            </Link>
            <Table columns={columns} dataSource={courses} rowKey="_id" />
        </Wrapper>
    );
}

export default CoursesDeleted;
