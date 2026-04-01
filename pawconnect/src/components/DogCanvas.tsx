import React, { useEffect, useRef } from 'react';

const DogCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dogX = 50;
    let dogY = 150;
    let ballX = 350;
    let ballY = 150;
    let ballDx = 2;
    let ballDy = 1.5;
    let dogSpeed = 3;
    let facingRight = true;

    const dogWidth = 60;
    const dogHeight = 40;
    const ballRadius = 10;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grass
      ctx.fillStyle = '#e8f5e9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Move Ball
      ballX += ballDx;
      ballY += ballDy;

      if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) ballDx *= -1;
      if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballDy *= -1;

      // Move Dog towards ball
      const dx = ballX - dogX;
      const dy = ballY - dogY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        dogX += (dx / distance) * dogSpeed;
        dogY += (dy / distance) * dogSpeed;
      }

      // Flip direction
      facingRight = dx > 0;

      // Draw Ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#f1c40f';
      ctx.fill();
      ctx.closePath();

      // Draw Dog (Simplified shape)
      ctx.save();
      ctx.translate(dogX, dogY);
      if (!facingRight) ctx.scale(-1, 1);

      // Body
      ctx.fillStyle = '#8d6e63';
      ctx.fillRect(-dogWidth / 2, -dogHeight / 2, dogWidth, dogHeight);
      
      // Head
      ctx.fillStyle = '#a1887f';
      ctx.fillRect(dogWidth / 4, -dogHeight, 25, 25);
      
      // Tail
      ctx.strokeStyle = '#8d6e63';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(-dogWidth / 2, 0);
      ctx.lineTo(-dogWidth / 2 - 10, -10);
      ctx.stroke();

      // Legs
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(-dogWidth / 2 + 5, dogHeight / 2, 8, 10);
      ctx.fillRect(dogWidth / 2 - 13, dogHeight / 2, 8, 10);

      ctx.restore();

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="w-full h-64 rounded-2xl overflow-hidden shadow-inner bg-green-50 relative">
      <canvas ref={canvasRef} width={800} height={256} className="w-full h-full" />
      <div className="absolute top-4 left-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
        Interactive Play Zone
      </div>
    </div>
  );
};

export default DogCanvas;
