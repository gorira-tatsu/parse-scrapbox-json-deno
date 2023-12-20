import data from "./data/gorira.json" with { type: "json" };

const page_data = data.pages

const LinkedAllTagPageid = () => {
    const AllLinked = new Map();

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


const LinkedList = LinkedAllTagPageid()
const deleted_list:string[] = []
const deleted_tag_list= ["#member","#見た記事"]
deleted_tag_list.forEach(
    (tag) => { deleted_list.push(...LinkedList.get(tag)); }
)

const deleted_page = data.pages.filter(
    (page) => (
        !deleted_list.includes(String(page.id))
    )
)

console.log(deleted_list.length)
console.log(deleted_page.length)
