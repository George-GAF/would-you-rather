import React from "react"
import "../style.css";

function MyAnswer(props) {
    const word = "Your choice"
    return (
        <div id="outer">
            <div id="inner">
                <span> {word} </span>
            </div>
        </div>
    )
}

export default MyAnswer