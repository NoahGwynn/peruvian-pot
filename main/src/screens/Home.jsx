import React from 'react';
import ScreenContainer from "../components/blocks/ScreenContainer";
import HomeIntro from "../components/blocks/HomeIntro";
import RecipeCard from "../components/blocks/RecipeCard";

function Home() {
    const cards = [
        {title: "Food", link: "/", img: "http://via.placeholder.com/640x360"},
        {title: "Yum", link: "/", img: "http://via.placeholder.com/640x360"},
        {title: "Nice", link: "/", img: "http://via.placeholder.com/640x360"},
        {title: "Nice", link: "/", img: "http://via.placeholder.com/640x360"},
        {title: "Nice", link: "/", img: "http://via.placeholder.com/640x360"},
        {title: "Nice", link: "/", img: "http://via.placeholder.com/640x360"},
    ]

    return (
        <>
            <ScreenContainer>
                <HomeIntro/>
                <div className={"home-recipe-cards"}>
                    {cards.map((card, i) => {
                        return <RecipeCard key={i} img={card.img} link={card.link} title={card.title}/>
                    })}
                </div>
            </ScreenContainer>
        </>
    );
}

export default Home;