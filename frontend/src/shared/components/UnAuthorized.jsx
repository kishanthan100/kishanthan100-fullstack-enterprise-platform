import unautherized from "../../assets/401.png";

const UnAutherized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <img
        src={unautherized}
        alt="Access Forbidden"
        className="w-80 mb-6"
      />

      <h1 className="text-3xl font-bold text-red-600 mb-2">
        401 - Unautherized
      </h1>

      <p className="text-gray-600">
        Your Session has been Expired.....
      </p>
    </div>
  );
};

export default UnAutherized;