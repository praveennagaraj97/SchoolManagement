import { connect, set } from 'mongoose';

set('strictQuery', false);

export default () =>
  connect(process.env.MONGO_URI || '', { dbName: 'school' }, (err) => {
    if (!err) {
      console.log('DB Connection established');
    } else {
      console.log(err.message);
    }
  });
