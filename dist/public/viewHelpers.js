"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function fetchData(url, method, body) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                cookie: `jwt=${cookieExtractor}`
            },
            body: JSON.stringify(body)
        });
        return {
            data: await response.json(),
            ok: response.ok
        };
    }
    catch (error) {
        console.log(error);
    }
}
async function deletePost(postId) {
    const response = await fetchData(`/view/posts/delete/${postId}`, "DELETE");
    if (!response.ok)
        return console.log("Error");
}
function hello() {
    console.log("param");
}
function cookieExtractor(req) {
    let token = null;
    if (req && req.cookies)
        token = req.cookies['jwt'];
    return token;
}
