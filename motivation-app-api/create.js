import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "motivation",
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            goalId: uuid.v1(),
            content: data.content,
            timePeriod: data.timePeriod,
            subGoals: data.subGoals,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}