import Card from "../components/Card";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import CollaresList from "../components/CollaresList";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <CollaresList>
        <Card />
      </CollaresList>
    </>
  );
};

export default Home;