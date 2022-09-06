const getUserId = (headers : any) => {
  return headers.app_user_id;
};

const getUserName = (headers : any ) => {
  return headers.app_user_name;
};

const getResponseHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*",
  };
};

export { getUserId, getUserName, getResponseHeaders };
