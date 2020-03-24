import React, { useRef, useState, useEffect } from 'react'

export const SnakeBoard = () => {
    const food = useRef(null) 
    const boardRef = useRef(null) 
    const [direction, setDirection] = useState('down')
    const [positionY, setPositionY] = useState(60)
    const [positionX, setPositionX] = useState(0)
    const [foodPositionY, setFoodPositionY] = useState(60)
    const [foodPositionX, setFoodPositionX] = useState(0)
    const [speed, setSpeed] = useState(500)
    const [play, setPlay] = useState(false)

    const [snakeParts, setSnakeParts] = useState([
        { x: 0, y: 0 },
        { x: 0, y: 20 },
        { x: 0, y: 40 },
        { x: 0, y: 60 },
        { x: 0, y: 80 }
    ])

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

        if (speed > 40) {
            return speed - 2
        }

        return 40
    }

    useEffect(() => {
        const currentSnakeState = snakeParts
        const snakeCollide = currentSnakeState.slice(0,-1).find(snake => snake.y === positionY && snake.x === positionX)
        if (snakeCollide) {
            setPlay(false)
            // show failed screen
            // restart snake
        }
        if (positionX === foodPositionX && positionY === foodPositionY) {
            renderFood()
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
                        x: snakeParts[snakeParts.length -1].x, y: snakeParts[snakeParts.length -1].y + 20
                    }])
                    setPositionY(snakeParts[snakeParts.length -1].y + 20)
                }
                if (direction === 'up') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: snakeParts[snakeParts.length -1].x, y: snakeParts[snakeParts.length -1].y - 20
                    }])
                    setPositionY(snakeParts[snakeParts.length -1].y - 20)
                }
                if (direction === 'left') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: snakeParts[snakeParts.length -1].x - 20, y: snakeParts[snakeParts.length -1].y
                    }])
                    setPositionX(snakeParts[snakeParts.length -1].x - 20)
                }
                if (direction === 'right') {
                    setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                        x: snakeParts[snakeParts.length -1].x + 20, y: snakeParts[snakeParts.length -1].y
                    }])
                    setPositionX(snakeParts[snakeParts.length -1].x + 20)
                }
            }, speed);
            return () => clearInterval(interval);
        }
        
    });
    
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

    return (
    <div onFocus={() => setPlay(true)} onBlur={() => setPlay(false)} tabIndex='0' onKeyDown={(e) => handleKeyPress(e)} className='snake-board'>
        {
            snakeParts.map(s => <div style={{ top: s.y, left: s.x }} className='snake'></div>)
        }
        <div ref={food} className='food'></div>
    </div>
    )
}

export default SnakeBoard