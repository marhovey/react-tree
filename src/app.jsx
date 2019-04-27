import React from 'react'
import reactDOM from 'react-dom';
import './app.less';
import Tree from './components/Tree.jsx';
import { treeData, config } from "./data/feakData";

function nodeClick (data) {
  console.log(data)
}
reactDOM.render(<Tree config={ config } treeData={ treeData } nodeClick={(data) => nodeClick(data)} />, document.getElementById('react-tree'))