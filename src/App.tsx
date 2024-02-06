import {useEffect, useState} from "react";

// import Board from "./Board";
import Board from "./lib/Board";
// import "./main.css";

import {Footer} from "./Footer";

const poem1 =
  "The sky here is American like the blue of your eyes \n the folds of your eyelids the Hindu Kush mountain. \n The rich vein of the Hindu Kush only a stony ridge \n cutting across the parched soil of Afghanistan \n on which the primal play of...";

const poem2 =
  "Back to Previous The More Loving One BY W. H. AUDEN Looking up at the stars, I know quite well That, for all they care, I can go to hell, But on earth indifference is the least We have to dread from man or beast. How should we like it were stars to burn With a passion for us we could not return? If equally affection cannot be, Let the more loving one be me. Admirer as I think I am Of stars that do not give a damn, I cannot, now I see them, say I missed one terribly all day.";

const LOADED_DATA: Item[] = [
  {
    id: "1asdfsdaf",
    position: 1,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/421/450/950",
  },
  {
    id: "2zzz",
    position: 0,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/419/950/350",
  },
  {
    id: 3,
    position: 3,
    type: "text",
    title: "Dan's Post",
    content: poem1,
  },
  {
    id: "4s8923rpqw",
    position: 4,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/424/950/450",
  },
  {
    id: 5,
    position: 5,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/425/950/450",
  },
  {
    id: "6ekkew",
    position: 6,
    type: "text",
    title: "Dan's Post",
    content: poem2,
  },
  {
    id: "7ok",
    position: 7,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/427/150/1050",
  },
  {
    id: "lesserafim",
    position: 8,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/212/450/450",
  },
  {
    id: "ive",
    position: 19,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/909/100/100",
  },
  {
    id: "twice",
    position: 20,
    type: "image",
    title: "Dan's Post",
    content: "https://picsum.photos/id/80/300/300",
  },
];

function App() {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    setData(LOADED_DATA);
  }, []);

  function onReorder(newItems: Item[]) {
    console.log("Items Re-ordered: ", newItems);
  }
  function onDelete(id: string | number) {
    console.log("Item Deleted ", id);
  }
  function onEdit(modifiedItem: Item) {
    console.log("Item Edited ", modifiedItem);
  }

  const className = "wz-className";

  return (
    <>
      Board
      <Board
        items={data}
        itemWidth={400}
        styles={{
          gridGap: 50,
        }}
        minimal={false}
        onReorder={onReorder}
        onDelete={onDelete}
        onEdit={onEdit}
        className={className}
        footerContent={Footer}
      />
    </>
  );
}

type Item = {
  id: number | string;
  position: number;
  type: "image" | "text" | "website";
  title: string;
  content: string;
};

// type LibraryProps = {
//   items: ItemType[]; x
// > itemWidth: number;
//   footerContent: React.ReactNode; x
//   onReorder?: (newItems: ItemType[]) => void; x
//   className: string; x
//   minimal?: boolean; x
// > options?: {
//     icon: React.ReactNode;
//     onClick: () => void;
//   }[];
// };

export default App;
