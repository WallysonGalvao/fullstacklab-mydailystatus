import auth0 from "../lib/auth0";

const App = (props) => <pre>{JSON.stringify(props, null, 2)}</pre>;

export default App;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req);
  const props = { user: {} };
  if (session) props.user = session.user;
  return props;
}
