import {useEffect, useState} from "react";

// import Board from "./Board";
import Board from "./lib/Board";
// import "./main.css";

import {Child} from "./Child";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const LOADED_DATA = [
  {
    id: "1asdfsdaf",
    position: 1,
    type: "image",
    content: "https://picsum.photos/id/421/450/950",
  },
  {
    id: "2zzz",
    position: 2,
    type: "image",
    content: "https://picsum.photos/id/419/950/350",
  },
  {
    id: 3,
    position: 3,
    type: "text",
    content: lorem,
  },
  {
    id: "4s8923rpqw",
    position: 4,
    type: "image",
    content: "https://picsum.photos/id/424/950/450",
  },
  {
    id: 5,
    position: 5,
    type: "image",
    content: "https://picsum.photos/id/425/950/450",
  },
  {
    id: "6ekkew",
    position: 6,
    type: "text",
    content: lorem,
  },
  {
    id: "7ok",
    position: 7,
    type: "image",
    content: "https://picsum.photos/id/427/150/1050",
  },
  {
    id: "lesserafim",
    position: 8,
    type: "image",
    content: "https://picsum.photos/id/212/450/450",
  },
  {
    id: "ive",
    position: 9,
    type: "image",
    content: "https://picsum.photos/id/909/100/100",
  },
  {
    id: "twice",
    position: 10,
    type: "image",
    content: "https://picsum.photos/id/80/300/300",
  },
];

function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(LOADED_DATA);
  }, []);

  function onReorder(newItems: Item[]) {
    console.log("Items Re-ordered: ", newItems);
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
        className={className}
        footerContent={<Child />}
      />
    </>
  );
}

type Item = {
  id: number | string;
  position: number;
  content: string;
  type: "image" | "text" | "website";
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
