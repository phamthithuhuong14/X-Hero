import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Hero {
  id: number;
  name: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
  };
}

const EditHero: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    const storedHeroes = JSON.parse(localStorage.getItem("heroes") || "[]");
    const heroToEdit = storedHeroes.find(
      (hero: Hero) => hero.id === parseInt(id!)
    );
    if (heroToEdit) {
      setHero(heroToEdit);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (hero) {
      const { name, value } = e.target;
      setHero({ ...hero, [name]: value });
    }
  };

  const handleStatsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    stat: keyof Hero["stats"]
  ) => {
    if (hero) {
      const updatedStats = { ...hero.stats, [stat]: parseInt(e.target.value) };
      setHero({ ...hero, stats: updatedStats });
    }
  };

  const handleSubmit = () => {
    if (hero) {
      const storedHeroes = JSON.parse(localStorage.getItem("heroes") || "[]");
      const updatedHeroes = storedHeroes.map((h: Hero) =>
        h.id === hero.id ? hero : h
      );
      localStorage.setItem("heroes", JSON.stringify(updatedHeroes));
      navigate("/");
      toast.success("success")
    }
  };

  if (!hero) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Edit Hero</h1>
      <form className="max-w-lg mx-auto">
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={hero.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Image</label>
          <input
            type="text"
            name="image"
            value={hero.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Attack</label>
          <input
            type="number"
            value={hero.stats.attack}
            onChange={(e) => handleStatsChange(e, "attack")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-bold mb-2">Defense</label>
          <input
            type="number"
            value={hero.stats.defense}
            onChange={(e) => handleStatsChange(e, "defense")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditHero;
