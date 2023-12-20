import data from "./data/gorira.json" with { type: "json" };
const corner_array:string[] = [""]

const page_data = data.pages
const matched_data = page_data.map(
    (page) => page.lines.slice(1).join().match(/#(?![^\[]*])[^\s,]+/)?.[0]
)

const corner_case = matched_data.filter(
    (matched) => matched?.search(/`/) === -1
)

const unique_data = Array.from(new Set(corner_case.filter(
    (matched) => matched !== undefined
)))

const filterd_data = unique_data.filter(
    (data) =>  data !== undefined && !corner_array.includes(data)
)

console.log(filterd_data)
