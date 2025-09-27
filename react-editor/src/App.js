import './App.css';
import Editor from './Editor/Editor.js'
function App() {
  var size=window.innerHeight/2;
  return (
    <div className="App" >
        <div className="flexbox-container" style={{minHeight: size-10,display: 'flex'}}>
          <Editor Headername='Html'/>
          <Editor Headername='CSS'/>
          <Editor Headername='Javascript'/>
      </div>
     <div>
       <h1>output</h1>
      </div>

    </div>
  );
}

export default App;
