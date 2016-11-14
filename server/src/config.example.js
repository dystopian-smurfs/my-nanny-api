export default {
  // SQL credentials
  username: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  database: process.env.NODE_ENV === 'test' ? 'chaiTest' : 'FILL_ME_IN',
};
