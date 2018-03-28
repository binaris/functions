exports.handler = async (body) => {
  const name = body.name || 'stranger';
  const msg = `Hello ${name}!`;
  console.log(msg);
  return msg;
};
