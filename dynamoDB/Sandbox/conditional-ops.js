const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

const dbcClient = new AWS.DynamoDB.DocumentClient();

dbcClient.put({
    TableName: "td_notes",
    Item: {
      user_id: "abc",
      timestamp: 1,
      title: "Initual Title",
      content: "Initial Content",
    },
    // if #t is not equal to :t
    ConditionExpression: "#t <> :t",
    ExpressionAttributeNames: {
      "#t": "timestamp",
    },
    ExpressionAttributeValues: {
      ":t": 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log("err :", err);
    } else {
      console.log(data);
    }
  }
);
