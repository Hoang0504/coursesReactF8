import config from '../configs';
import Home from '../components/Home';
import Courses, { CoursesDeleted } from '../components/Courses';
import AddCourse from '../components/AddCourse';
import EditCourse from '../components/EditCourse';
import Login from '../components/Login';
import Register from '../components/Register';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.login, component: Login },
];
const privateRoutes = [
    { path: config.routes.admin.register, component: Register },
    { path: config.routes.admin.courses, component: Courses },
    { path: config.routes.admin.addCourse, component: AddCourse },
    { path: config.routes.admin.editCourse, component: EditCourse },
    { path: config.routes.admin.coursesDeleted, component: CoursesDeleted },
];

export { publicRoutes, privateRoutes };
