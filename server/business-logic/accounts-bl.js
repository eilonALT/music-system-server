import accountsDal from "../data-access-layer/accounts-dal.js";

// page size creates a limit of 50 accounts per page and helps to improve the performance of the application in case of large number of accounts
const PAGE_SIZE = 50;

const getAccounts = async (query) => {
    if (!query.page) {
        query.page = 1;
    }
    const page = Number(query.page);
    //implementing offset and limit to help to paginate the accounts
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
            message: "isActive query must be provided with true or 1",
            status: 400,
        };
    }
}


export {
    getAccounts,
}