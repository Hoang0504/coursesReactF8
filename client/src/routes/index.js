import config from '../configs';
import Home from '../components/Home';
import Courses, { CoursesDeleted } from '../components/Courses';
import AddCourse from '../components/AddCourse';
import EditCourse from '../components/EditCourse';
import Login from '../components/Login';
import Register from '../components/Register';
import Users, { UsersDeleted } from '~/components/Users';
import AddUser from '~/components/AddUser';
import EditUser from '~/components/EditUser';
import Checkout from '~/components/Checkout';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
    { path: config.routes.checkout, component: Checkout },
];
const privateRoutes = [
    { path: config.routes.admin.register, component: Register },
    { path: config.routes.admin.users, component: Users },
    { path: config.routes.admin.addUser, component: AddUser },
    { path: config.routes.admin.editUser, component: EditUser },
    { path: config.routes.admin.usersDeleted, component: UsersDeleted },
    { path: config.routes.admin.courses, component: Courses },
    { path: config.routes.admin.addCourse, component: AddCourse },
    { path: config.routes.admin.editCourse, component: EditCourse },
    { path: config.routes.admin.coursesDeleted, component: CoursesDeleted },
];

export { publicRoutes, privateRoutes };
