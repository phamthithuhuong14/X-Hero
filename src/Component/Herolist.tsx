import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Routes, useNavigate } from "react-router-dom";
import "../App.css";
import { toast } from "react-toastify";

interface Hero {
  id: number;
  name: string;
  image: string;
  stats: {
    attack: number; //tấn công
    defense: number; //thủ
  };
}

const HeroList: React.FC = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  //   const [hero, setHero] = useState<Omit<Hero, "id">>({
  //     name: "",
  //     image: "",
  //     stats: {
  //       attack: 50,
  //       defense: 50,
  //     },
  //   });

  useEffect(() => {
    const fetchHeroes = async () => {
      const mockHeroes: Hero[] = [];
      const storedHeroes = JSON.parse(localStorage.getItem("heroes") || "[]");
      if (storedHeroes.length > 0) {
        setHeroes(storedHeroes);
        setFilteredHeroes(storedHeroes);
      } else {
        setHeroes(mockHeroes);
        setFilteredHeroes(mockHeroes);
      }
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    const filtered = heroes.filter((hero) =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHeroes(filtered);
  }, [searchTerm, heroes]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Thêm hàm điều hướng tới trang GameMode
  const goToGameChoice = () => {
    navigate("/gamechoice");
  };
  //hàm chuyển hướng trang thêm hero
  const gotoCreate = () => {
    navigate("/createhero");
  };

  // Hàm xóa hero
  const handleDelete = (id: number) => {
    const updatedHeroes = heroes.filter((hero) => hero.id !== id);
    setHeroes(updatedHeroes);
    setFilteredHeroes(updatedHeroes);
    localStorage.setItem("heroes", JSON.stringify(updatedHeroes)); // Cập nhật localStorage
    if (updatedHeroes.length === 0) {
      alert("")
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edithero/${id}`);
  };

  return (
    <div className="container mx-auto px-10 py-8 bg-slate-300 min-h-screen">
      <div className="flex">
        <h1 className="text-4xl font-bold mt-3">Hero List</h1>

        <input
          type="text"
          placeholder="Search heroes..."
          value={searchTerm}
          onChange={handleSearch}
          className=" w-[36%] px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 b-2 h-11 mt-4 ml-[38%]"
        />
        <button
          onClick={goToGameChoice}
          className="ml-3 mt-5 px-2 py-2 bg-stone-700 text-white rounded-lg hover:bg-pink-400 transition h-10"
        >
          Chọn chế độ
        </button>

        <button
          onClick={gotoCreate}
          className="ml-3 mt-5 px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-pink-400 transition"
        >
          Add Hero
        </button>
      </div>
      <div className="marquee mt-3">
        <div className="marquee-content">
          Hướng dẫn: Bạn có thể Add Hero mà bạn mong muốn, khi chơi thì bạn chọn
          chế độ để chơi...
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {filteredHeroes.map((hero) => (
          <Link key={hero.id} to={`/hero/${hero.id}`} className="block">
            <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <img
                src={hero.image}
                alt={hero.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{hero.name}</h3>
              <div className="text-sm text-gray-600">
                <p>Attack: {hero.stats.attack}</p>
                <p>Defense: {hero.stats.defense}</p>
              </div>

              <div className="flex ml-[89%] gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5 "
                  onClick={() => handleEdit(hero.id)}
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>

                <svg
                  onClick={() => handleDelete(hero.id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-5 "
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>

              {/* Nút xóa hero */}
              {/* <button
                onClick={() => handleDelete(hero.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button> */}
            </div>
          </Link>
        ))}
      </div>

      {/* {filteredHeroes.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Đã xoá
        </p>
      )} */}
    </div>
  );
};

export default HeroList;
