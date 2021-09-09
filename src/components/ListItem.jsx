import { useDispatch } from "react-redux";
import { get, changeStatus } from "../reducer/listSlice";
import { URL, pending, error, success } from "../URL";

export default function ListItem(props) {
  const { name, price, id } = props.item;

  const dispatch = useDispatch();

  const getData = () => {
    dispatch(changeStatus(pending));
    fetch(URL, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(get(data));
        dispatch(changeStatus(success));
      })
      .catch((err) => {
        console.error(err);
        dispatch(changeStatus(error));
      });
  };

  const handleRemove = () => {
    dispatch(changeStatus(pending));
    console.log(id);
    fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
      })
      .catch((err) => {
        console.error(err);
        dispatch(changeStatus(error));
      })
      .finally(() => {
        getData();
      });
  };

  const handleEdit = () => {
    props.history.push(`/services/:${id}`);
  };

  return (
    <li className="list-group-item">
      <div>
        <span>{name} </span>
        <span>{price} </span>
        <button type="button" className="btn btn-dark" onClick={handleRemove}>
          X
        </button>
        <button type="button" className="btn btn-danger" onClick={handleEdit}>
          Edit
        </button>
      </div>
    </li>
  );
}
