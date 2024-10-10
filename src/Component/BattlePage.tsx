import React, { useState } from "react";
import { Hero } from "../interface/Hero";
import { heroes } from "../interface/data";
// Dữ liệu danh sách hero

const BattlePage: React.FC = () => {
  const [hero1, setHero1] = useState<Hero | null>(null);
  const [hero2, setHero2] = useState<Hero | null>(null);
  const [result, setResult] = useState<string>("");

  const handleBattle = () => {
    if (hero1 && hero2) {
      const hero1Power = hero1.physicalAttack + hero1.magicalAttack;
      const hero2Power = hero2.physicalAttack + hero2.magicalAttack;

      if (hero1Power > hero2Power) {
        setResult(`${hero1.name} thắng!`);
      } else if (hero2Power > hero1Power) {
        setResult(`${hero2.name} thắng!`);
      } else {
        setResult("Trận đấu hòa!");
      }
    }
  };

  return (
    <div className=" rounded-xl shadow-2xl battle-page flex flex-col items-center justify-center min-h-screen p-5 bg-gradient-to-r bg-slate-300  text-black">
      <h1 className="text-4xl font-bold mb-8">Chọn Hero để đánh nhau</h1>

      <div className="flex space-x-4 mb-5 ">
        <select
          className="p-2 rounded-lg border border-gray-300 bg-white text-black"
          onChange={(e) =>
            setHero1(
              heroes.find((hero) => hero.name === e.target.value) || null
            )
          }
        >
          <option value="">Chọn Hero 1</option>
          {heroes.map((hero) => (
            <option key={hero.name} value={hero.name}>
              {hero.name}
            </option>
          ))}
        </select>

        <select
          className="p-2 rounded-lg border border-gray-300 bg-white text-black"
          onChange={(e) =>
            setHero2(
              heroes.find((hero) => hero.name === e.target.value) || null
            )
          }
        >
          <option value="">Chọn Hero 2</option>
          {heroes.map((hero) => (
            <option key={hero.name} value={hero.name}>
              {hero.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBattle}
        className="mt-5 p-3 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition duration-300"
        disabled={!hero1 || !hero2}
      >
        Đánh nhau
      </button>

      {result && <h2 className="mt-5 text-2xl font-semibold">{result}</h2>}

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Hero đã chọn:</h2>
        <div className="flex space-x-10 mt-5">
          {hero1 && (
            <div className="hero-card p-5 bg-white rounded-lg shadow-lg text-black">
              <img
                src={hero1.avatar}
                alt={`${hero1.name} avatar`}
                className="w-32 h-32 mb-3 rounded-full"
              />
              <h3 className="text-xl font-bold">{hero1.name}</h3>
            </div>
          )}
          {hero2 && (
            <div className="hero-card p-5 bg-white rounded-lg shadow-lg text-black">
              <img
                src={hero2.avatar}
                alt={`${hero2.name} avatar`}
                className="w-32 h-32 mb-3 rounded-full"
              />
              <h3 className="text-xl font-bold">{hero2.name}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
