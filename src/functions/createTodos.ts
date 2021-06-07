
import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from 'src/utils/dynamodbClient';
import { v4 as uuidV4   } from 'uuid';

interface ICreateTodos{
    id?: String;
    title: string;
    deadline: Date;
}


export const handle:APIGatewayProxyHandler = async (event)=>{
    const {user_id} = event.pathParameters;
    const {title, deadline} = JSON.parse(event.body) as ICreateTodos;

    await document.put({
        TableName: "tb_todos",
        Item:{
            id:uuidV4(),
            user_id: user_id,
            title,
            done: false,
            deadline: new Date(deadline)
        }
    }).promise();

    return{
        statusCode:201,
        body: JSON.stringify({
            message: "Todo Created",
        }),
        headers:{
            "Content-type": "applications/json",
        },
    }

}