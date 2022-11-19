import React, { useState } from "react";
import config from "config.js";

class API {
    makeRequest(method, path, headers, params, body) {
        const searchParams = new URLSearchParams(params);
        // TODO: change url to URL()

        return fetch(config.svurl + path + searchParams.toString(), {
            method: method,
            headers: headers,
            body: JSON.stringify(body),
        }).then((response) => response.json());
    }

    getQuizzes() {
        this.makeRequest("GET", "/quizzes", {}, {}, {});
    }
}

/*function API(props) {
    let [method, setMethod] = useState("GET");
    let [url, setUrl] = useState(props.url);
    let [body, setBody] = useState({});
    let [params, setParams] = useState({});

    let [isFirst, setFirst] = useState(true);
    let [result, setResult] = useState([]);

    if (isFirst) {
        if (props.method !== undefined) {
            setMethod(props.method);
        }
        if (props.body !== undefined) {
            setBody(props.body);
        }
        if (props.params !== undefined) {
            setParams(props.params);

            let i = 0;
            let text = url;
            Object.keys(props.params).forEach((key) => {
                if (i == 0) {
                    text += "?" + key + "=" + props.params[key];
                    i++;
                } else {
                    text += "&" + key + "=" + props.params[key];
                }
            });

            setUrl(text);
        }
        setFirst(false);
    }

    fetch(url, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((data) => {
            setResult(data.quizzes);
        });

    console.log(result);
    return;
}
*/

export default API;

/*fetch({url}, {
    method: {method},
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({body}),
}).then((response) => response.json());

fetch("http://localhost:8000/api/tests/", {
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ quizzes: quizzes_ids, name: name, author: 1 }),
}).then((response) => response.json());*/

/*<div>
            fetch(
            {url}, &#123; method: {method}, body: JSON.stringify(body), &#125;
            ).then((response) ={">"} response.json());
        </div> */
