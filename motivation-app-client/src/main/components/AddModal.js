import {Button, Glyphicon, ListGroupItem, Modal} from "react-bootstrap";
import React, {Component} from "react";
import {FormGroup, FormControl} from "react-bootstrap";
import LoaderButton from "./LoaderButton";
import SubGoal from "../../models/SubGoal";

export default class AddModal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            isLoading: null,
            content: "",
            timePeriod: 1
        };
    }

    validateForm() {
        return this.state.content.length > 0;
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
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await this.props.addGoal(new SubGoal(this.state.content, this.state.timePeriod));
            this.setState({isLoading: false});
            this.handleClose()
        } catch (e) {
            alert(e);
            this.setState({isLoading: false});
            this.handleClose()
        }
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
                                    placeholder={"KPI"}
                                />
                            </FormGroup>
                            <FormGroup controlId="timePeriod">
                                <FormControl componentClass="select" >
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