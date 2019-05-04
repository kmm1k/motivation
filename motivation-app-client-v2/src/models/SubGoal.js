import {default as UUID} from "node-uuid";

export default class SubGoal {
    constructor(content, timePeriod) {
        this.goalId = UUID.v4();
        this.content = content;
        this.timePeriod = timePeriod;
        this.subGoals = [];
        const now = new Date();
        this.createdAt = now.getTime();
    }
}