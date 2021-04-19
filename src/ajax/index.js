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

export const logIn = (credentials) => {
    return requestInstance.get("/login", {
        headers: {
            "Authorization": "Basic "+ credentials
        },
    })
}

export const logOut = () => {
    return requestInstance("/logout")
}

export const getDebtors = () => {
    return requestInstance("/get_debtors")
}

export const deleteDebtor = debtorId => {
    return requestInstance.get("/delete_debtor", {
        params: {
            debtorId,
        }
    })
}

export const addDebtor = name => {
    return requestInstance.post("/add_debtor", {
        name,
    })
}

export const getDebts = ({debtorId, active, page}) => {
    return requestInstance.get("/get_debts", {
        params: {
            debtorId,
            active,
            page,
        },
    })
}

export const deleteDebts = debts => {
    return requestInstance.post("/delete_debt", {
        debtId: debts
    })
}

export const repayDebts = ({
    debtIds,
    repayDate,
    repayDescription
}) => {
    return requestInstance.post("/repay_debt", {
        debtIds,
        repayDate,
        repayDescription
    })
}

export const addDebt = ({
  debtorIds,
  sum,
  description,
  date
}) => {
    return requestInstance.post("/add_debt", {
        debtorIds,
        sum,
        description,
        date,
    })
}