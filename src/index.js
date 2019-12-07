import "./index.css";
import "./md.css";

import React, { useState, Component, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";

var showdown = require("showdown"),
  converter = new showdown.Converter();



// text      = '# hello, markdown!',
// html      = converter.makeHtml(text);

// var ace = require('brace');
// require('brace/mode/markdown');
// require('brace/theme/github');
// const root = document.createElement('div')
// document.body.appendChild(root)
// root.style.height = '100vh'
// root.style.width = '600px'
//      var editor = ace.edit(root);
//      editor.getSession().setMode('ace/mode/markdown');
//      editor.setTheme('ace/theme/github');

//      editor.clearSelection();

// 字体
// font-family: Menlo,"Ubuntu Mono",Consolas,"Courier New",Microsoft Yahei,Hiragino Sans GB,WenQuanYi Micro Hei,sans-serif;

// l.addEventListener('scroll', ()=>{
//   if (currentTab !== 1) return
//   r.scrollTop = l.scrollTop * scale
// })
// r.addEventListener('scroll', ()=>{
//   if (currentTab !== 2) return
//   l.scrollTop = r.scrollTop / scale
// })
// l.addEventListener('mouseover', ()=>{
//   // 1 表示表示当前鼠标位于 .left元素范围内
//   currentTab = 1
// })
// r.addEventListener('mouseover', ()=>{
//   // 2 表示表示当前鼠标位于 .right元素范围内
//     currentTab = 2
// })

const leftScroll = e => {
   let p = document.querySelector('#left .ace_scrollbar').scrollTop / (document.querySelector('#left .ace_scrollbar-inner').clientHeight -  document.querySelector('#left .ace_scrollbar').clientHeight)
   document.getElementById('right').scrollTop =  document.querySelector('#left .ace_scrollbar').scrollTop
}

const rightScroll = e => {
  document.querySelector('#left .ace_scrollbar').scrollTop =  e.target.scrollTop
}

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [md, setMd] = useState('');
  function onChange(newValue) {
    setMd(newValue)
  }
  return (
    <div id={"app"}
    >
        <AceEditor
          mode="markdown"
          height={'100vh'}
          theme="github"
          width={"100%"}
          fontSize={16}
          showGutter={false}
          enableBasicAutocompletion={true}
          value={md}
          onChange={onChange}
          wrapEnabled={true}
          debounceChangePeriod={20}
          name="left"
      
          onScroll={leftScroll}
        />

      <div id="right" onScroll={rightScroll} className={'markdown-body'} >
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(md)}} />
      </div>
    </div>
  );
}

class App extends Component {
  render() {
    return <Example />;
  }
}

ReactDOM.render(<App />, document.querySelector("body"));
