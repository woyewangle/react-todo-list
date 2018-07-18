import React, {Component} from 'react';
import '../css/todo.css';
import emitter from './emitter';

export default class ItemList extends Component{


    constructor(props) {
        super(props);

        this.state = {
            items: []
        };
        //设置监听器，监听添加按钮是否被触发。
        emitter.addListener('addItemEvent', (content) => {
            this.state.items.push({id: this.generateUUID(), content: content.trim(), checked: false, display: true, editable: false});
            this.setState(this.state);
        });
    }

    generateUUID() {
        /*jshint bitwise:false */
        var i,
            random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
    }

    render() {
        //对items循环遍历
        let itemsArray = this.state.items.map(item => {
            let itemElem = null;
            if (item.display) {
                itemElem = <li className={item.checked ? 'checked' : ''}>
                    <input name="done-todo" type="checkbox" className="done-todo" checked={item.checked}
                           onClick={this.onCheckBoxClicked.bind(this, item.id)}/>
                    <span contentEditable={item.editable} onClick={this.onSpanClicked.bind(this, item.id)}
                          onBlur={this.onSpanBlur.bind(this, item.id)}> {item.content}</span>
                </li>
            }
            return itemElem;
        });
        return(
            <ol>
                {itemsArray}
            </ol>

        );
    }

    onCheckBoxClicked = (id) => {
        let item = this.state.items.find(current => current.id === id);
        item.checked = !item.checked;
        this.setState(this.state);
    }

    onSpanClicked = (id, event) => {
        let item = this.state.items.find(current => current.id === id);
        item.editable = true;
        this.setState(this.state);
    }

    onSpanBlur = (id, event) => {
        let item = this.state.items.find(current => current.id === id);
        item.content = event.target.innerHTML;
        this.setState(this.state);
    }


}