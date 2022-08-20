exports.handler = async (event) => {
  let evnetJson = JSON.stringify(event);
  console.log(evnetJson);

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};
