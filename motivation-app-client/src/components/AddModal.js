import {Button, Glyphicon, ListGroupItem, Modal} from "react-bootstrap";
import React, {Component} from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import SubGoal from "../models/SubGoal";
import Communicator from "../api/communicator"

export default class AddModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.api = new Communicator();

        this.state = {
            show: false,
            isLoading: null,
            content: ""
        };
    }

    validateForm() {
        return this.state.content.length > 0;
    }

    handleClose() {
        this.setState({isLoading: false});
        this.setState({content: ""});
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await this.createOrUpdateMainGoal();
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    }


    async createOrUpdateMainGoal() {
        if (this.props.activeMainGoal !== undefined) {
            let mainGoal
            if (this.props.activeSubGoal !== undefined) {
                mainGoal = this.addHIAToSubGoal();
            } else {
                mainGoal = this.addSubGoalToMainGoal();
            }
            await this.updateMainGoal(mainGoal);
        } else {
            await this.createMainGoal();
        }
        this.handleClose();
    }

    async updateMainGoal(mainGoal) {
        await this.api.updateMainGoal(mainGoal)
            .then(res => {
                this.props.addGoal(res);
            });
    }

    addSubGoalToMainGoal() {
        let mainGoal = this.props.activeMainGoal;
        mainGoal.subGoals.push(new SubGoal(this.state.content))
        return mainGoal;
    }

    addHIAToSubGoal() {
        let mainGoal = this.props.activeMainGoal.;
        mainGoal.subGoals.push(new SubGoal(this.state.content))
        return mainGoal;
    }

    async createMainGoal() {
        await this.api.createMainGoal(new SubGoal(this.state.content))
            .then(res => {
                this.props.addGoal(res);
            })
    }

    render() {
        return (
            <div>
                <ListGroupItem header="" onClick={this.handleShow}>
                    <Glyphicon glyph="plus"/> {this.props.button}
                </ListGroupItem>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.button}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="content">
                                <FormControl
                                    onChange={this.handleChange}
                                    value={this.state.content}
                                />
                            </FormGroup>
                            <LoaderButton
                                block
                                bsStyle="primary"
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text={this.props.button}
                                loadingText="Creating…"
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}