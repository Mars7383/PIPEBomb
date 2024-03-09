// ==UserScript==
// @name         PIPEBomb
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  NexusPIPE captcha solver proof-of-concept (August 7th 2022)
// @author       Mars7383
// @match        https://*/.nexus/*
// @icon         https://i.imgur.com/HFkBiki.png
// @grant        none
// ==/UserScript==

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function () {
    await sleep(250);

    // output canvas
    const canv = document.createElement("canvas");
    canv.width = 350;
    canv.height = 200;
    canv.id = 'canv';
    canv.style = `position:absolute;z-index: 99999;border-style:dashed;border-color:#ff0000;border-width:2px;animation:blink 0.2125s;animation-iteration-count:8;display:none;`;
    document.getElementById('stuff').prepend(canv);
    const cstyle = document.createElement('style');
    cstyle.type = 'text/css';
    cstyle.innerHTML = `@keyframes blink {50%{border-color:#fff;}}`;
    document.getElementsByTagName('head')[0].appendChild(cstyle);

    const pixfinder = document.createElement("script");
    pixfinder.src = 'https://andriiheonia.github.io/pixfinder/javascripts/pixfinder.js';
    document.body.appendChild(pixfinder);
    pixfinder.onload = async function () {
        let imgElement;
        while (!imgElement) {
            Array.from(document.getElementsByTagName('img')).forEach(element => {
                if (element.parentElement.id == 'stuff' && element.id == '') {
                    imgElement = element;
                }
            });
            await sleep(50);
        }

        pix.util.dom.onload(imgElement, async function() {
            var puzzles = pix.findAll({
                img: imgElement,
                distance: 5,
                colors: [
                    '6ed970', //green
                    'd11ca6', //pink
                    '4fc7d8', //cyan
                    '5560b6', //dark blue
                    '351282', //navy blue
                ],
                clearNoise: false,
                accuracy: 1,
                tolerance: 50,
                //concavity: 20,
            });
            //console.log(`found ${puzzles.length} matches`);
            await puzzles.forEach(solve);
            await sleep(500);
            window.location.href = new URLSearchParams(window.location.search).get('destination'); // will try again if failed, or redirect to destination if succeeded
        });

        async function solve(puzzle) {
            let ctx = document.getElementById("canv").getContext("2d");
            ctx.strokeStyle = 'lime';
            ctx.beginPath();
            let lowestPoint = imgElement.clientWidth; // start with max possible value (canvas is 350px wide)
            //let highestPoint = 0; // start with lowest possible value
            puzzle.forEach(function(point) {
                if (point.x < lowestPoint) lowestPoint = point.x;
                //if (point.x > highestPoint) highestPoint = point.x;
                ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
            });
            ctx.stroke();
            ctx.closePath();
            let slider = document.getElementById('inputSlider');
            let scale = (slider.max - slider.min) / imgElement.clientWidth; // canvas is 350px wide, slider is 3095 pixels wide so we need to scale
            async function moveTo(pos, offset) {
                canv.style.display = 'block';
                slider.value = offset ? (pos + offset) * scale : pos * scale;
                slider.dispatchEvent(new Event('change'));
            }
            //await moveTo(lowestPoint + (highestPoint-lowestPoint)/2);
            await moveTo(lowestPoint + (document.getElementsByClassName('sliding')[0].clientWidth/2));
        }
    }
})();
