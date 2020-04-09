import Heder from "../components/Header";
import Footer from "../components/Footer";

import "../styles/styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Heder />
      <div className="min-h-screen container mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
};

export default App;
