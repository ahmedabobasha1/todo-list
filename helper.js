
const fs = require("fs");

function add(parseData) {

    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const todo = {
        id: res[res.length - 1].id + 1,
        title: parseData.title,
        body: parseData.body,
        checked: false
    }
    res.push(todo);
    fs.writeFileSync("./db.json", JSON.stringify(res));

}

function edit(id, parseData) {
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    let idNum = parseInt(id);
    const { title, body } = parseData
    const newData = res.find((elm) => { return elm.id === idNum });
    newData.title = title;
    newData.body = body;

    fs.writeFileSync('./db.json', JSON.stringify(res))
}

function remove(id) {
    const res = JSON.parse(fs.readFileSync('./db.json', "utf-8"));
    const fres = res.filter((elm) => { return elm.id !== parseInt(id) });
    fs.writeFileSync('./db.json', JSON.stringify(fres))

}
function listall() {
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
    return res;
}
function listchecked() {
    let res = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const newData = res.filter((elm) => { return elm.checked == true });



}

function listunchecked() {
    let res = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    const newData = res.filter((elm) => { return elm.checked == false });

}

function check(id) {
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const idNum = parseInt(id);
    const newData = res.find((elm) => { return (elm.id === idNum) });
    newData.checked = true
    fs.writeFileSync("./db.json", JSON.stringify(res));
    return newData
}
function uncheck(id) {
    let res = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

    const idNum = parseInt(id);
    const newData = res.find((elm) => { return (elm.id === idNum) });
    newData.checked = false
    fs.writeFileSync("./db.json", JSON.stringify(res));
    return newData
}

module.exports = { add, edit, remove, listall, listchecked, listunchecked, check, uncheck };

