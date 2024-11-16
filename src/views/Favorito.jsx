import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Titulo from "../components/Titulo";
import CollaresList from "../components/CollaresList";

const Favorito = () => {
  return (
    <>
      <Navbar />
      <Titulo titulo="Mis favoritos" />
      <CollaresList>
        <Card />
      </CollaresList>
      <Footer />
    </>
  );
};

export default Favorito;
