/* CONSTANTS */
/* CONSTANT VALUES */
const STANDARD = 0
const DISCOUNT = 1
const SEGMENTED = 2
const CONTRACT = 3
const TOTAL = 4

const { LOAD_DATA, SET_STD_REVENUE, SET_STD_COGS } = require('./actions');
const initialState = {
  data: [
    {
      name: 'STANDARD',
      revenue: 0,
      cogs: 0,
      gmPercent: 0
    },{
      name: 'DISCOUNT',
      revenue: 0,
      cogs: 0,
      gmPercent: 0
    },{
      name: 'SEGMENTED',
      revenue: 0,
      cogs: 0,
      gmPercent: 0
    },{
      name: 'CONTRACT',
      revenue: 0,
      cogs: 0,
      gmPercent: 0
    },{
      name: 'TOTAL',
      revenue: 0,
      cogs: 0,
      gmPercent: 0
    }
  ]
};

/* REDUCERS */
export function dealerMapApp( state = initialState, action )
{
  switch( action.type )
  {
    case LOAD_DATA:
      return Object.assign( {}, state, {
        data: action.data
      } );

    case SET_STD_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( STANDARD, action.revenue )
      } );

    case SET_STD_COGS:
      return Object.assign( {}, state, {
        data: setDataRevenue( STANDARD, action.cogs )
      } );

    default:
      return state;
  }
}

/* HELPER FUNCTIONS */
function setDataRevenue( dataId, revenue )
{
  let data = state.data;

  data[dataId].revenue = revenue;

  data[TOTAL].revenue = data[STANDARD].revenue +
                        data[DISCOUNT].revenue +
                        data[SEGMENTED].revenue +
                        data[CONTRACT].revenue;

  return data;
}

function setDataCogs( dataId, cogs )
{
  let data = state.data;
  
  data[dataId].cogs = cogs;

  data[TOTAL].cogs = data[STANDARD].cogs +
                     data[DISCOUNT].cogs +
                     data[SEGMENTED].cogs +
                     data[CONTRACT].cogs;

  return data;
}