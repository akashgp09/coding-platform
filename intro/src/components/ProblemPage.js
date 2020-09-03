import React from 'react';
import Editor from './Editor';

class ProblemPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme: "github",
            mode: "c_cpp"
        };
    }

    handleThemeChange = (event) => {
        this.setState({
            theme: event.target.value,
            mode: this.state.mode
        });
    }

    handleModeChange = (event) => {
        this.setState({
            theme: this.state.theme,
            mode: event.target.value
        });
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row box-element">
                        <div className="col-md-6 box-element" style={{ overflow: "auto" }}>
                            <br />
                            <h4>#1 Add Two Numbers <button className="btn btn-success disabled" style={{ float: "right", height: "40px" }}>Easy</button></h4>
                            <hr />
                            <div className="description">
                                <h4>Description</h4>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolores ut placeat quas laudantium sequi, molestiae delectus harum voluptatum provident aspernatur exercitationem ipsam nulla illum rem, quod hic repellendus quam!
                            </div>
                            <hr />
                            <div className="example1">
                                <h4>Example 1</h4>
                                <strong>Input:</strong>
                                <br />
                                <strong>Output:</strong>
                                <br />
                                <hr />
                            </div>
                            <div className="example1">
                                <h4>Example 2</h4>
                                <strong>Input:</strong>
                                <br />
                                <strong>Output:</strong>
                                <br />
                                <hr />
                            </div>
                            <div className="constraints">
                                <h4>Constraints</h4>
                                <strong>Time Complexity:</strong> O(n^2)
                                <br />
                                <strong>Space Complexity:</strong> O(n)
                                <br />
                                A between 100 and 200
                                <br />
                                B between 100 and 200
                                <hr />
                                <button className="btn btn-outline-primary" style={{ float: "right" }}>Next</button>
                                <button className="btn btn-outline-primary" style={{ float: "left" }}>Prev</button>
                            </div>
                        </div>
                        
                        <div className="col-md-6 box-element">
                            <h1>Code Here!</h1>
                            <form>
                                <div className="form-row">
                                    <div className="col">
                                    <select className="form-control" value={this.state.mode} onChange={this.handleModeChange}>
                                        <option value="c_cpp">C</option>
                                        <option value="python">Python</option>
                                        <option value="java">Java</option>
                                    </select>
                                    </div>
                                    <div className="col">
                                    <select className="form-control" value={this.state.theme} onChange={this.handleThemeChange}>
                                        <option value="monokai">Monokai</option>
                                        <option value="github">Github</option>
                                        <option value="kuroir">kuroir</option>
                                    </select>
                                    </div>
                                </div>
                            </form>
                            <Editor mode={this.state.mode} theme={this.state.theme} />
                            <hr />
                            <button className="btn btn-success" style={{ float: "right" }}>Submit</button>
                            <button className="btn btn-warning" style={{ float: "right" }}>Run</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ProblemPage;
