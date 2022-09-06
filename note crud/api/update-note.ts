/**
 * Route: PATCH /note
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

AWS.config.update({ region: "ap-south-1" });

import moment from "moment";
import { getResponseHeaders, getUserName, getUserId } from "./util";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

export const handler = async (
  event: any
): Promise<any> => {
  try {
    let item = JSON.parse(event.body).Item;
    item.user_id = getUserId(event.headers);
    item.user_name = getUserName(event.headers);
    item.expires = moment().add(90, "days").unix();

    let data = await dynamodb
      .put({
        TableName: tableName!,
        Item: item,
        ConditionExpression: "#t = :t",
        ExpressionAttributeNames: {
          "#t": "timestamp",
        },
        ExpressionAttributeValues: {
          ":t": item.timestamp,
        },
      })
      .promise();

    return {
      statusCode: 200,
      headers: getResponseHeaders(),
      body: JSON.stringify(item),
    };
  } catch (err) {
    console.log("Error", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
