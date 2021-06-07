import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from './../utils/dynamodbClient';

export const handle:APIGatewayProxyHandler  = async(event)=>{
    const {user_id} = event.pathParameters;

    const response = await document.query({
        TableName: "tb_todos",
        KeyConditionExpression: "userid = :userid",
        ExpressionAttributeValues:{
            ":userid": String(user_id)
        }
    }).promise();

    return{
        statusCode: 200,
        body:JSON.stringify({
            response
        })
    }
}