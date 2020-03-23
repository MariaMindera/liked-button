import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import cx from "classnames";

import "./styles.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 100, error: "" };
        this.liked = false;
    }

    like = () => {
        fetch("http://localhost:3000/")
            .then(data => data.json())
            .then(data => {
                if (data) {
                    this.liked = !this.liked;
                    this.setState(({ count }) =>
                        this.liked
                            ? { count: count + 1, error: "" }
                            : { count: count - 1, error: "" }
                    );
                } else {
                    this.setState(() => ({
                        error: "ERROR"
                    }));
                }
            });
    };

    render() {
        const { count, error } = this.state;
        return (
            <Fragment>
                <button
                    type="button"
                    onClick={this.like}
                    className={cx("like-button", { liked: this.liked })}
                >
                    Like | <span className="likes-counter">{count}</span>
                </button>
                <p>{error}</p>
            </Fragment>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
