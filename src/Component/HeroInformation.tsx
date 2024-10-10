import React from "react";

interface Hero {
  name: string;
  avatar: string;
  // Video: string;
  role: string;
  blood: string;
  physicalAttack: number;
  magicalAttack: number;
  physicalDefense: number;
  magicalDefense: number;
  physicalPenetration: number;
  magicalPenetration: number;
  attackSpeed: number;
  movementSpeed: number;
}

interface HeroProps {
  hero?: Hero;
}

const HeroInformation: React.FC<HeroProps> = ({ hero }) => {
  const inforHero: Hero = {
    name: "Giới thiệu Hero",
    avatar:
      "https://media.vov.vn/sites/default/files/styles/large/public/2022-02/5619240_cover_batman.jpg",
    // Video: <iframe width="560" height="315" src="https://www.youtube.com/embed/mEiMldsmSPk?si=_bOVwb7e273zXhQr" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>,
    role: "Sát thủ",
    blood: "Red",
    physicalAttack: 80,
    magicalAttack: 20,
    physicalDefense: 60,
    magicalDefense: 40,
    physicalPenetration: 30,
    magicalPenetration: 10,
    attackSpeed: 1.2,
    movementSpeed: 350,
  };

  // Sử dụng hero từ props nếu có, nếu không sử dụng exampleHero
  const heroToDisplay = hero || inforHero;

  return (
    <div className="hero-info w-1/2 bg-slate-300 border ml-[25%] mt-5 rounded text-black h-[20%] shadow-customer">
      <h1 className="text-4xl ml-20 mt-10">{heroToDisplay.name}</h1>

      <div className="grid grid-cols-2 ml-10">
        <div className="mt-5 justify-center">
          <img
            src={heroToDisplay.avatar}
            alt={`${heroToDisplay.name} image`}
            className="hero-image w-[90%] h-64"
          />
          <a className="underline text-sm text-black" href="/review">
            Xem Review
            
          </a>

          {/* <video src={heroToDisplay.Video} controls className="hero-video">
          Your browser does not support the video tag.
        </video> */}
        </div>
        <div className="hero-details mt-5 ml-10">
          <p className="text-xl">
            <strong className="text-xl">Role:</strong> {heroToDisplay.role}
          </p>
          <p className="text-xl">
            <strong className="text-xl">Blood:</strong> {heroToDisplay.blood}
          </p>
          <hr className="w-[100%] border-black mt-3" />
          <h2 className="mt-5 text-xl font-semibold">Thống kê</h2>
          <ul className=" mb-3">
            <li>Công vật lý: {heroToDisplay.physicalAttack}</li>
            <li>Công phép: {heroToDisplay.magicalAttack}</li>
            <li>Giáp vật lý: {heroToDisplay.physicalDefense}</li>
            <li>Giáp phép: {heroToDisplay.magicalDefense}</li>
            <li>Xuyên giáp vật lý: {heroToDisplay.physicalPenetration}</li>
            <li>Xuyên giáp phép: {heroToDisplay.magicalPenetration}</li>
            <li>Tốc đánh: {heroToDisplay.attackSpeed}</li>
            <li>Hồi Chiêu: {heroToDisplay.movementSpeed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeroInformation;
