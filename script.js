function createAnimatedLoop(photo, depthMap, loopDuration) {
  // Create a canvas and context
  const canvas = document.createElement('canvas');
  canvas.width = photo.width;
  canvas.height = photo.height;
  const ctx = canvas.getContext('2d');

  // Create a data structure to store the frames
  const frames = [];

  // Load the photo and depth map
  ctx.drawImage(photo, 0, 0);
  const depthMapData = ctx.getImageData(0, 0, photo.width, photo.height);

  // Calculate the perspective
  const perspective = 500;

  // Create the animated loop
  for (let i = 0; i <= loopDuration; i++) {
    // Create a new frame
    const frame = document.createElement('img');
    frame.src = canvas.toDataURL('image/png');

    // Calculate the offset for each pixel in the photo
    for (let x = 0; x < photo.width; x++) {
      for (let y = 0; y < photo.height; y++) {
        const depthValue = depthMapData.data[(y * photo.width + x) * 4 + 3];
        const parallaxDistance = perspective * depthValue / 255;

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - parallaxDistance, y);
        ctx.fill();
      }
    }

    // Add the frame to the frames array
    frames.push(frame);
  }

  return frames;
}
