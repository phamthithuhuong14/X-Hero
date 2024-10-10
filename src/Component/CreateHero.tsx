import React, { useState } from "react";

import { useHero } from "../Contexts/HeroContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Hero {
  id: number;
  name: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
  };
}

// Cú pháp Omit<Hero, "id"> dùng để loại bỏ thuộc tính id của Hero.
//Đảm bảo rằng Hero có thuộc tính id trong định nghĩa ban đầu. Nếu Hero không có thuộc tính id, thì Omit sẽ gây lỗi.

const CreateHero: React.FC = () => {
  const navigate = useNavigate();
  // const { addHero } = useHero();
  const [hero, setHero] = useState<Omit<Hero, "id">>({
    name: "",
    image: "",
    stats: {
      attack: 50,
      defense: 40,
    },
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "attack" || name === "defense") {
      setHero((prevHero) => ({
        ...prevHero,
        stats: {
          ...prevHero.stats,
          [name]: parseInt(value),
        },
      }));
    } else {
      setHero((prevHero) => ({
        ...prevHero,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newHero = { ...hero, id: Date.now() };
    const existingHeroes = JSON.parse(localStorage.getItem("heroes") || "[]");
    const updatedHeroes = [...existingHeroes, newHero];
    localStorage.setItem("heroes", JSON.stringify(updatedHeroes));
    navigate("/");
    toast.success("add success");
  };

  // ... rest of the component remains the same
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Create New Hero</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={hero.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={hero.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="attack"
            className="block text-gray-700 font-bold mb-2"
          >
            Attack
          </label>
          <input
            type="range"
            id="attack"
            name="attack"
            min="0"
            max="100"
            value={hero.stats.attack}
            onChange={handleInputChange}
            className="w-full"
          />
          <span>{hero.stats.attack}</span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="defense"
            className="block text-gray-700 font-bold mb-2"
          >
            Defense
          </label>
          <input
            type="range"
            id="defense"
            name="defense"
            min="0"
            max="100"
            value={hero.stats.defense}
            onChange={handleInputChange}
            className="w-full"
          />
          <span>{hero.stats.defense}</span>
        </div>
        <button
          type="submit"
          className=" mt-5 bg-stone-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Hero
        </button>
      </form>
    </div>
  );
};

export default CreateHero;
