const CollaresList = ({ children }) => {
  return (
    <div className="container my-4">
      <div className="row row-cols-1 row-cols-md-4 g-4">{children}</div>
    </div>
  );
};

export default CollaresList;
