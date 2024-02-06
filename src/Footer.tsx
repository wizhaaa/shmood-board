import "./footer.css";

export function Footer(id: string | number) {
  const special = id === "2zzz";
  return (
    <div className={"wz-footer wz-normal" + (special ? " wz-longer" : "")}>
      Footer for item with {id}
      {special && (
        <span>
          Special Render for item 2zzzz (should be an image of a train/subway).{" "}
        </span>
      )}
    </div>
  );
}
