import React, { useContext, useEffect } from 'react';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../Wrapper';
import config from '../../configs';
import { Context } from '../Context';
import useRedirectLogin from '~/hooks/useRedirectLogin';

function Users() {
    const [users, setUsers] = useState([]);
    const { token } = useContext(Context);
    const handleError = useRedirectLogin();

    const handleDelete = async (id) => {
        const isConfirm = window.confirm('Are you sure you want to delete');
        if (isConfirm) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_PRIVATE_URL_API}/users/${id}`, {
                    headers: { Authorization: token },
                });
                console.log(res);
                if (res.status === 200) {
                    fetchUsers();
                }
            } catch (err) {
                handleError(err);
            }
        }
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Link to={config.routes.admin.editUser.replace(':id', record._id)}>
                        <Button type="primary">Edit</Button>
                    </Link>

                    <Button onClick={() => handleDelete(record._id)} className="ml-4" type="primary" danger>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const fetchUsers = async () => {
        try {
            const res = await axios(`${process.env.REACT_APP_PRIVATE_URL_API}/users/list`, {
                headers: { Authorization: token },
            });
            setUsers(res.data);
            console.log(res.data);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Wrapper my={3}>
            <h1>Users</h1>
            <div className="d-flex align-items-center justify-content-between">
                <Link to={config.routes.admin.addUser}>
                    <Button className="my-4" type="primary">
                        Add user
                    </Button>
                </Link>
                <Link to={config.routes.admin.usersDeleted}>
                    <Button className="my-4" type="primary" danger>
                        User deleted
                    </Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={users} rowKey="_id" />
        </Wrapper>
    );
}

export default Users;
