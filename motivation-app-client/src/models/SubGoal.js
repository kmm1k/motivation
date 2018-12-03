import {default as UUID} from "node-uuid";

export default class SubGoal {
    constructor(content) {
        this.goalId = UUID.v4();
        this.content = content;
        this.subGoals = [];
    }
}