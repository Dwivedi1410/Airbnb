import { Link } from "react-router-dom";

const RegisteredPlaces = ({ item }) => {
  const imageURL = item.photos?.[0];
  
  return (
    <Link
      to={`/user/accommodations/${item._id}`}
      className="flex flex-col sm:flex-row gap-4 mt-4 p-4 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-100 hover:border-gray-300"
    >
      <div className="w-full sm:w-48 h-48 sm:h-36 flex-shrink-0 overflow-hidden">
        {imageURL ? (
          <img 
            src={imageURL} 
            className="w-full h-full object-cover rounded-xl"
            alt={item.title} 
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-semibold mb-2 truncate text-gray-900">
          {item.title}
        </h1>
        <p className="text-gray-600 line-clamp-3 text-base">
          {item.description}
        </p>
      </div>
    </Link>
  );
};

export default RegisteredPlaces;