import { Link } from "react-router-dom";

const GNB = () => {
  const path = window.location.pathname;
  return (
    <div className="w-full h-[85px] flex items-center rounded-xl bg-gray-200 p-2 min-w-[325px]">
      <Link to={`/`} className={`flex-1 flex justify-center items-center h-full mr-1 rounded-xl ${path === "/" ? "bg-white" : "text-gray-500"}`}>
        <div className="flex flex-col gap-1">
          <h2 className={`flex-1 text-xl font-bold whitespace-nowrap ${path === "/" ? "text-black" : "text-gray-500"}`}>가상자산 시세 목록</h2>
        </div>
      </Link>
      <Link to={`/scrap`} className={`flex-1 flex justify-center items-center h-full mr-1 rounded-xl ${path === "/scrap" ? "bg-white" : "text-gray-500"}`}>
        <div className="flex flex-col gap-1">
          <h2 className={`text-xl font-bold ${path === "/scrap" ? "text-black" : "text-gray-500"}`}>스크랩</h2>
        </div>
      </Link>
    </div>
  );
};

export default GNB;
