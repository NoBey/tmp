import "./index.css";
import "./md.css";

import React, { useState, Component, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-dawn";

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

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [md, setMd] = useState('');
  function onChange(newValue) {
    setMd(newValue)
  }
  return (
    <div id={"app"}>
        <AceEditor
          mode="markdown"
          height={'100vh'}
          theme="dawn"
          width={"100%"}
          fontSize={16}
          showGutter={false}
          enableBasicAutocompletion={true}
          value={md}
          onChange={onChange}
          wrapEnabled={true}
          debounceChangePeriod={300}
          name="left"
          editorProps={{ $blockScrolling: true }}
        />

      <div id="right"  className={'markdown-body'} dangerouslySetInnerHTML={{__html: converter.makeHtml(md)}}></div>
    </div>
  );
}

class App extends Component {
  render() {
    return <Example />;
  }
}

ReactDOM.render(<App />, document.querySelector("body"));
