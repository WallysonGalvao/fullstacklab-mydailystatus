import { useEffect } from "react";
import router from "next/router";
import auth0 from "../lib/auth0";
import { db } from "../lib/db";
import { distance } from "../lib/geo";

const App = (props) => {
  useEffect(() => {
    if (!props.isAuth) router.push("/");
    else if (props.forceCreate) router.push("/create-status");
  });

  if (!props.isAuth || props.forceCreate) return null;
  return (
    <div>
      <h1>App</h1>
      <table>
        {props.checkins.map((checkin) => (
          <tr key={checkin.id}>
            <td>{checkin.id === props.user.sub && "Seus Status"}</td>
            <td>{checkin.distance}</td>
          </tr>
        ))}
      </table>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
    </div>
  );
};

export default App;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  const currentDate = new Date().toISOString().substr(0, 10);
  let checkinsList = [];
  let props = { user: {}, isAuth: false, forceCreate: false, checkins: [] };
  if (session) {
    const { user } = session;
    const todaysCheckin = await db
      .collection("markers")
      .doc(currentDate)
      .collection("checks")
      .doc(user.sub)
      .get();

    const { coordinates } = todaysCheckin.data();
    let forceCreate = true;

    if (coordinates) {
      forceCreate = false;
      const { docs } = await db
        .collection("markers")
        .doc(currentDate)
        .collection("checks")
        .near({
          center: coordinates,
          radius: 1000,
        })
        .get();

      checkinsList = docs.map((doc) => {
        const { status, coordinates } = doc.data();
        const { latitude, longitude } = coordinates;
        const { latitude: lat, longitude: long } = coordinates;

        return {
          id: doc.id,
          status,
          coords: { latitude, longitude },
          distance: distance(lat, long, latitude, longitude),
        };
      });
    }
    props = { user, isAuth: true, forceCreate, checkins: checkinsList };
  }
  return { props };
}
