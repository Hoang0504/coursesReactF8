import config from "./configs";
import Home from "./components/Home";
import Courses from "./components/Courses";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";

const routes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.admin.courses, component: Courses },
  { path: config.routes.admin.addCourse, component: AddCourse },
  { path: config.routes.admin.editCourse, component: EditCourse },
];

export default routes;
