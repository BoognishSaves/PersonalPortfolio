"use client";

import { useEffect, useRef } from "react";

type Props = { maturity: number };

export default function LivingCanvas({ maturity }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const maturityRef = useRef(maturity);

  useEffect(() => { maturityRef.current = maturity; }, [maturity]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 760px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5);
    let w = 0, h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width); h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      draw();
    };

    const hash = (n:number) => {
      const x = Math.sin(n * 91.731) * 43758.5453;
      return x - Math.floor(x);
    };

    const drawCell = (x:number,y:number,r:number,seed:number,alpha:number) => {
      const sides = 6 + Math.floor(hash(seed)*3);
      ctx.beginPath();
      for(let j=0;j<=sides;j++){
        const a=(j/sides)*Math.PI*2;
        const wobble=.78+hash(seed+j*7)*.38;
        const px=x+Math.cos(a)*r*wobble, py=y+Math.sin(a)*r*wobble;
        if(j===0) ctx.moveTo(px,py); else ctx.lineTo(px,py);
      }
      ctx.closePath();
      ctx.strokeStyle=`rgba(64,184,238,${alpha})`;
      ctx.lineWidth=.7;
      ctx.stroke();
      if(hash(seed+22)>.58){
        ctx.beginPath(); ctx.arc(x,y,1.25,0,Math.PI*2);
        ctx.fillStyle=`rgba(64,184,238,${alpha*.9})`; ctx.fill();
        ctx.beginPath(); ctx.moveTo(x,y); ctx.lineTo(x+r*.48,y-r*.2);
        ctx.strokeStyle=`rgba(64,184,238,${alpha*.7})`; ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0,0,w,h);
      const m = Math.max(0,Math.min(100,maturityRef.current));
      if(m < 3) return;
      const cols = mobile ? 9 : 17;
      const rows = Math.ceil(h/(w/cols*.82))+2;
      const gap=w/cols;
      const total=cols*rows;
      const reveal=Math.floor(total*(m/100));
      for(let i=0;i<reveal;i++){
        const row=Math.floor(i/cols), col=i%cols;
        const order=(i*37)%total;
        if(order>=reveal) continue;
        const x=(col+.5+(row%2)*.5)*gap;
        const y=(row+.5)*gap*.82;
        const r=gap*(.47+hash(i)*.15);
        drawCell(x,y,r,i,.10+(m/100)*.26);
      }
      // A few structural tendrils make the field read as one organism.
      ctx.strokeStyle=`rgba(64,184,238,${.05+(m/100)*.16})`;
      ctx.lineWidth=1;
      for(let k=0;k<Math.floor(m/22);k++){
        ctx.beginPath();
        const sy=(k+1)*h/5;
        ctx.moveTo(k%2? w:0,sy);
        ctx.bezierCurveTo(w*.28,sy-gap,w*.55,sy+gap,w*(k%2?.18:.82),sy+gap*.4);
        ctx.stroke();
      }
    };

    const onGrowth=()=>{ cancelAnimationFrame(raf); raf=requestAnimationFrame(draw); };
    window.addEventListener("resize",resize,{passive:true});
    window.addEventListener("living-growth",onGrowth);
    resize();
    if(reduced) draw();
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);window.removeEventListener("living-growth",onGrowth)};
  }, []);

  useEffect(()=>{ window.dispatchEvent(new Event("living-growth")); },[maturity]);

  return <canvas ref={ref} className="livingCanvas" aria-hidden="true" />;
}
