import {ListGroup, ListGroupItem, ProgressBar, Glyphicon} from "react-bootstrap";
import React, {Component} from "react";
import AddModal from "./AddModal";
import "./TaskList.css";


export default class TaskList extends Component {

    constructor(props, context) {
        super(props, context);

        console.log(props)
        this.state = {
            isLoading: null,
            goals: []
        };
    }

    handleSelect(goalId) {
        this.props.selectGoal(goalId)
    }



    renderGoalsList() {
        return [{}].concat(this.props.goals).map(
            (goal, i) => {
                if (i !== 0){
                    return (
                        <ListGroupItem header={goal.content.trim().split('\n')[0]} onClick={() => this.handleSelect(goal.goalId)}>
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
                {this.props.isLoading && <ListGroupItem >
                     <Glyphicon glyph="refresh" className="spinning" />
                </ListGroupItem>}
                {this.renderGoalsList()}
                <AddModal name={this.props.name}
                          activeMainGoal={this.props.activeMainGoal}
                          addGoal={this.props.addGoal}
                          button={this.props.button}
                />
            </ListGroup>
        );
    }

}