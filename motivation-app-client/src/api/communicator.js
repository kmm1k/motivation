import {Component} from "react";
import {API} from "aws-amplify";


export default class Communicator extends Component {


    async createMainGoal(goal) {
        return API.post("motivation", "/motivation", {
            body: goal
        })
    }

    async updateMainGoal(goal) {
        return API.put("motivation", `/motivation/${goal.goalId}`, {
            body: goal
        })
    }

    async getGoals() {
        return API.get("motivation", "/motivation", {});
    }

    async deleteMainGoal(goalId) {
        return API.del("motivation", `/motivation/${goalId}`, {})
    }

}