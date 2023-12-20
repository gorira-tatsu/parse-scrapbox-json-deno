import data from "./data/gorira.json" with { type: "json" };

const corner_array:string[] = []
const page_data = data.pages
const matched_data = page_data.map(
    (page) => page.lines.slice(1).join().match(/#(?![^\[]*])[^\s,]+/)?.[0]
)

const LinkedAllTagPageid = () => {
    let AllLinked = new Map([

    ]);

    page_data.map(
        (page) => {
            const CheckTheTag = page.lines.slice(1).join().match(/#(?![^\[]*])[^\s,]+/)?.[0]
            if (CheckTheTag && !AllLinked.has(CheckTheTag)) {
                const LinkedTagPageids: string[] = [String(page.id)]
                AllLinked.set(CheckTheTag, LinkedTagPageids)
            }
            else if (CheckTheTag && AllLinked.has(CheckTheTag)) {
                const LinkedTagPageids: string[] = Array.from(AllLinked.get(CheckTheTag) || [])
                LinkedTagPageids.push(String(page.id));
                AllLinked.set(CheckTheTag, LinkedTagPageids)
            }
        }
    )

    return AllLinked
}


console.log(LinkedAllTagPageid().get("#見た記事").length!)

// const corner_case = matched_data.filter(
//     (matched) => matched?.search(/`/) === -1
// )
//
// const unique_data = corner_case.filter(
//     (matched) => matched !== undefined
// )
//
// const filterd_data = unique_data.filter(
//     (data) =>  data !== undefined && !corner_array.includes(data)
// )

