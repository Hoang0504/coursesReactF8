const routes = {
    home: '/',
    login: '/login',
    admin: {
        courses: '/admin/courses',
        coursesDeleted: '/admin/courses-deleted',
        addCourse: '/admin/add-course',
        editCourse: '/admin/edit-course/:id',
        coursesDeleted: '/admin/courses-deleted',
        register: '/register-new-user',
    },
};

export default routes;
