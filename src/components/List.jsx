import ListItem from "./ListItem";
import { useSelector } from "react-redux";

export default function List(props) {
  const list = useSelector((state) => state.list.data);

  return (
    <div>
      <ul className="list-group">
        {list.map((el) => {
          return <ListItem {...props} item={el} key={el.id} />;
        })}
      </ul>
    </div>
  );
}
