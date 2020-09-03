import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-monokai";

const Editor = (props) => {
  return (
    <AceEditor
      mode={`${props.mode}`}
      theme={`${props.theme}`}
      fontSize={18}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableLiveAutoCompletion: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
    />
  );
};

export default Editor; 