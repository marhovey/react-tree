import React from 'react'
import reactDOM from 'react-dom';
import './app.less';
import Tree from './components/Tree.jsx';
import { treeData, config } from "./data/feakData";

reactDOM.render(<Tree config={ config } treeData={ treeData } />, document.getElementById('react-tree'))