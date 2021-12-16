import React from 'react';
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

function RecipeCard({title, img, link}) {
    return (
        <div className={"recipe-card"}>
            <Link to={link}>
                <Card className={""}>
                    <Card.Img variant="top" src={img}/>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    );
}

export default RecipeCard;