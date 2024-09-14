import { Col, Layout, Menu, Row } from 'antd';
import { HomeOutlined, PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
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
            {
                label: 'Course',
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
    const { isLoggedIn, userLoggedIn } = useContext(Context);

    // console.log(context);

    // const [currentSelected, setCurrentSelected] = useState(menuName);
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <h5 style={{ color: 'red', marginBottom: 0, marginRight: '6px' }}>
                                    Hello {userLoggedIn.username}
                                </h5>
                                <Link to={config.routes.logout} className={cx('link')}>
                                    Logout
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to={config.routes.login} className={cx('link')}>
                                    Login
                                </Link>
                                <Link to={config.routes.register} className={cx('link')}>
                                    Register
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
