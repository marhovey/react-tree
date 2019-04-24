import React, { Component } from 'react';
import './Tree.less';
import Stack from '../utils/util';

class Tree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      treeData: {},
      treeArray: [],
      treeObj: {},
      config: {
        type: 'tree',
        parentId: 'pid',
        id: 'id',
        value: 'value',
        label: 'label'
      }
    }
  }

  componentWillMount () {
    if (this.props.config.type.toLowerCase() === 'tree') {
      this.setState({
        treeData: this.props.treeData,
        config: this.props.config
      })
    } else {
      this.setState({
        treeArray: this.props.treeData,
        config: this.props.config
      })
    }
  }

  componentDidMount () {
    if (this.state.config.type.toLowerCase() !== 'tree') {
      this.factoryArrayData()
    } else {
      this.factoryTreeData()
    }
  }

  componentDidUpdate () {

  }

  componentWillUnmount () {

  }

  factoryArrayData () {
    let data = this.state.treeArray, obj = {}, rootId = null;
    data.map((v, i) => {
      if(v[this.state.config.parentId] || v[this.state.config.parentId] === 0) {
          if (obj[v[this.state.config.parentId]]) {
              if (obj[v[this.state.config.parentId]].children) {
                  obj[v[this.state.config.parentId]].children.push(v)
              } else {
                  obj[v[this.state.config.parentId]].children = [v]
              }
          } else {
              obj[v[this.state.config.parentId]] = {
                  children: [v]
              }
          }
      } else {
          rootId = v[this.state.config.id]
      }
      if (obj[v[this.state.config.id]]) {
        v.children = obj[v[this.state.config.id]].children
      }
      obj[v[this.state.config.id]] = v
    })
    this.setState({
      treeData: obj[rootId],
      treeObj: obj
    })
  }

  factoryTreeData () {
    let data = this.state.treeData
  }

  renderTreeParent () {
    return (
        <div className="parentNode">
            {this.state.treeData[this.state.config.label]}
            {
              this.state.treeData.children?
                  this.renderTreeNode(this.state.treeData.children):null
            }
        </div>
    )
  }

  renderTreeNode (data) {
    return data.map((val, ind) => {
      return (
          <div key={ind} className="childNode">
              {val[this.state.config.label]}
              {
                val.children?
                    this.renderTreeNode(val.children):null
              }
          </div>
      )
    })
  }

  render () {
    return (
      <div className="tree">
          {this.renderTreeParent()}
      </div>
    )
  }
}

export default Tree