import React, { useRef, useState, useEffect } from 'react'

export const SnakeBoard = () => {
    const snakeInitialState = [
        { x: 0, y: 0 },
        { x: 0, y: 20 },
        { x: 0, y: 40 },
        { x: 0, y: 60 },
        { x: 0, y: 80 }
    ]

    const failedMessages = [
        "You find yourself tasty?",
        "Sorry, you just ate yourself",
        "if you're hungry, you know..?",
        "I would try again!",
        "Not bad, not bad, but..",
        "You can do better!",
        "Nicht schleeeecht"
    ]

    const food = useRef(null) 
    const boardRef = useRef(null) 
    const [direction, setDirection] = useState('down')
    const [positionY, setPositionY] = useState(null)
    const [positionX, setPositionX] = useState(null)
    const [foodPositionY, setFoodPositionY] = useState(null)
    const [foodPositionX, setFoodPositionX] = useState(null)
    const [speed, setSpeed] = useState(400)
    const [play, setPlay] = useState(false)
    const [failed, setFailed] = useState(false)
    const [start, setStart] = useState(true)
    const [score, setScore] = useState(-1)

    const [snakeParts, setSnakeParts] = useState(snakeInitialState)

    function getRandom20() {
        return getRandomInt(1, 37) * 20;
      }
      
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function calculateSpeed () {
        if (speed > 400) {
            return speed - 30
        }

        if (speed > 300) {
            return speed - 20
        }

        if (speed > 200) {
            return speed - 10
        }

        if (speed > 100) {
            return speed - 5
        }

        if (speed > 50) {
            return speed - 2
        }

        return 50
    }

    useEffect(() => {
        const currentSnakeState = snakeParts
        const snakeCollide = currentSnakeState.slice(0,-1).find(snake => snake.y === positionY && snake.x === positionX)
        if (snakeCollide) {
            setPlay(false)
            setFailed(true)
        }
        if (positionX === foodPositionX && positionY === foodPositionY) {
            renderFood()
            setScore(score + 1)
            setSnakeParts([{
                x: snakeParts[0].x, y: snakeParts[0].y
            },...snakeParts])
            setSpeed(calculateSpeed())
            console.log(speed)
        }
    }, [positionX, positionY])

    function renderFood () {
        const foodPositionX = getRandom20()
        const foodPositionY = getRandom20()
        food.current.style.left = foodPositionX + 'px';
        food.current.style.top = foodPositionY + 'px';
        setFoodPositionX(foodPositionX)
        setFoodPositionY(foodPositionY)
    }

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {
                if (direction === 'down') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: snakeParts[snakeParts.length -1].x, y: checkForTheWall(snakeParts[snakeParts.length -1].y, 740, 0, "plus")
                    }])
                    setPositionY(snakeParts[snakeParts.length -1].y + 20)
                }
                if (direction === 'up') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: snakeParts[snakeParts.length -1].x, y: checkForTheWall(snakeParts[snakeParts.length -1].y, 0, 740, "minus")
                    }])
                    setPositionY(snakeParts[snakeParts.length -1].y - 20)
                }
                if (direction === 'left') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: checkForTheWall(snakeParts[snakeParts.length -1].x, 0, 740, "minus"), y: snakeParts[snakeParts.length -1].y
                    }])
                    setPositionX(snakeParts[snakeParts.length -1].x - 20)
                }
                if (direction === 'right') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: checkForTheWall(snakeParts[snakeParts.length -1].x, 740, 0, "plus"), y: snakeParts[snakeParts.length -1].y
                    }])
                    setPositionX(snakeParts[snakeParts.length -1].x + 20)
                }
            }, speed);
            return () => clearInterval(interval);
        } 
    });

    function checkForTheWall (part, startPos, endPos, operation) {
        if (part == startPos) {
            return endPos
        }
        return operation === 'minus' ? part - 20 : part + 20
    }

    function handleKeyPress (e) {
        switch (e.key) {
            case 'ArrowUp':
                direction !== 'down' && setDirection('up')
                break;
            case 'ArrowDown':
                direction !== 'up' && setDirection('down')
                break;
            case 'ArrowLeft':
                direction !== 'right' && setDirection('left')
                break;
            case 'ArrowRight':
                direction !== 'left' && setDirection('right')
                break;
        }
    }

    function handlePlayAgain () {
        setScore(0)
        setSpeed(400)
        setSnakeParts(snakeInitialState)
        setFailed(false)
        setDirection('down')
        boardRef.current.focus()
        setPlay(true)
    }

    function handlePlay () {
        setStart(false)
        boardRef.current.focus()
    }

    function renderOverlayScreen () {
        if (failed || start) {
            return (
                <div onClick={(e) => e.stopPropagation()} className='failed-screen'>
                    <div className='failed-screen-controls'>
                        {failed &&
                            <div>
                                <p>{failedMessages[Math.floor(Math.random() * failedMessages.length - 1)]}</p>
                                <p>Your Score: {score}</p>
                                <button className='button' onClick={() => handlePlayAgain()}>
                                    I want to try again
                                </button>
                            </div>
                        }
                        {start &&
                            <div>
                                <p>Do you want to try your luck with our snake game?</p>
                                <button className='button' onClick={() => handlePlay()}>
                                    Let's go!
                                </button>
                            </div>
                        }
                    </div>
                </div>
            )
        }
        return null
    }

    return (
    <div>
        <div ref={boardRef} onFocus={() => {!failed && setPlay(true)}} onBlur={() => setPlay(false)} tabIndex='0' onKeyDown={(e) => handleKeyPress(e)} className='snake-board'>
            {!failed && <div className='score'>Score: {score}</div>}
            {renderOverlayScreen()}
            {
                snakeParts.map(s => <div style={{ top: s.y, left: s.x }} className='snake'></div>)
            }
            <div ref={food} className='food'></div>
        </div>
    </div>
    )
}

export default SnakeBoard