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
        id: 'id'
      }
    }
  }

  componentWillMount () {
    if (this.props.treeType.toLowerCase() === 'tree') {
      this.setState({
        treeData: this.props.treeData,
        type: this.props.treeType.toLowerCase()
      })
    } else {
      this.setState({
        treeArray: this.props.treeData,
        type: this.props.treeType.toLowerCase()
      })
    }
  }

  componentDidMount () {
    if (this.state.type !== 'tree') {
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
    let data = this.state.treeArray, obj;
    data.map((v, i) => {})
  }

  factoryTreeData () {
    let data = this.state.treeData
  }

  render () {
    return (
      <div className="tree">
        哈哈哈
      </div>
    )
  }
}

export default Tree