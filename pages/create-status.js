import { useState } from "react";
import axios from "axios";
import auth0 from "../lib/auth0";

const status = [
  {
    value: "bem",
    text: "Estou bem e sem sintomas.",
  },
  {
    value: "gripe",
    text: "Estou com sintomas de gripe / resfriado.",
  },
  {
    value: "covid",
    text: "Estou com sintomas da COVID.",
  },
];

const CreateStatus = () => {
  const [data, setData] = useState({
    status: "bem",
    coords: {
      latitude: null,
      longitude: null,
    },
  });

  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setData({ ...data, coords: { latitude, longitude } });
      });
    }
  };

  const onStatusChange = ({ target }) =>
    setData({ ...data, status: target.value });

  const save = async () => {
    await axios.post("/api/save-status", data);
  };

  return (
    <div>
      {status.map(({ value, text }) => (
        <label key={value} className="block">
          <input
            type="radio"
            name="status"
            value={value}
            onClick={onStatusChange}
          />
          {text}
        </label>
      ))}
      Sua posição atual: {JSON.stringify(data)}
      <button onClick={getMyLocation}>Get My Location</button>
      <button onClick={save}>Salvar status</button>
    </div>
  );
};

export default CreateStatus;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  let props = { user: {}, isAuth: false };
  if (session) props = { user: session.user, isAuth: true };
  return { props };
}
