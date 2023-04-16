export default () => ({
  mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/clinic',
});
