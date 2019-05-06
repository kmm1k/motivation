import {Component} from "react";
import {API} from "aws-amplify";


export default class Communicator extends Component {


    async createMainGoal(goal) {
        if (goal === undefined || goal.goalId === undefined) {
            alert("goal undef create")
            return;
        }
        return API.post("motivation", "/motivation", {
            body: goal
        })
    }

    async updateMainGoal(goal) {
        if (goal === undefined || goal.goalId === undefined) {
            alert("goal undef update")
            return;
        }
        return API.put("motivation", `/motivation/${goal.goalId}`, {
            body: goal
        })
    }

    async getGoals() {
        return API.get("motivation", "/motivation", {});
    }

    async deleteMainGoal(goalId) {
        if (goalId === undefined || goalId === "") {
            alert("goal undef delete")
            return;
        }
        return API.del("motivation", `/motivation/${goalId}`, {})
    }

}