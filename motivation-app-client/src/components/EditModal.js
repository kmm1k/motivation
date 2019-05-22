import {Button, Glyphicon, ListGroupItem, Modal} from "react-bootstrap";
import React, {Component} from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import SubGoal from "../models/SubGoal";

export default class EditModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.toggle = this.toggle.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            goal: this.props.goal
        };
    }

    validateForm() {
        return this.props.goal.content.length > 0;
    }

    handleClose() {
        this.setState({isLoading: false});
        this.setState({content: ""});
        this.setState({timePeriod: 1});
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    handleChange = event => {
        this.setState({
            goal: {
                ...this.state.goal,
                [event.target.id]: event.target.value
            }
        })
    }

    handleSubmit = async event  => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await this.props.editGoal(this.state.goal);
            this.setState({isLoading: false});
            this.handleClose()
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
            this.handleClose()
        }
    }

    toggle() {
        this.setState({
            show: !this.state.show
        });
    }

    render() {
        return (
            <div>
                <Glyphicon glyph="edit" className={`editButton`} onClick={this.toggle}/>
                <Modal show={this.state.show} toggle={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.button}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="content">
                                <FormControl
                                    onChange={this.handleChange}
                                    value={this.state.goal.content}
                                    placeholder={"KPI"}
                                />
                            </FormGroup>
                            <FormGroup controlId="timePeriod">
                                <FormControl value={this.state.goal.timePeriod} componentClass="select" onChange={this.handleChange} >
                                    <option value="1">One {this.props.timePeriod}</option>
                                    <option value="2">Two {this.props.timePeriod}s</option>
                                    <option value="3">Three {this.props.timePeriod}s</option>
                                    <option value="4">Four {this.props.timePeriod}s</option>
                                    <option value="5">Five {this.props.timePeriod}s</option>
                                    <option value="6">Six {this.props.timePeriod}s</option>
                                </FormControl>
                            </FormGroup>
                            <LoaderButton
                                block
                                bsStyle="primary"
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text={this.props.button}
                                loadingText="Updating…"
                            />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}