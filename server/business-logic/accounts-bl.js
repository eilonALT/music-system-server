import accountsDal from "../data-access-layer/accounts-dal.js";
import Joi from 'joi';

// page size creates a limit of 50 accounts per page and helps to improve the performance of the application in case of large number of accounts
const PAGE_SIZE = 50;


const shcema = Joi.object({
    isActive: Joi.string().valid("true", "1").required(),
    page: Joi.number().integer().min(1).default(1),
})

const validateQuery = async (query) => {
    const { error } = shcema.validate(query)
    if (error) {
        throw error
    }
}

const getAccounts = async (query) => {

    const page = shcema.validate(query).value.page;

    //implementing offset and limit to help to paginate the accounts
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE;

    return await accountsDal.getActiveAccountsFromDB(offset, limit);

}


export {
    getAccounts,
    validateQuery,
}