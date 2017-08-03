/* CONSTANTS */
const {
  STANDARD,
  DISCOUNT,
  SEGMENTED,
  CONTRACT,
  PROMOTIONAL,
  TOTAL,
  INIT,
  SET_STANDARD_REVENUE,
  SET_DISCOUNT_REVENUE,
  SET_SEGMENTED_REVENUE,
  SET_CONTRACT_REVENUE,
  SET_PROMOTIONAL_REVENUE,
  SET_STANDARD_COGS,
  SET_DISCOUNT_COGS,
  SET_SEGMENTED_COGS,
  SET_CONTRACT_COGS,
  SET_PROMOTIONAL_COGS
} = require('./actions');

export const INITIAL_STATE = {
  data: [
    {
      name: 'STANDARD',
      revenue: 60000,
      cogs: 37000
    },{
      name: 'DISCOUNT',
      revenue: 50000,
      cogs: 40000
    },{
      name: 'SEGMENTED',
      revenue: 40000,
      cogs: 30000
    },{
      name: 'CONTRACT',
      revenue: 120000,
      cogs: 100000
    },{
      name: 'PROMOTIONAL',
      revenue: 5000,
      cogs: 3500
    }
  ]
};

/* REDUCERS */
export function gmWaterfallApp( state = initialState, action )
{
  switch( action.type )
  {
    case INIT:
      return Object.assign( {}, state, {
        data: initData( state.data )
      } );

    case SET_STANDARD_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( state, STANDARD, action.revenue )
      } );

    case SET_DISCOUNT_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( state, DISCOUNT, action.revenue )
      } );

    case SET_SEGMENTED_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( state, SEGMENTED, action.revenue )
      } );

    case SET_CONTRACT_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( state, CONTRACT, action.revenue )
      } );

    case SET_PROMOTIONAL_REVENUE:
      return Object.assign( {}, state, {
        data: setDataRevenue( state, PROMOTIONAL, action.revenue )
      } );

    case SET_STANDARD_COGS:
      return Object.assign( {}, state, {
        data: setDataCogs( state, STANDARD, action.cogs )
      } );

    case SET_DISCOUNT_COGS:
      return Object.assign( {}, state, {
        data: setDataCogs( state, DISCOUNT, action.cogs )
      } );

    case SET_SEGMENTED_COGS:
      return Object.assign( {}, state, {
        data: setDataCogs( state, SEGMENTED, action.cogs )
      } );

    case SET_CONTRACT_COGS:
      return Object.assign( {}, state, {
        data: setDataCogs( state, CONTRACT, action.cogs )
      } );

    case SET_PROMOTIONAL_COGS:
      return Object.assign( {}, state, {
        data: setDataCogs( state, PROMOTIONAL, action.cogs )
      } );

    default:
      return state;
  }
}

/* HELPER FUNCTIONS */
function initData( data )
{
  data[STANDARD].gmPercent = calcGmPercent( data, STANDARD);
  data[DISCOUNT].gmPercent = calcGmPercent( data, DISCOUNT);
  data[SEGMENTED].gmPercent = calcGmPercent( data, SEGMENTED);
  data[CONTRACT].gmPercent = calcGmPercent( data, CONTRACT);
  data[PROMOTIONAL].gmPercent = calcGmPercent( data, PROMOTIONAL);

  data[TOTAL] = {
    name: "TOTAL",
    revenue: calcDataTotalRevenue( data ),
    cogs: calcDataTotalCogs( data )
  };
  
  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data
}

function setDataRevenue( state, dataId, revenue )
{
  let data = state.data;

  data[dataId].revenue = parseInt( revenue );
  data[dataId].gmPercent = calcGmPercent( data, dataId );

  data[TOTAL].revenue = calcDataTotalRevenue( data );
  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data;
}

function setDataCogs( state, dataId, cogs )
{
  let data = state.data;
  
  data[dataId].cogs = parseInt( cogs );
  data[dataId].gmPercent = calcGmPercent( data, dataId );

  data[TOTAL].cogs = calcDataTotalCogs( data );
  data[TOTAL].gmPercent = calcGmPercent( data, TOTAL );

  return data;
}

function calcDataTotalRevenue( data )
{
  return data.reduce((sum, value) =>
  {
    return ( value.name !== "TOTAL" ) ? ( sum + value.revenue ) : sum;
  }, 0);
}

function calcDataTotalCogs( data )
{
  return data.reduce((sum, value) =>
  {
    return (value.name !== "TOTAL") ? (sum + value.cogs) : sum;
  }, 0);
}

function calcGmPercent( data, rowId )
{
  let gmPercent = ( ( data[rowId].revenue - data[rowId].cogs ) / data[rowId].revenue ) * 100;

  return parseFloat(Math.round(gmPercent * 100) / 100).toFixed(1);
}