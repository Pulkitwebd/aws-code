const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

const dbcClient = new AWS.DynamoDB.DocumentClient();


// if we want to update an item keep same primary and update non-key attribute , remember if you get {} then everything goes fine and item updated in table
dbcClient.put({
    TableName : "td_notes",
    Item : {
        user_id : "mayank",
        timestamp : 2,
        title : "changed title",
        content : "changed content"
     }
} , (err, data) => {
    if(err){
        console.log("err :", err)
    }else{
        console.log(data)
    }
})

dbcClient.update({
    TableName : "td_notes",
    Key : {
        user_id : 'pulkit',
        timestamp : 1,
    },
    UpdateExpression : " set #t = : t",
    ExpressionAttributeNames : {
        "#t" : "title"
    },
    ExpressionAttributeValues : {
        ":t" : "changes title"
    }
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

dbcClient.delete({
    TableName : "td_notes",
    Key : {
        user_id : 'pulkit',
        timestamp : 2,
    },
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// for deleting and update at the same time
dbcClient.batchWrite({
    RequestItems: {
      "td_notes": [
        {
          DeleteRequest: {
            Key: {
              user_id: "pulkit",
              timestamp: 1,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "soham",
              timestamp: 1,
              title: "soham introduction",
              content: "soham content",
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "soham1",
              timestamp: 2,
              title: "soham introduction1",
              content: "soham content1",
            },
          },
        },
      ],
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
