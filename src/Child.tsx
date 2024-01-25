import "./child.css";
export function Child(props: any) {
  const {text} = props;
  return <div className="child"> Child: {text} </div>;
}
