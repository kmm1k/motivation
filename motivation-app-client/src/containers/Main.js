import React, {Component} from "react";
import "./Main.css";
import {Grid, Row, Col, ListGroup, ListGroupItem, Glyphicon, Button} from 'react-bootstrap';
import AddModal from "../components/AddModal";
import TaskList from "../components/TaskList";
import {API} from "aws-amplify";


export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: null,
            goals: [],
            subGoals: [],
            mainGoal: {}
        };
    }

    async componentDidMount() {
        this.setState({isLoading: true});
        try {
            const goals = await this.goals();
            this.setState({goals});
        } catch (e) {
            alert(e);
        }

        this.setState({isLoading: false});
    }

    goals() {
        return API.get("motivation", "/motivation", {});
    }

    selectMainGoal(goalId) {
        let mainGoal = this.state.goals.find(value => value.goalId === goalId);
        this.setState({mainGoal: mainGoal});
        this.setState({subGoals: mainGoal.subGoals})
    }

    selectSubGoal(goalId) {

    }

    updateGoal(goalId) {

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
                                      selectMainGoal={this.selectMainGoal.bind(this)}
                                      name="Main goals"
                                      button="Add main goal"
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <TaskList goals={this.state.subGoals}
                                      selectSubGoal={this.selectSubGoal.bind(this)}
                                      name="Sub goals"
                                      button="Add sub goal"
                                      mainGoal={this.state.mainGoal}
                                      updateGoal={this.updateGoal.bind(this)}
                            />
                        </Col>
                        <Col sm={12} md={4}>
                            <ListGroup>
                                <ListGroupItem header="High Impact Activities"></ListGroupItem>
                                <ListGroupItem header="SubGoal 1"></ListGroupItem>
                                <ListGroupItem header="High Impact Activity 1">
                                    <p>Sub Text 1</p>
                                    <Button bsStyle="success" bsSize="large" block>
                                        <Glyphicon glyph="ok"/> Done
                                    </Button>
                                </ListGroupItem>
                                <ListGroupItem header="High Impact Activity 2">
                                    <p>Sub Text 2</p>
                                    <Button bsStyle="success" bsSize="large" block>
                                        <Glyphicon glyph="ok"/> Done
                                    </Button>
                                </ListGroupItem>
                                <AddModal name="Add High Impact Activity"/>
                            </ListGroup>
                        </Col>
                    </Row>
                </Grid>

            </div>
        );
    }
}