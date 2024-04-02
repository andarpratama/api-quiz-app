const roleAccess = (userRole, route) => {
    const allowedRoles = {
        '/student': ['admin', 'superadmin', 'user'],
        '/user': ['superadmin'],
        // Add more routes and allowed roles as needed
    };

    const allowedRolesForRoute = allowedRoles[route];

    return allowedRolesForRoute && allowedRolesForRoute.includes(userRole);
};

export default roleAccess