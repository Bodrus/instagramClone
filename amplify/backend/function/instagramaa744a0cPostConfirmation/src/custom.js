/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  console.log('!! Hey, Lambda function is working');
  console.log('!! EVENT ', event)
  return event;
};
