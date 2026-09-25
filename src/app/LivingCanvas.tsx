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

      // Deterministic colonies: broad forms first, then increasingly fine cellular detail.
      // Nothing runs continuously; complexity only increases when growth is redrawn.
      const colonies = mobile ? 7 : 13;
      const generations = m < 28 ? 1 : m < 55 ? 2 : m < 78 ? 3 : 4;
      const density = .22 + (m/100) * .78;

      for(let c=0;c<colonies;c++){
        const edge = c % 4;
        const seed = 1000 + c * 113;
        const cx = edge===0 ? hash(seed)*w*.22
          : edge===1 ? w*(.78+hash(seed)*.22)
          : hash(seed)*w
        const cy = edge===2 ? hash(seed+2)*h*.18
          : edge===3 ? h*(.82+hash(seed+2)*.18)
          : hash(seed+2)*h;
        const reach = (mobile ? 72 : 105) + hash(seed+4)*(mobile ? 70 : 145);
        const localM = Math.max(0, Math.min(1, density*1.35 - hash(seed+9)*.42));
        if(localM<=0) continue;

        // Large membrane: deliberately incomplete and irregular.
        drawCell(cx,cy,reach,seed,.07+localM*.15);

        for(let g=1;g<=generations;g++){
          const count = Math.floor((3+g*4) * localM);
          const radius = reach / Math.pow(2.15,g);
          for(let j=0;j<count;j++){
            const a = hash(seed+g*97+j*19)*Math.PI*2;
            const dist = reach*(.18+hash(seed+g*131+j*23)*(.7+g*.12));
            const x = cx+Math.cos(a)*dist;
            const y = cy+Math.sin(a)*dist*.82;
            if(x < -radius || x > w+radius || y < -radius || y > h+radius) continue;
            drawCell(x,y,radius*(.62+hash(seed+j+g)*.75),seed+g*100+j,.08+localM*.22+g*.018);

            // Fine satellite cells create dense pockets rather than uniform wallpaper.
            if(g>=2 && hash(seed+j*31+g) < localM*.72){
              const satellites = 2 + Math.floor(hash(seed+j*43)*4);
              for(let q=0;q<satellites;q++){
                const sa=hash(seed+j*59+q*11)*Math.PI*2;
                const sr=radius*(1.1+hash(seed+q*71)*1.7);
                drawCell(x+Math.cos(sa)*sr,y+Math.sin(sa)*sr,radius*(.18+hash(seed+q)*.25),seed+j*200+q,.10+localM*.24);
              }
            }
          }
        }
      }

      // Structural veins bind colonies into a system without imposing a grid.
      const veins = Math.floor(2 + m/16);
      ctx.strokeStyle=`rgba(64,184,238,${.05+(m/100)*.17})`;
      ctx.lineWidth=.8;
      for(let k=0;k<veins;k++){
        const seed=7000+k*83;
        const fromLeft=hash(seed)>.5;
        const sy=hash(seed+1)*h;
        ctx.beginPath(); ctx.moveTo(fromLeft?0:w,sy);
        ctx.bezierCurveTo(
          w*hash(seed+2), sy+(hash(seed+3)-.5)*240,
          w*hash(seed+4), sy+(hash(seed+5)-.5)*360,
          fromLeft?w*(.62+hash(seed+6)*.38):w*(hash(seed+6)*.38),
          Math.max(0,Math.min(h,sy+(hash(seed+7)-.5)*420))
        );
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
