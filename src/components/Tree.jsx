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

  openNode (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    data.open = !data.open
    this.forceUpdate()
  }

  selectNode (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    this.setState({
      selectVal: data[this.state.value]
    }, () => {
      if (this.props.nodeClick) {
        this.props.nodeClick(data[this.state.value])
      }
    })
  }

  selectCheckBox (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
  }

  renderTreeParent() {
    let data = this.state.treeData
    return (
      <div className={`parentNode childNode ${data.open?'open':'close'} ${data.children && data.children.length?'':'noChildren'}`}>
        <span onClick={(e) => this.openNode(e, data)} className="openNode"></span>
        {
          this.state.checkBox?
            <div className="checkBox" onClick={(e) => this.selectCheckBox(e, data)}></div>:
            <div className="fileBox">
              <img src="./images/file-icon.png" alt=""/>
            </div>
        }
        <div className={`nodeName ${this.state.selectVal === data[this.state.value]?'active':''}`} onClick={(e) => this.selectNode(e, data)}>
          {data[this.state.label]}
        </div>
        {
          this.state.treeData.children ?
            <div className="childList">
              {this.renderTreeNode(data)}
            </div> : null
        }
      </div>
    )
  }

  renderTreeNode(data) {
    return data.children.map((val, ind) => {
      return (
        <div key={ind} className={`childNode ${val.open?'open':'close'} ${val.children && val.children.length?'':'noChildren'}`}>
          <span onClick={(e) => this.openNode(e, val)} className="openNode"></span>
          {
            this.state.checkBox?
              <div className="checkBox" onClick={(e) => this.selectCheckBox(e, val)}></div>:
              <div className="fileBox">
                <img src="./images/file-icon.png" alt=""/>
              </div>
          }
          {ind === data.children.length - 1?
              <span className="lastNode"></span>:null
          }
          <div className={`nodeName ${this.state.selectVal === val[this.state.value]?'active':''}`} onClick={(e) => this.selectNode(e, val)}>
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