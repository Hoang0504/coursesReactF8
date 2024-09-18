const routes = {
    home: '/',
    checkout: '/checkout',
    login: '/login',
    admin: {
        register: '/register-new-user',
        courses: '/admin/courses',
        coursesDeleted: '/admin/courses-deleted',
        addCourse: '/admin/add-course',
        editCourse: '/admin/edit-course/:id',
        users: '/admin/users',
        usersDeleted: '/admin/users-deleted',
        addUser: '/admin/add-user',
        editUser: '/admin/edit-user/:id',
    },
};

export default routes;
