/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log('!! Hey, Lambda function is working');
  console.log('!! EVENT ', event)
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
//       sub: 'd1a9c02e-30e1-7089-65c1-1196912b3ed3', // -> Unique identification of the user
//         email_verified: 'true',
//         'cognito:user_status': 'CONFIRMED',
//         name: 'Max Bod',
//         email: 'Maxshop2010@gmail.com'
//     }
//   },
//   response: {}
