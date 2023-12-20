import data from "./data/gorira.json" with { type: "json" };

const page_data = data.pages

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


console.log(LinkedAllTagPageid())