import { Avatar, Badge, Button, Col, Layout, Menu, Row, Space } from 'antd';
import { HomeOutlined, PlusCircleOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import classnames from 'classnames/bind';

import Wrapper from '../../../components/Wrapper';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../configs';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import { Context } from '~/components/Context';

const cx = classnames.bind(styles);

const { Header: HeaderAntd } = Layout;

const items = [
    {
        label: 'Home',
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'Admin',
        key: 'admin',
        icon: <UserOutlined />,
        children: [
            { label: 'Register a new user', key: 'register-new-user', icon: <PlusCircleOutlined /> },
            {
                label: 'Users',
                key: 'users',
                icon: <PlusCircleOutlined />,
            },
            { label: 'Add user', key: 'add-user', icon: <PlusCircleOutlined /> },
            {
                label: 'Users deleted',
                key: 'users-deleted',
                icon: <PlusCircleOutlined />,
            },
            {
                label: 'Courses',
                key: 'courses',
                icon: <PlusCircleOutlined />,
            },
            { label: 'Add course', key: 'add-course', icon: <PlusCircleOutlined /> },
            {
                label: 'Courses deleted',
                key: 'courses-deleted',
                icon: <PlusCircleOutlined />,
            },
        ],
    },
];

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const menuName = pathName.substring(pathName.lastIndexOf('/') + 1);
    const { isLoggedIn, userLoggedIn, setIsLoggedIn, setUserLoggedIn, setToken, cart } = useContext(Context);

    const handleLogout = () => {
        setUserLoggedIn({});
        setIsLoggedIn(false);
        setToken('');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userLoggedIn');
    };

    let currentSelected = menuName;
    if (!currentSelected) {
        currentSelected = 'home';
    }

    const handleMenuClick = (e) => {
        const btnName = e.key;

        switch (btnName) {
            case 'home':
                navigate(config.routes.home);
                break;
            case 'register-new-user':
                navigate(config.routes.admin.register);
                break;
            case 'users':
                navigate(config.routes.admin.users);
                break;
            case 'add-user':
                navigate(config.routes.admin.addUser);
                break;
            case 'users-deleted':
                navigate(config.routes.admin.usersDeleted);
                break;
            case 'courses':
                navigate(config.routes.admin.courses);
                break;
            case 'add-course':
                navigate(config.routes.admin.addCourse);
                break;
            case 'courses-deleted':
                navigate(config.routes.admin.coursesDeleted);
                break;
            default:
                console.error('Not set this menu');
        }
    };
    const handleClickCart = () => {
        navigate(config.routes.checkout);
    };

    return (
        <HeaderAntd
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0',
            }}
        >
            <Wrapper>
                <Row>
                    <Col sm={20}>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={[currentSelected]}
                            items={items}
                            onClick={handleMenuClick}
                        />
                        {/* <button onClick={() => setIsLoggedIn(!isLoggedIn)}>Test</button> */}
                    </Col>
                    <Col sm={4}>
                        {/* isLoggedIn */}
                        {isLoggedIn ? (
                            <div className="h-100" style={{ display: 'flex', alignItems: 'center' }}>
                                {/* <Space size="small"> */}
                                <Badge size="small" count={cart.length} onClick={handleClickCart}>
                                    <Avatar shape="square" size="default">
                                        <ShoppingCartOutlined style={{ fontSize: '30px' }} />
                                    </Avatar>
                                </Badge>
                                {/* </Space> */}
                                <h5 style={{ color: 'red', marginBottom: 0, marginRight: '6px', marginLeft: '6px' }}>
                                    Hello {userLoggedIn.username}
                                </h5>
                                <Button type="primary" danger onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Link to={config.routes.login} className={cx('link')}>
                                    Login
                                </Link>
                            </>
                        )}
                    </Col>
                </Row>
            </Wrapper>
        </HeaderAntd>
    );
}

export default Header;
