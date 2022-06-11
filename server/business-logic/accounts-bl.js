import accountsDal from "../data-access-layer/accounts-dal.js";
const PAGE_SIZE = 50;

const getAccounts = async (query) => {
    if (!query.page) {
        query.page = 1;
    }
    const page = Number(query.page);
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;
  
    if (query.isActive == "true" || query.isActive == 1) {
        return await accountsDal.getActiveAccountsFromDB(offset, limit);
    }

    //return erorr if isActive is not true or 1
    if (query.isActive != "true" && query.isActive != 1) {
        return {
            success: false,
            data: null,
            message: "isActive query must be true or 1",
            status: 400,
        };
    }
}


export {
    getAccounts,
}