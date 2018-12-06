import {ListGroup, ListGroupItem, ProgressBar, Glyphicon} from "react-bootstrap";
import React, {Component} from "react";
import AddModal from "./AddModal";
import "./TaskList.css";


export default class TaskList extends Component {

    handleSelect(goalId) {
        this.props.selectGoal(goalId)
    }


    renderGoalsList() {
        return [{}].concat(this.props.goals).map(
            (goal, i) => {
                if (i !== 0) {
                    return (
                        <ListGroupItem header={goal.content.trim().split('\n')[0]}
                                       onClick={() => this.handleSelect(goal.goalId)}>
                            <ProgressBar bsStyle="success" now={40}/>
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
            <ListGroup>
                <ListGroupItem header={this.props.name}></ListGroupItem>
                {this.props.isLoading && <ListGroupItem>
                    <Glyphicon glyph="refresh" className="spinning"/>
                </ListGroupItem>}
                {this.renderGoalsList()}
                <AddModal
                    addGoal={this.props.addGoal}
                    name={this.props.name}
                    button={this.props.button}
                />
            </ListGroup>
        );
    }

}