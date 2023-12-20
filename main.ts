import data from "./data/gorira.json" with { type: "json" };

const corner_array:string[] = []
const page_data = data.pages
const matched_data = page_data.map(
    (page) => page.lines.slice(1).join().match(/#(?![^\[]*])[^\s,]+/)?.[0]
)

const LinkedAllTagPageid = () => {
    let AllLinked = new Map();

    page_data.forEach((page) => {
        const CheckTheTag = page.lines.slice(1).join().match(/#(?![^\[]*])[^\s,]+/g);
        if (CheckTheTag) {
            CheckTheTag.forEach((tag) => {
                if (!AllLinked.has(tag)) {
                    AllLinked.set(tag, [String(page.id)]);
                } else {
                    const LinkedTagPageids: string[] = Array.from(AllLinked.get(tag) || []);
                    LinkedTagPageids.push(String(page.id));
                    AllLinked.set(tag, LinkedTagPageids);
                }
            });
        }
    });

    return AllLinked;
};


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

