# shmood-board: a drag & drop library 

Shmood DND Board is a simple gallery view for drag and droppable, sortable, and movable grid items. Allows you to edit text and displays images.

## Want to use in your application?

### Yarn

```bash
 yarn add shmood-dnd-board
```

### NPM

```bash
 npm install shmood-dnd-board
```

## Code

### Imports:

```typescript
import {Board, Item} from "shmood-dnd-board";
import "shmood-dnd-board/shmood-board.css";
```

### Init Sample Data

```javascript
import "./App.css";

import {Board, Item} from "shmood-dnd-board";
import "shmood-dnd-board/shmood-board.css";

import {Footer} from "./Footer";

// import "./board.css";

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
function App() {
  const LOADED_DATA: Item[] = [
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
      position: 2,
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
      position: 9,
      type: "image",
      title: "Water",
      icon: icon2,
      content: "https://picsum.photos/id/909/100/100",
    },
    {
      id: "twice",
      position: 10,
      type: "image",
      title: "Pinecone (greyscale)",
      icon: icon3,
      content: "https://picsum.photos/id/80/300/300",
    },
  ];

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
      Testing DND NPM LIBRARY aasaaa
      <div>
        <Board
          items={LOADED_DATA}
          styles={{
            gridGap: 50,
          }}
          minimal={false}
          itemWidth={400}
          onReorder={onReorder}
          onDelete={onDelete}
          onEdit={onEdit}
          className={className}
          footerContent={Footer}
        />
      </div>
    </>
  );
}

export default App;

```


## Contributing:

Run with

```bash
yarn dev
```

# Feb 6 Screenshots
## Layout
<img width="1579" alt="Screenshot 2024-02-06 at 12 39 25 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/93d4012f-47f0-4106-8665-a5599343fdeb">

## Draggable on Hover 
<img width="367" alt="Screenshot 2024-02-06 at 12 39 41 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/62246cb5-b3e7-4399-b17b-8fc8f7710c97">

## Variable Footer Heights
<img width="1170" alt="Screenshot 2024-02-06 at 12 40 07 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/6113d8ca-60ed-4c4f-adbf-597b0e9e84f6">

## Options Dropdown
<img width="394" alt="Screenshot 2024-02-06 at 12 40 57 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/eb5732bc-7601-4b31-896f-91ae2e22bf4a">

## Website & Embeds Support
![PNG image](https://github.com/wizhaaa/shmood-board/assets/46132945/30da697b-7553-46fe-9231-82f20c70ddc4)

## Editing a Photo
<img width="380" alt="Screenshot 2024-02-06 at 12 41 27 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/cc99416e-5d6b-47ac-ba39-37595f42a03e">

## Editing a Text Item
<img width="392" alt="Screenshot 2024-02-06 at 12 42 17 PM" src="https://github.com/wizhaaa/shmood-board/assets/46132945/934927fa-6263-4678-998b-84e2b7e7738a">


# Jan 24 Update - _Images & Text_

## Editing + Moving

https://github.com/wizhaaa/shmood-board/assets/46132945/1098072f-f0ac-48f0-aa52-c63b717dc835

## Deleting

https://github.com/wizhaaa/shmood-board/assets/46132945/bb3c946d-bf22-4f0d-bfe4-4b208f9049db

# Jan 23 Update

https://github.com/wizhaaa/shmood-board/assets/46132945/5754286a-6698-4727-89b3-2ce3e81e45b7
