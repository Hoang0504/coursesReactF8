import React, { useContext, useEffect } from 'react';
import { Button, Table } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Wrapper from '../Wrapper';
import config from '../../configs';
import { Context } from '../Context';
import useRedirectLogin from '~/hooks/useRedirectLogin';

function UsersDeleted() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const { token } = useContext(Context);

    const handleError = useRedirectLogin();
    const handleRestore = async (id) => {
        try {
            const res = await axios.patch(`${process.env.REACT_APP_PRIVATE_URL_API}/users/${id}/restore`, null, {
                headers: { Authorization: token },
            });
            if (res.status === 200) {
                navigate(config.routes.admin.users);
            }
        } catch (err) {
            handleError(err);
        }
    };
    const handleDeleteForever = async (id) => {
        const isConfirm = window.confirm('Are you sure you want to forever delete');
        if (isConfirm) {
            try {
                const res = await axios.delete(`${process.env.REACT_APP_PRIVATE_URL_API}/users/${id}/delete-forever`, {
                    headers: { Authorization: token },
                });
                if (res.status === 200) {
                    fetchUsersDeleted();
                }
            } catch (err) {
                handleError(err);
            }
        }
    };

    const fetchUsersDeleted = async () => {
        try {
            const res = await axios(`${process.env.REACT_APP_PRIVATE_URL_API}/users/list-deleted`, {
                headers: { Authorization: token },
            });
            setUsers(res.data);
            // console.log(res.data);
        } catch (err) {
            handleError(err);
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
        fetchUsersDeleted();
    }, []);

    return (
        <Wrapper my={3}>
            <h1>Users deleted</h1>
            <Link to={config.routes.admin.users}>
                <Button className="my-4" type="primary">
                    Back
                </Button>
            </Link>
            <Table columns={columns} dataSource={users} rowKey="_id" />
        </Wrapper>
    );
}

export default UsersDeleted;
