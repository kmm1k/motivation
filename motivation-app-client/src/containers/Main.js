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
            subGoals: [],
            activities: [],
            activeMainGoal: {},
            activeSubGoal: {}
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
        this.setState({subGoals: mainGoal.subGoals})
    }

    selectSubGoal(goalId) {
        let subGoal = this.state.subGoals.find(value => value.goalId === goalId);
        this.setState({activeSubGoal: subGoal});
        this.setState({activities: subGoal.activities})
    }

    addGoal(goal) {
        let goals = this.state.goals;
        goals.push(goal)
        this.setState({goals});
    }

    updateGoal(goal) {
        let goals = this.state.goals;
        const indexOfItemInArray = goals.findIndex(q => q.goalId === goal.goalId);
        if (indexOfItemInArray > -1) {
            goals[indexOfItemInArray] = goal;
        }
        this.setState({goals});
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={12} md={4}>
                            <TaskList goals={this.state.goals}
                                      addGoal={this.addGoal.bind(this)}
                                      isLoading={this.state.isLoading}
                                      selectGoal={this.selectMainGoal.bind(this)}
                                      name="Main goals"
                                      button="Add main goal"
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <TaskList goals={this.state.subGoals}
                                      selectGoal={this.selectSubGoal.bind(this)}
                                      name="Sub goals"
                                      button="Add sub goal"
                                      activeMainGoal={this.state.activeMainGoal}
                                      addGoal={this.updateGoal.bind(this)}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <HIAList
                                goals={this.state.activities}
                                addGoal={this.updateGoal.bind(this)}
                                activeSubGoal={this.state.activeSubGoal}
                                name="High impact activities"
                                button="Add HIA"
                            />
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}