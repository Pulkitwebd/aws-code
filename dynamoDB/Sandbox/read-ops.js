const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

const dbcClient = new AWS.DynamoDB.DocumentClient();

dbcClient.get(
  {
    TableName: "td_notes",
    Key: {
      user_id: "abc",
      timestamp: 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

dbcClient.query({
  TableName : "td_notes",
  KeyConditionExpression : "user_id = :uid",
  ExpressionAttributeValues : {
    ":uid" : "abc"
  }
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

dbcClient.scan({
  TableName : "td_notes",
  FilterExpression : "title = :title",
  ExpressionAttributeValues : {
    ":title" : "changed title"
  }
} , (err, data) => {
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})

// to get data from two different tables
dbcClient.batchGet({
  RequestItems: {
    td_notes: {
      Keys: [
        {
          user_id: "mayank",
          timestamp: 2,
        },
        {
          user_id: "abc",
          timestamp: 1,
        },
      ],
    },
    id_notes: {
      Keys: [
        {
          user_id: "11",
          timestamp: 1,
        },
      ],
    },
  },
} , (err , data) => {
  if(err){
    console.log(err)
  }else{
    console.log(JSON.stringify(data , null , 2))
  }
});
