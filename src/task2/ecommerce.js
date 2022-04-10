////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from '../api';

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

//   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
const fetchAllOrders = async () => {
  const ids = allIds;
  const orders = [];
  console.log('Loading...');
  for (let idx = 0; idx < ids.length; idx++) {
    let order = await fetchOrderById(ids[idx]);
    orders.push(order);
  }
  return orders;
};

//   test

// const orders = fetchAllOrders();
// console.log(orders);

const bucketOrdersByUsers = async () => {
  //   2. TODO: using the function from section 1 you should now bucket the orders by user.
  // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

  const orders = await fetchAllOrders();
  let ordersByUsers = orders.reduce((acc, order) => {
    if (!acc[order.userId]) acc[order.userId] = [order];
    else acc[order.userId].push(order);
    return acc;
  }, {});
  return ordersByUsers;
};

//   test

// const ordersByUsers = bucketOrdersByUsers();
// console.log(ordersByUsers);

const getLast2WeeksOrders = async () => {
  //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.

  const orders = await fetchAllOrders();

  //  Minutes -1000 * 60
  //  Hour -Minutes * 60
  const twoWeeks = Date.now() - 1000 * 60 * 60 * 24 * 7 * 2;

  const ordersTwoWeeks = orders.filter((order) => order.timestamp < twoWeeks);
  return ordersTwoWeeks;
};

//   test

// const ordersTwoWeeks =getLast2WeeksOrders()
// console.log(ordersTwoWeeks);

const bucketOrdersByDate = async () => {
  //   4. TODO: using the function from section 3 bucket the orders by date.
  // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
  const dateOrder = await getLast2WeeksOrders();

  let ordersByDate = dateOrder.reduce((acc, order) => {
    const orderDay = new Date(order.timestamp).getDay();
    if (!acc[orderDay]) acc[orderDay] = [order];
    else acc[orderDay].push(order);
    return acc;
  }, {});
  return ordersByDate;
};

//   test

// const ordersByDate = bucketOrdersByDate()
// console.log(ordersByDate);

////////////////////////////////////////
