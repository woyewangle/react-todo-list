import React, { Component } from 'react';
import '../css/todo.css';
import emitter from './emitter'

export default class AddItem extends Component {

    constructor(props) {
        super(props);
        this.inputContent='';
    }

    render() {
        return (
            <div>
                <input className="input-text" type="text" name="ListItem"
                       onChange={(event) => this.inputContent = event.target.value}/>
                <div id="button" onClick={this.addItem}>Add</div>
            </div>

        );
    }
    addItem=() =>{
        emitter.emit("addItemEvent", this.inputContent);
    }
}