import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <>
            <div className="container">
                <br />
                <div className="row">
                    <div className="col-lg-10">
                        <hr />
                        <div className="row">
                            <div className="col-sm-7">
                                <form>
                                    <input type="text" className="form-control" placeholder="Search For Titles" />
                                </form>
                            </div>
                            <div className="col-sm-5">
                                <form>
                                    <div class="form-row">
                                        <div class="col">
                                            <select value="Easy" className="form-control form-inline">
                                                <option value="Easy">Easy</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Hard">Hard</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <select value="Array" className="form-control form-inline">
                                                <option value="Array">Array</option>
                                                <option value="Stack">Stack</option>
                                                <option value="Linked List">Linked List</option>
                                            </select>
                                        </div>
                                        <div class="col">
                                            <select value="Done" className="form-control form-inline">
                                                <option value="Done">Done</option>
                                                <option value="ToDo">ToDo</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <hr />
                        <div className="box-element">
                            <div className="cart-row">
                                <div style={{ flex: 1 }}>#</div>
                                <div style={{ flex: 3 }}><strong>Title</strong></div>
                                <div style={{ flex: 1 }}><strong>Difficulty</strong></div>
                            </div>
                            <Link to='/compete/1'>
                                <div className="cart-row">
                                    <div style={{ flex: 1 }}>1</div>
                                    <div style={{ flex: 3 }}>Add two Numbers</div>
                                    <div style={{ flex: 1 }}><button className="btn btn-success btn-small">Easy</button></div>
                                </div>
                            </Link>
                            <Link to='/compete/2'>
                                <div className="cart-row">
                                    <div style={{ flex: 1 }}>2</div>
                                    <div style={{ flex: 3 }}>Multiply two Numbers</div>
                                    <div style={{ flex: 1 }}><button className="btn btn-warning btn-small">Medium</button></div>
                                </div>
                            </Link>
                            <Link to='/compete/3'>
                                <div className="cart-row">
                                    <div style={{ flex: 1 }}>3</div>
                                    <div style={{ flex: 3 }}>Divide two Numbers</div>
                                    <div style={{ flex: 1 }}><button className="btn btn-danger btn-small">Difficult</button></div>
                                </div>
                            </Link>
                        </div>
                        <hr />

                    </div>

                    <div className="col-lg-2">
                        <hr />
                        <form>
                            <label for="companies">Companies:</label>
                            <select value="Done" id="companies" className="form-control form-inline">
                                <option value="Amazon">Amazon</option>
                                <option value="Facebook">Facebook</option>
                            </select>
                            <br />
                            <label for="tags">Topic Tags:</label>
                            <select value="Array" id="tags" className="form-control form-inline">
                                <option value="Array">Array</option>
                                <option value="Stack">Stack</option>
                                <option value="Linked List">Linked List</option>
                            </select>
                            <br />
                            <label for="difficulty">Difficulty:</label>
                            <select value="Easy" id="difficulty" className="form-control form-inline">
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;