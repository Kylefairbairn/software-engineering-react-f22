import React from "react";

const TuitStats = ({tuit, likeTuit}) => {
    return (
        <div className="row">
            ...
            <div className="col">
        <span onClick={() => likeTuit(tuit)}>
        {
            tuit.stats.likes > 0 &&
            <i className="fas fa-heart"
    style={{color: 'red'}}/>
        }
            {
                tuit.stats.likes <= 0 &&
                <i className="far fa-heart"/>
            }
            {tuit.stats && tuit.stats.likes}
        </span>
            </div>
            ...
        </div>
    );
}
export default TuitStats


