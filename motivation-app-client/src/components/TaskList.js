import {ListGroup, ListGroupItem, ProgressBar, Glyphicon} from "react-bootstrap";
import React, {Component} from "react";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import moment from "moment";
import "./TaskList.css";
import SubGoal from "../models/SubGoal.js";

export default class TaskList extends Component {

    handleSelect(goalId) {
        this.props.selectGoal(goalId)
    }

    handleDelete(goalId) {
        this.props.deleteGoal(goalId)
    }


    renderGoalsList() {
        return [{}].concat(this.props.goals).map(
            (goal: SubGoal, i) => {
                if (i !== 0) {
                    return (
                        <ListGroupItem header={goal.content.trim().split('\n')[0]}
                                       onClick={() => this.handleSelect(goal.goalId)}>
                            <ProgressBar className={`progressBar`} bsStyle="success" now={40}/>
                            <Glyphicon glyph="remove" className={`removeButton`} onClick={() => this.handleDelete(goal.goalId)}/>
                            <dl className={"row, nopadding"}>
                                <dd className={"col-sm-7 nopadding"}>Started: {moment.utc(goal.createdAt).local().format('DD.MM.YYYY')}</dd>
                                <dd className={"col-sm-4 nopadding"}>ETA: {goal.timePeriod} {this.props.timePeriod}</dd>
                                <dd className={"col-sm-1 nopadding"}>
                                    <EditModal
                                        editGoal={this.props.editGoal}
                                        goal={goal}
                                        button={"Edit goal"}
                                        timePeriod={this.props.timePeriod}
                                    />
                                </dd>
                            </dl>
                        </ListGroupItem>
                    )
                }
                else {
                    return null;
                }
            });
    }

    render() {
        return (
            <ListGroup variant="flush">
                <ListGroupItem header={this.props.name}></ListGroupItem>
                {this.props.isLoading && <ListGroupItem>
                    <Glyphicon glyph="refresh" className="spinning"/>
                </ListGroupItem>}
                {this.renderGoalsList()}
                <AddModal
                    addGoal={this.props.addGoal}
                    name={this.props.name}
                    button={this.props.button}
                    timePeriod={this.props.timePeriod}
                />
            </ListGroup>
        );
    }
}