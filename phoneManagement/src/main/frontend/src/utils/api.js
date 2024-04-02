import axiosInstance from "../axiosInstance";

export const login = async (user) => {
    const {username, password} = user;

    const body = {
        username: username,
        password: password
    }

    try {
        const {data, status} = await axiosInstance.post("/account/login", JSON.stringify(body));
        return {data, status, error: null};
    } catch (error) {
        // const { data: {message}, status} = error.response;
        return {error};
    }
}