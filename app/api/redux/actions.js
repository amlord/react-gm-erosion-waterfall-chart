/* ACTION TYPES */
export const LOAD_DATA = 'LOAD_DATA'
export const SET_STD_REVENUE = 'SET_STD_REVENUE'
export const SET_STD_COGS = 'SET_STD_COGS'

/* ACTION CREATORS */
export function loadData(data)
{
    return {
        type: LOAD_DATA,
        data: data
    }
}

export function setStdGmRev(revenue)
{
    return {
        type: SET_STD_REVENUE,
        revenue: revenue
    }
}

export function setStdGmCogs(cogs)
{
    return {
        type: SET_STD_COGS,
        cogs: cogs
    }
}