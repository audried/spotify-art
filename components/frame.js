
import {Text, Button } from '@chakra-ui/react';
import styles from '../styles/Home.module.css';
import React, { useRef, useEffect, useState } from 'react';

//https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
//font fix: https://stackoverflow.com/questions/2756575/drawing-text-to-canvas-with-font-face-does-not-work-at-the-first-time

//need to have canvas element present, BUT not show up until image is loaded...
export function Frame(props){

    const [isVisible, setIsVisible] = useState(false)

    const img_id = Math.floor(Math.random()*10000)
    const canvasRef = useRef(null)
    

    function download(ref){
        const canvas = document.getElementById('canvas');
        const dataURL = canvas.toDataURL();
        console.log(dataURL);
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = dataURL;
        link.click();
    };

    useEffect(() => {
        const context = canvasRef.current.getContext("2d");
        const image = new Image()
        const canvas = document.getElementById('canvas');
        const height = canvas.height
        const width = canvas.width
        //image.setAttribute('crossOrigin', 'anonymous');
        console.log(process.env.NEXT_PUBLIC_API_URL)
        const proxy_url = process.env.NEXT_PUBLIC_API_URL + "/api/image-proxy?q=" + props.url
        console.log(proxy_url)

        image.src = proxy_url
        context.clearRect(0, 0, width, height);
        context.fillStyle ='#ffffff'
        context.fillRect(0, 0, width, height);

        image.onload = () => {
            context.textAlign = 'left'
            context.drawImage(image, 0, 0, width, width);
            context.font = width==500 ? '50px Special Elite' : '40px Special Elite'
            context.fillStyle ='#000000'
            context.fillText(`IMAGE #${img_id}`, .08*width, .78*height);
            width == 500 ? context.font = '24px Special Elite' : context.font = '18px Special Elite'
            context.fillText(props.chosen[0]+",", .08*width, .84*height);
            context.fillText(props.chosen[1]+",", .08*width, .88*height);
            context.fillText("and "+props.chosen[2] +" music", .08*width, .924*height);
            context.font = width==500 ? '12px Times New Roman' : '10px Times New Roman'
            context.textAlign = 'center'
            context.fillText("create AI generated art based on your music taste at illustrait.us", width/2, .98*height);
            setIsVisible(true)
        };

      }, [])


    return (
        <div className={styles.frame}> 
            {/* purpose of Text is to load font */}
            <Text className={styles.loadFont}>.</Text> 
            <canvas id="canvas" ref={canvasRef} width={window.innerWidth >= 550 ? 500 : .9*window.innerWidth} height={window.innerWidth >= 550 ? 720 : 1.296*window.innerWidth} style={ isVisible ? {} : { visibility: "hidden" } }/>
            <Button onClick={download} rounded={'full'} px={6} size='lg' m={'5'} className={styles.db}>Download image</Button>
            <image id="theimage"></image>
        </div>
       
    )
  }