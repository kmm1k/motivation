import React, {Component} from "react";
import "./Main.css";
import {Grid, Row, Col} from 'react-bootstrap';
import TaskList from "../components/TaskList";
import HIAList from "../components/HIAList";
import Communicator from "../api/communicator"

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.api = new Communicator();

        this.state = {
            isLoading: null,
            goals: [],
            activeMainGoal: {subGoals: [], content: ""},
            activeSubGoal: {subGoals: [], content: ""}
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            const goals = await this.api.getGoals();
            this.setState({goals});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    selectMainGoal(goalId) {
        let mainGoal = this.state.goals.find(value => value.goalId === goalId);
        this.setState({activeMainGoal: mainGoal});
        this.setState({activeSubGoal: {subGoals: [], content: ""}});
    }

    selectSubGoal(goalId) {
        let subGoal = this.state.activeMainGoal.subGoals.find(value => value.goalId === goalId);
        this.setState({activeSubGoal: subGoal});
    }

    async deleteMainGoal(goalId) {
        this.setState({isLoading: true})
        await this.api.deleteMainGoal(goalId)
        if (goalId === this.state.activeMainGoal.goalId) {
            this.setState({activeMainGoal: {subGoals: [], content: ""}});
        }
        let goals = this.delete(this.state.goals, goalId)
        this.setState({goals: goals})
        this.setState({isLoading: false})
    }

    async deleteSubGoal(goalId) {
        this.setState({isLoading: true})
        let activeMainGoal = this.state.activeMainGoal;
        let subGoals = this.delete(activeMainGoal.subGoals, goalId)
        activeMainGoal.subGoals = subGoals
        await this.api.updateMainGoal(activeMainGoal)
        if (goalId === this.state.activeSubGoal.goalId) {
            this.setState({activeSubGoal: {subGoals: [], content: ""}});
        }
        let goals = this.replace(this.state.goals, activeMainGoal)
        this.setState({activeMainGoal: activeMainGoal})
        this.setState({goals: goals})
        this.setState({isLoading: false})
    }

    async addGoal(goal) {
        let goals = this.state.goals;
        goals.push(goal)
        await this.api.createMainGoal(goal)
        this.setState({goals});
    }

    async addSubGoal(goal) {
        let activeMainGoal = this.state.activeMainGoal;
        activeMainGoal.subGoals.push(goal)
        let goals = this.replace(this.state.goals, activeMainGoal)
        await this.api.updateMainGoal(activeMainGoal)
        this.setState({goals});
    }

    async addHIA(activeHIA) {
        let activeMainGoal = this.state.activeMainGoal;
        let activeSubGoal = this.state.activeSubGoal;
        activeSubGoal.subGoals.push(activeHIA);
        activeMainGoal = this.replace(activeMainGoal.subGoals, activeSubGoal);
        let goals = this.replace(this.state.goals, activeMainGoal);
        await this.api.updateMainGoal(activeMainGoal)
        this.setState({goals});
    }


    replace(goalList, subElement) {
        const indexOfItemInArray = goalList.findIndex(q => q.goalId === subElement.goalId);
        if (indexOfItemInArray > -1) {
            goalList[indexOfItemInArray] = subElement;
        }
        return goalList;
    }

    delete(goalList, goalId) {
        const indexOfItemInArray = goalList.findIndex(q => q.goalId === goalId);
        goalList.splice(indexOfItemInArray, 1);
        return goalList;
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={12} md={4}>
                            <TaskList
                                isLoading={this.state.isLoading}
                                goals={this.state.goals}
                                selectGoal={this.selectMainGoal.bind(this)}
                                deleteGoal={this.deleteMainGoal.bind(this)}
                                name="Main goals"
                                button="Add main goal"
                                addGoal={this.addGoal.bind(this)}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <TaskList
                                goals={this.state.activeMainGoal.subGoals}
                                selectGoal={this.selectSubGoal.bind(this)}
                                deleteGoal={this.deleteSubGoal.bind(this)}
                                name="Sub goals"
                                button="Add sub goal"
                                addGoal={this.addSubGoal.bind(this)}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <HIAList
                                goals={this.state.activeSubGoal.subGoals}
                                name="High impact activities"
                                button="Add HIA"
                                addGoal={this.addHIA.bind(this)}
                            />
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}