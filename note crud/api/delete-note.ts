/**
 * Route: DELETE /note/t/{timestamp}
 */

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import AWS from "aws-sdk";
AWS.config.update({ region: "ap-south-1" });

import { getUserId, getResponseHeaders } from "./util";

const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.NOTES_TABLE;

export const handler = async (
  event: any
): Promise<any> => {
  try {
    let timestamp = parseInt(event.pathParameters.timestamp);
    let params = {
      TableName: tableName!,
      Key: {
        user_id: getUserId(event.headers),
        timestamp: timestamp,
      },
    };

    await dynamodb.delete(params).promise();

    return {
      statusCode: 200,
      headers: getResponseHeaders(),
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
