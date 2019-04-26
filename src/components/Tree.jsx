import React, {Component} from 'react';
import './Tree.less';
import Stack from '../utils/util';

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: {},
      treeArray: [],
      treeObj: {},
      type: 'tree',
      parentId: 'pid',
      id: 'id',
      value: 'value',
      label: 'label',
      children: 'children',
      checkBox: false
    }
  }

  componentWillMount() {
    if (this.props.config.type.toLowerCase() === 'tree') {
      this.setState({
        treeData: this.props.treeData,
        ...this.props.config
      })
    } else {
      this.setState({
        treeArray: this.props.treeData,
        ...this.props.config
      })
    }
  }

  componentDidMount() {
    if (this.state.type.toLowerCase() !== 'tree') {
      this.factoryArrayData()
    } else {
      this.factoryTreeData()
    }
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  factoryArrayData() {
    let data = this.state.treeArray, obj = {}, rootId = null;
    data.map((v, i) => {
      if (v[this.state.parentId] || v[this.state.parentId] === 0) {
        if (obj[v[this.state.parentId]]) {
          if (obj[v[this.state.parentId]].children) {
            obj[v[this.state.parentId]].children.push(v)
          } else {
            obj[v[this.state.parentId]].children = [v]
          }
        } else {
          obj[v[this.state.parentId]] = {
            children: [v]
          }
        }
      } else {
        rootId = v[this.state.id]
      }
      if (obj[v[this.state.id]]) {
        v.children = obj[v[this.state.id]].children
      }
      obj[v[this.state.id]] = v
    })
    this.setState({
      treeData: obj[rootId],
      treeObj: obj
    })
  }

  factoryTreeData() {
    let data = this.state.treeData
  }

  clickNode (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    data.open = !data.open
    this.forceUpdate()
  }

  renderTreeParent() {
    return (
      <div className={`parentNode childNode ${this.state.treeData.open?'open':'close'}`}>
        {
          this.state.checkBox?
            <div className="checkBox"></div>:
            <div className="fileBox">
              <img src="./images/file-icon.png" alt=""/>
            </div>
        }
        <div className="nodeName" onClick={(e) => this.clickNode(e, this.state.treeData)}>
          {this.state.treeData[this.state.label]}
        </div>
        {
          this.state.treeData.children ?
            <div className="childList">
              {this.renderTreeNode(this.state.treeData)}
            </div> : null
        }
      </div>
    )
  }

  renderTreeNode(data) {
    return data.children.map((val, ind) => {
      return (
        <div key={ind} className={`childNode ${val.open?'open':'close'} ${ind === data.children.length - 1?'lastNode':''}`}>
          <span></span>
          {
            this.state.checkBox?
              <div className="checkBox"></div>:
              <div className="fileBox">
                <img src="./images/file-icon.png" alt=""/>
              </div>
          }
          <div className="nodeName" onClick={(e) => this.clickNode(e, val)}>
            {val[this.state.label]}
          </div>
          {
            val.children ?
              <div className="childList">
                {this.renderTreeNode(val)}
              </div> : null
          }
        </div>
      )
    })
  }

  render() {
    return (
      <div className="tree">
        {this.renderTreeParent()}
      </div>
    )
  }
}

export default Tree