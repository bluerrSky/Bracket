import CodeEditor from "../../components/Editor/Editor"

export default function REPL(){
    return (
        <div className="editor">
            <div className="problemDesc"></div>
            <div className="codeEditor">
                <CodeEditor/>
            </div>
        </div>
    )
}