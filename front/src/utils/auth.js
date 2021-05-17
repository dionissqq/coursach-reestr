import Server from "./server";

export async function loginWithFormData(body, redirect) {
    try {
        const result = await Server.makeARequest('/login', Server.Method.POST, body);
        if (result.error)
            return result;
        const authResult = result.data;
        if (!authResult || authResult.error_code)
            return result;
        const jwt = authResult.access;
        processJWT(jwt);
        window.location = redirect ? redirect : '/';
        return result;
    } catch(err) {
        console.log(err);
    }
}

export function processJWT (jwt) {
    localStorage.setItem("jwt", jwt);
    const userBase64 = jwt.split('.')[1];
    const user = window.atob(userBase64);
    localStorage.setItem("user", user);
}

export async function logout() {
    try {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        await Server.makeARequest('/logout', Server.Method.POST);
        document.location = '/';
    } catch (err) {
        console.log(err);
        alert('Server error occured');
    }
}

export async function registerWithFormData(body) {
    try {
        const result = await Server.makeARequest("/register", Server.Method.POST, body);
        if (!result.error && !result.data.error_code)
            window.location = '/auth/login';
        return result;
    } catch(err) {
        console.log(err);
    }
}

export function getCurrentUser() {
    // return {
    //     usename: "danya"
    // }
    try {
        const userString = localStorage.getItem("user");
        return JSON.parse(userString);
    } catch (err) {
        console.log(err);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user");
    }
}