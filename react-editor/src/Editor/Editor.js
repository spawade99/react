import './Editor.css';
// import Button from 'react-bootstrap/Button'
function Editor(props){
    return(
        <div className="editor">
            <div className="editor-header">
            {props.Headername}
            <button className="editor-btn">Close/open</button>
            </div>
            <div className="editor-input">
               <input/>
            </div>                 
        </div> 
    )
}
export default Editor;