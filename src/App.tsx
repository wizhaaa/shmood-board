import {useEffect, useState} from "react";

// import Board from "./Board";
import Board from "./lib/Board";
// import "./main.css";

import {Footer} from "./Footer";

const poem1 =
  "The sky here is American like the blue of your eyes \nthe folds of your eyelids the Hindu Kush mountain. \nThe rich vein of the Hindu Kush only a stony ridge \ncutting across the parched soil of Afghanistan \non which the primal play of love.";

const poem2 =
  "Back to Previous The More Loving One BY W. H. AUDEN Looking up at the stars, I know quite well That, for all they care, I can go to hell, But on earth indifference is the least We have to dread from man or beast. How should we like it were stars to burn With a passion for us we could not return? If equally affection cannot be, Let the more loving one be me. Admirer as I think I am Of stars that do not give a damn, I cannot, now I see them, say I missed one terribly all day.";

const icon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk3foOLIFyywPZxD0tOaPCXnsND2mzflXeGQ&usqp=CAU";

const icon2 =
  "https://i.pinimg.com/originals/2c/55/df/2c55dfbb99703261cdf22a315b5f32fe.jpg";

const icon3 =
  "https://img.wattpad.com/24b337b078c3e5e86f2d740a32ac0660c2c4dab7/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f4a7746346a694b47336d746462773d3d2d3638333532373230322e313537623231356131653161623938633239313532373333343133362e6a7067?s=fit&w=720&h=720";
const LOADED_DATA: Item[] = [
  {
    id: "website1",
    position: 0,
    type: "website",
    title: "Website Embeds.",
    icon: icon,
    content:
      "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator",
  },
  {
    id: "figma",
    position: 0,
    type: "website",
    title: "Figma Embeds.",
    icon: icon,
    content:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F6z6LWU99zKuMKViSwenOhD%2FReact-Lib-Things%3Ftype%3Ddesign%26node-id%3D40%253A2%26mode%3Ddesign%26t%3DMIWVtuNkJYLXcU4R-1",
  },
  {
    id: "youtube",
    position: 0,
    type: "website",
    title: "Youtube Embed",
    icon: icon,
    content: "https://www.youtube.com/embed/F8c2SQ7Fwo4?si=roRLIczePm16EVKc",
  },
  {
    id: "1asdfsdaf",
    position: 1,
    type: "image",
    title: "Sand",
    icon: icon,
    content: "https://picsum.photos/id/421/450/950",
  },
  {
    id: "2zzz",
    position: 0,
    type: "image",
    title: "Trolly",
    icon: icon2,
    content: "https://picsum.photos/id/419/950/350",
  },
  {
    id: 3,
    position: 3,
    type: "text",
    title: "Hindu Kush",
    icon: icon3,
    content: poem1,
  },
  {
    id: "4s8923rpqw",
    position: 4,
    type: "image",
    title: "Cabin in the Woods.",
    icon: icon,
    content: "https://picsum.photos/id/424/950/450",
  },
  {
    id: 5,
    position: 5,
    type: "image",
    title: "Coffee Beans",
    icon: icon2,
    content: "https://picsum.photos/id/425/950/450",
  },
  {
    id: "6ekkew",
    position: 6,
    type: "text",
    title: "Poem on Love",
    icon: icon3,
    content: poem2,
  },
  {
    id: "7ok",
    position: 7,
    type: "image",
    title: "Wheat",
    icon: icon,
    content: "https://picsum.photos/id/427/150/1050",
  },
  {
    id: "lesserafim",
    position: 8,
    type: "image",
    title: "Cities and Bikes",
    icon: icon,
    content: "https://picsum.photos/id/212/1450/1450",
  },
  {
    id: "ive",
    position: 19,
    type: "image",
    title: "Water",
    icon: icon2,
    content: "https://picsum.photos/id/909/100/100",
  },
  {
    id: "twice",
    position: 20,
    type: "image",
    title: "Pinecone (greyscale)",
    icon: icon3,
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

import type {Item} from "./lib/Types";

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
