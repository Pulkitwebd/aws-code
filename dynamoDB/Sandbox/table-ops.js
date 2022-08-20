const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-south-1" });

const dynamodb = new AWS.DynamoDB();

// to list all the table in dynaomDB
// we can also limit lsit table by passing Limit in first parameter
dynamodb.listTables({}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//CRUD operation in dynamoDB ====>

// for describe table information or read operation
dynamodb.describeTable({ TableName: "id_notes" }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
});

// for creating tables
dynamodb.createTable(
  {
    TableName: "td_notes",
    AttributeDefinitions: [
      {
        AttributeName: "user_id",
        AttributeType: "S",
      },
      {
        AttributeName: "timestamp",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "user_id",
        KeyType: "HASH", //partition key
      },
      {
        AttributeName: "timestamp",
        KeyType: "RANGE", //sort key
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
  (err, data) => {
    if (err) {
      console.log("err : " , err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
);

// for updating tables
dynamodb.updateTable(
  {
    TableName: "td_notes",
    ProvisionedThroughput: {
      ReadCapacityUnits: 2,
      WriteCapacityUnits : 1
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data)
    }
  }
);


// for deleting table
dynamodb.deleteTable({
  TableName : "td_notes"
}, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
