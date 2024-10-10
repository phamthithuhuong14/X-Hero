import React from "react";

interface Hero {
  Role: string;
  Blood: string;
}

interface HeroProps {
  hero?: Hero;
}

const Review: React.FC<HeroProps> = ({ hero }) => {
  const inforHero: Hero = {
    Role: "sát thủ",
    Blood: "red",
  };

  const heroToDisplay = hero || inforHero;

  return (
    <>
      <div className="flex justify-center mt-2">
        <iframe
          width="1460"
          height="515"
          src="https://www.youtube.com/embed/sIbmuB5G3WQ?si=XHcsGyS4TT9X8dIX"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div>
        <h1 className="text-2xl mt-5 font-semibold ml-10">
          (NEW UPDATE!) Every Heroes Battlegrounds Character vs Anime Comparison
          (NEW MASTERY DEKU AWAKEN)
        </h1>

        <div className="ml-10 mt-3">
          <p className="text-xl">
            <strong className="text-xl">Role:</strong> {heroToDisplay.Role}
          </p>
          <p className="text-xl">
            <strong className="text-xl">Blood:</strong> {heroToDisplay.Blood}
          </p>
        </div>
      </div>
    </>
  );
};

export default Review;
