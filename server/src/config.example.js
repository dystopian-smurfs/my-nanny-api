export default {
  port: 8080,

  // SQL credentials
  username: 'FILL_ME_IN',
  password: 'FILL_ME_IN',
  database: process.env.NODE_ENV === 'test' ? 'chaiTest' : 'FILL_ME_IN',

  // AMAZON credentials
  amazonClientId: 'FILL_ME_IN',
  amazonClientSecret: 'FILL_ME_IN'
};
