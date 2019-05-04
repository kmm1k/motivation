import React, {Component} from "react";
import "./Main.css";
import Communicator from "../api/communicator"
import AddButton from "../components/AddButton"

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.api = new Communicator();
        this.state = {};
    }

    render() {
        return (
            <div>
                <AddButton>
                </AddButton>
            </div>
        );
    }

}