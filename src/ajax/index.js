import requestInstance from "./config";

export const signUp = async ({ username, password, name }) => {
    try {
        const response = await requestInstance.post("/signup", {
            username,
            password,
            name
        })
        console.log("sign up response")
        console.log(response)
        return response
    } catch (e) {
        console.error(e)
        return {
            status: false
        }
    }
}

export const logIn = async (credentials) => {
    const response = await requestInstance.get("/login", {
        headers: {
            "Authorization": "Basic "+ credentials
        },
    })
    console.log("login response")
    console.log(response)
    return response
}

export const logOut = async () => {
    const response = await requestInstance("/logout")
    console.log("logout response")
    console.log(response)
    return response
}