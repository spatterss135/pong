const React = require('react')
const Def = require('./Default')
const ScriptTag = require('react-script-tag')



function Index(){


    return (
        <Def>
            <div className="player-one-score"></div>
            <div className="player-two-score"></div>
            <div className="game-container"></div>
            <div className="pc-paddle"></div>
            <div className="user-paddle"></div>
            <img src="/images/pong.png" className='ball' alt=""/>
        </Def>
    )
}


module.exports = Index