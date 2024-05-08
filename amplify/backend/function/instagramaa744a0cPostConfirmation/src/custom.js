/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// const AWS = require('aws-sdk');
// const docClient = new AWS.DynamoDB.DocumentClient();
const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
// import {DynamoDBClient} from '@aws-sdk/client-dynamodb';
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAM_GRAPHQLAPIIDOUTPUT;

const TableName = `User-${AppsyncID}-${env}`;

const userExists = async id => {
  const params = {
    TableName,
    Key: id,
  };

  try {
    const command = new GetCommand(params);
    const response = await docClient.send(command);
    return !!response.Item;
  } catch (e) {
    return false;
  }
};

const saveUser = async user => {
  const currentDate = new Date();
  const isoString = currentDate.toISOString();

  const Item = {
    ...user,
    __typename: 'User',
    createdAt: isoString,
    updatedAt: isoString,
  };

  const params = {
    TableName,
    Item,
  };

  const command = new PutCommand(params);

  try {
    // await docClient.put(params).promise();
    await docClient.send(command);
  } catch (e) {
    console.log('!! Error updating user ', e);
  }
};

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log('!! Hey, Lambda function is working');
  console.log('!! EVENT ', event);

  if (!event?.request?.userAttributes) {
    console.log('No user data available');
  }
  const {sub, name, email} = event.request.userAttributes;

  const newUser = {
    id: sub,
    name: name,
    email: email,
    username: event.userName,
  };

  if (!(await userExists(newUser.id))) {
    await saveUser(newUser);
    console.log(
      `User has been already saved to database: ${newUser.id} ${newUser.email}`,
    );
  } else {
    console.log(`!! User ${newUser.id} ${newUser.email} already exists`);
  }

  return event;
};

// !! EVENT  {
//   version: '1',
//     region: 'eu-west-3',
//     userPoolId: 'eu-west-3_idm3dO1XC',
//     userName: 'max',
//     callerContext: {
//     awsSdkVersion: 'aws-sdk-unknown-unknown',
//       clientId: '7rq02mldqva0a5tpk6o7g46b9j'
//   },
//   triggerSource: 'PostConfirmation_ConfirmSignUp',
//     request: {
//     userAttributes: {
//       sub: 'd1a9c02e-30e1-7089-65c1-1196912b3ed3',
//         email_verified: 'true',
//         'cognito:user_status': 'CONFIRMED',
//         name: 'Max Bod',
//         email: 'Maxshop2010@gmail.com'
//     }
//   },
//   response: {}
// }
