import React, { useRef, useState, useEffect } from 'react'

export const SnakeBoard = () => {
    const snake = useRef(null)
    const food = useRef(null)
    const [direction, setDirection] = useState('down')
    const [positionX, setPositionX] = useState(0)
    const [positionY, setPositionY] = useState(60)
    const [foodPositionY, setFoodPositionY] = useState(0)
    const [foodPositionX, setFoodPositionX] = useState(0)
    const [speed, setSpeed] = useState(1000)

    const [snakeParts, setSnakeParts] = useState([
        { x: 0, y: 0 },
        { x: 0, y: 20 },
        { x: 0, y: 40 },
        { x: 0, y: 60 }
    ])

    function getRandom20() {
        return getRandomInt(1, 37) * 20;
      }
      
    function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // useEffect(() => {
    //     if (positionX === foodPositionX && positionY === foodPositionY) {
    //         // renderFood()
    //         setSpeed(speed > 100 ? speed - 1 : 100)
    //         console.log(speed)
    //     }
    // }, [positionX, positionY])

    function renderFood () {
        const foodPositionX = getRandom20()
        const foodPositionY = getRandom20()
        food.current.style.left = foodPositionX + 'px';
        food.current.style.top = foodPositionY + 'px';
        setFoodPositionX(foodPositionX)
        setFoodPositionY(foodPositionY)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // if (direction === 'down') {
            //     snake.current.style.transform = `translate(${convertPixelInInteger(snake.current.style.fromLeft)}px,${convertPixelInInteger(snake.current.style.fromTop) + 20}px)`
            //     snake.current.style.transition = 'transform .12s'
            //     snake.current.style.fromTop = `${convertPixelInInteger(snake.current.style.fromTop) + 20}px`
            //     setPositionY(convertPixelInInteger(snake.current.style.fromTop))
            // } else if (direction === 'up') {
            //     snake.current.style.transform = `translate(${convertPixelInInteger(snake.current.style.fromLeft)}px,${convertPixelInInteger(snake.current.style.fromTop) - 20}px)`
            //     snake.current.style.transition = 'transform .12s'
            //     snake.current.style.fromTop = `${convertPixelInInteger(snake.current.style.fromTop) - 20}px`
            //     setPositionY(convertPixelInInteger(snake.current.style.fromTop))
            // } else if (direction === 'left') {
            //     snake.current.style.transform = `translate(${convertPixelInInteger(snake.current.style.fromLeft) - 20}px,${convertPixelInInteger(snake.current.style.fromTop)}px)`
            //     snake.current.style.transition = 'transform .12s'
            //     snake.current.style.fromLeft = `${convertPixelInInteger(snake.current.style.fromLeft) - 20}px`
            //     setPositionX(convertPixelInInteger(snake.current.style.fromLeft))
            // } else if (direction === 'right') {
            //     snake.current.style.transform = `translate(${convertPixelInInteger(snake.current.style.fromLeft) + 20}px,${convertPixelInInteger(snake.current.style.fromTop)}px)`
            //     snake.current.style.transition = 'transform .12s'
            //     snake.current.style.fromLeft = `${convertPixelInInteger(snake.current.style.fromLeft) + 20}px`
            //     setPositionX(convertPixelInInteger(snake.current.style.fromLeft))
            // }
            if (direction === 'down') {
                setPositionY(positionY + 20)
                setSnakeParts([...snakeParts.filter((key, index) => index !== 0), {
                    x: positionX, y: 80
                }])
                // setSnakeParts()
            }
        }, speed);
        
        return () => clearInterval(interval);
    }, [direction, speed]);
    
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

    function convertPixelInInteger (pixel) {
        if (!pixel || pixel === '') {
            return 0
        }
        return parseInt(pixel, 10)
    }

    return (
    <div tabIndex='0' onKeyDown={(e) => handleKeyPress(e)} className='snake-board'>
        {/* <div ref={snake} className='snake'></div> */}
        {
            snakeParts.map(s => <div style={{ top: s.y, left: s.x }} className='snake'></div>)
        }
        {/* <div ref={food} className='food'></div> */}
    </div>
    )
}

export default SnakeBoard