const imageContainer = document.querySelector('.image-container');
const photo = document.querySelector('img.photo');
const depthMap = document.querySelector('img.depth-map');

const generateParallaxEffect = () => {
    const perspective = 500;
    const depthMapData = depthMap.getContext('2d').getImageData(0, 0, photo.width, photo.height);

    for (let x = 0; x < photo.width; x++) {
        for (let y = 0; y < photo.height; y++) {
            const depthValue = depthMapData.data[(y * photo.width + x) * 4 + 3];
            const parallaxDistance = perspective * depthValue / 255;

            photo.style.left = x - parallaxDistance + 'px';
        }
    }
};

imageContainer.addEventListener('load', generateParallaxEffect);
