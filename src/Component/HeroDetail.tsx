import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Hero {
  id: number;
  name: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
  };
}

const HeroDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Lấy id từ URL
  const [hero, setHero] = useState<Hero | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHeroes = JSON.parse(localStorage.getItem("heroes") || "[]");
    const foundHero = storedHeroes.find(
      (hero: Hero) => hero.id === parseInt(id!)
    ); // Tìm hero theo id
    setHero(foundHero || null); // Nếu không tìm thấy thì hero là null
  }, [id]);

  if (!hero) {
    return <div>Không tìm thấy Hero!</div>;
  }

  const gotoHeroInf = () => {
    navigate("/infor");
  };

  return (
    <>
      <div className="">
        <p className="flex mt-5 ml-10 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
            onClick={() => navigate(-1)} // Điều hướng quay lại
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          Trang chu
        </p>
        <div className="container ml-10 px-4 w-[80%] mt-5 flex ">
          <img
            src={hero.image}
            alt={hero.name}
            className=" h-70 object-cover rounded mb-4"
          />

          <div className="text-lg ml-10 w-[80%]">
            <h1 className="text-4xl font-bold mb-4">{hero.name}</h1>
            <p>Tấn công: {hero.stats.attack}</p>
            <div className="text-lg">
              <p>Phòng thủ: {hero.stats.defense}</p>
            </div>
          </div>
        </div>

        {/* <button
        onClick={() => navigate(-1)} // Điều hướng quay lại
        className="mt-5 ml-10 bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        Trang chủ
      </button> */}
        <a href="" onClick={gotoHeroInf} className="underline ml-12">
          Chi tiết về Hero
        </a>
      </div>
    </>
  );
};

export default HeroDetail;
