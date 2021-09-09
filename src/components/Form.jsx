import { useDispatch } from "react-redux";
import { changeStatus, get } from "../reducer/listSlice";
import { URL, pending, error, success } from "../URL";
import { useEffect, useState } from "react";
import Spiner from "./Spiner";

const initail = {
  id: null,
  name: '',
  price: '',
  content: '',
}

export default function Form(props) {
  const [item, setItem] = useState(initail);
  const dispatch = useDispatch();
  const [localPending, setLocalPending] = useState(true)

  const id = props.match.params.id.slice(1)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({...item, [name]: value})
  };

  useEffect(() => {
    fetch(`${URL}/${id}`)
    .then((res) => {
      console.log(res)
      return res.json();
    })
    .then((data) => {
      console.log(data)
      setItem(data);
      setLocalPending(false);
    })
    .catch((err) => {
      dispatch(changeStatus(error));
      console.error(err);
    })
  }, [])

  const handleCancel = () => {
    setItem(initail);
    props.history.push(`/`);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeStatus(pending))
    fetch(URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 2,
        name: item.name,
        price: item.price,
      }),
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
    setItem(initail);
    props.history.push(`/`);
  };

  if (localPending) return <Spiner />

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="service">Услуга</label>
        <input
          type="text"
          name="name"
          value={item.name}
          onChange={handleChange}
          className="form-control"
          id="service"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Цена</label>
        <input
          name="price"
          value={item.price}
          onChange={handleChange}
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="content">Содержание</label>
        <input
          name="content"
          value={item.content}
          onChange={handleChange}
          type="text"
          className="form-control"
          id="content"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Сохранить
      </button>
      {id ? (
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleCancel}
        >
          Отмена
        </button>
      ) : (
        false
      )}
    </form>
  );
}
