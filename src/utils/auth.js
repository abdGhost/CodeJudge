export const setToken = (token)=> {
    localStorage.setItem("token", token);
}

export const getToken = ()=> {
    return localStorage.getItem("token");
}

export const logout = ()=> {
    localStorage.removeItem("token");
}

export const isAuthenticated = ()=> {
    return !!localStorage.getItem("token");
}

export function isAdmin(){
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.is_admin === true;
}




















