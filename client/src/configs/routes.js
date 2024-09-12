const routes = {
    home: '/',
    login: '/login',
    register: '/register',
    admin: {
        courses: '/admin/courses',
        coursesDeleted: '/admin/courses-deleted',
        addCourse: '/admin/add-course',
        editCourse: '/admin/edit-course/:id',
        coursesDeleted: '/admin/courses-deleted',
    },
};

export default routes;
