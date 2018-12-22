import {Button, Glyphicon, ListGroup, ListGroupItem} from "react-bootstrap";
import AddModal from "./AddModal";
import React, {Component} from "react";

export default class HIAList extends Component {

    handleDone() {

    }

    renderHIAList() {
        return [{}].concat(this.props.goals).map(
            (goal, i) => {
                if (i !== 0) {
                    return (
                        <ListGroupItem header={goal.content.trim().split('\n')[0]}>
                            <Button bsStyle="success" bsSize="large" block onClick={this.handleDone()}>
                                <Glyphicon glyph="ok"/> Done
                            </Button>
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