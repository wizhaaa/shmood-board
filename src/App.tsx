import {useEffect, useState} from "react";

import Board from "./Board";
import "./main.css";

const LOADED_DATA = [
  {
    id: 0,
    position: 0,
    type: "image",
    content: "content",
  },
  {
    id: 1,
    position: 1,
    type: "image",
    content: "content",
  },
  {
    id: 2,
    position: 2,
    type: "text",
    content: "content",
  },
  {
    id: 3,
    position: 3,
    type: "website",
    content: "content",
  },
  {
    id: 4,
    position: 4,
    type: "image",
    content: "content",
  },
  {
    id: 5,
    position: 5,
    type: "text",
    content: "content",
  },
  {
    id: 6,
    position: 6,
    type: "website",
    content: "content",
  },
];

function App() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(LOADED_DATA);
  }, []);

  return (
    <>
      Board
      <Board items={data} />
    </>
  );
}

// type ItemType = {
//   id: number | string;
//   position: number;
//   content: string;
//   type: "image" | "text" | "website";
// };

// type LibraryProps = {
//   items: ItemType[];
//   itemWidth: number;
//   footerContent: React.ReactNode;
//   onReorder?: (newItems: ItemType[]) => void;
//   className: string;
//   minimal?: boolean;
//   options?: {
//     icon: React.ReactNode;
//     onClick: () => void;
//   }[];
// };

export default App;
