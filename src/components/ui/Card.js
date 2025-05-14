const MyCard = ({ title, description, emoji }) => {
  return (
    <div className="shadow-lg max-w-sm mx-auto p-4 bg-white rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="mb-2">
        <h2 className="text-xl font-bold">{emoji} {title}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default MyCard;
