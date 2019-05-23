import {Button, Glyphicon, ListGroup, ListGroupItem} from "react-bootstrap";
import AddModal from "./AddModal";
import React, {Component} from "react";
import moment from "moment";
import "./HIAList.css";

export default class HIAList extends Component {

    handleDone(goalId) {
        this.props.doneHIA(goalId)
    }

    renderHIAList() {
        return [{}].concat(this.props.goals).map(
            (goal, i) => {
                if (i !== 0) {
                    return (
                        <ListGroupItem header={goal.content.trim().split('\n')[0]}>
                            <Button bsStyle="success" bsSize="large" block onClick={() => this.handleDone(goal.goalId)}>
                                <Glyphicon glyph="ok"/> Done
                            </Button>
                            <dl className={"row paddingtop"}>
                                <dd className={"col-sm-7"}>Started: {moment.utc(goal.createdAt).local().format('DD.MM.YYYY')}</dd>
                                <dd className={"col-sm-5"}>ETA: {goal.timePeriod} {this.props.timePeriod}</dd>
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
                <ListGroupItem header="High Impact Activities"></ListGroupItem>
                {this.renderHIAList()}
                <AddModal
                    addGoal={this.props.addGoal}
                    name={this.props.name}
                    button={this.props.button}
                    timePeriod={this.props.timePeriod}
                />
            </ListGroup>
        )

    }


}