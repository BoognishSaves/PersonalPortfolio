"use client";

import { useEffect, useRef } from "react";

type Props = { maturity: number };

export default function LivingCanvas({ maturity }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const maturityRef = useRef(maturity);
  useEffect(() => { maturityRef.current = maturity; }, [maturity]);

  useEffect(() => {
    const canvas=ref.current; if(!canvas) return;
    const ctx=canvas.getContext("2d",{alpha:true}); if(!ctx) return;
    const mobile=matchMedia("(max-width: 760px)").matches;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr=Math.min(devicePixelRatio||1,mobile?1.2:1.5);
    let w=0,h=0,raf=0,ambientRaf=0;
    type Spore={x:number;y:number;vx:number;vy:number;r:number;phase:number};
    let spores:Spore[]=[];

    const hash=(n:number)=>{const x=Math.sin(n*91.731)*43758.5453;return x-Math.floor(x)};
    const inside=(x:number,y:number,r:{x:number;y:number;w:number;h:number},pad=0)=>
      x>r.x-pad&&x<r.x+r.w+pad&&y>r.y-pad&&y<r.y+r.h+pad;

    const zones=()=>{
      const root=canvas.getBoundingClientRect();
      const selectors=[".heroCopy",".markStage",".pathStatement"];
      return selectors.flatMap(sel=>Array.from(document.querySelectorAll(sel))).map(el=>{
        const r=el.getBoundingClientRect();
        return {x:r.left-root.left,y:r.top-root.top,w:r.width,h:r.height,logo:(el as HTMLElement).classList.contains("markStage")};
      });
    };

    const segment=(x:number,y:number,len:number,dir:number,a:number,width=.85)=>{
      const dx=Math.cos(dir)*len,dy=Math.sin(dir)*len;
      ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx,y+dy);
      ctx.strokeStyle=`rgba(64,184,238,${a})`;ctx.lineWidth=width;ctx.stroke();
      ctx.beginPath();ctx.arc(x+dx,y+dy,width*1.7,0,Math.PI*2);
      ctx.fillStyle=`rgba(64,184,238,${Math.min(.55,a*1.35)})`;ctx.fill();
      return [x+dx,y+dy] as const;
    };

    const makeSpores=()=>{
      const count=mobile?4:8;
      spores=Array.from({length:count},(_,i)=>({
        x:hash(8100+i*17)*w,y:hash(8200+i*23)*h,
        vx:(hash(8300+i*29)-.5)*(mobile?.055:.075),
        vy:(hash(8400+i*31)-.5)*(mobile?.045:.06),
        r:(mobile?2.5:3.5)+hash(8500+i*37)*(mobile?4:7),
        phase:hash(8600+i*41)*Math.PI*2
      }));
    };

    const drawSpores=(time:number)=>{
      const m=maturityRef.current;
      if(reduced||document.hidden||m<12)return;
      spores.forEach((p,i)=>{
        p.x+=p.vx; p.y+=p.vy;
        p.x+=Math.sin(time*.00035+p.phase)*.018;
        p.y+=Math.cos(time*.00028+p.phase)*.014;
        if(p.x<-15)p.x=w+15;if(p.x>w+15)p.x=-15;
        if(p.y<-15)p.y=h+15;if(p.y>h+15)p.y=-15;
        const breathe=.82+Math.sin(time*.0011+p.phase)*.18;
        const wobble=Math.sin(time*.0008+p.phase);
        const a=.045+Math.min(1,m/100)*.085;
        // A tiny multi-lobed organism rather than a perfect particle.
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.phase+time*.000035);
        const lobes=3+(i%3);
        for(let l=0;l<lobes;l++){
          const ang=(l/lobes)*Math.PI*2;
          const orbit=p.r*(.28+.10*Math.sin(time*.001+l+p.phase));
          const lr=p.r*breathe*(.48+.10*Math.sin(time*.0013+l*1.7+p.phase));
          ctx.beginPath();
          ctx.ellipse(Math.cos(ang)*orbit,Math.sin(ang)*orbit,lr*(1+.12*wobble),lr*(.72-.08*wobble),ang,0,Math.PI*2);
          ctx.fillStyle=`rgba(64,184,238,${a*.72})`;ctx.fill();
        }
        // Brighter nucleus makes the spore read as a digital cell up close.
        ctx.beginPath();ctx.arc(0,0,Math.max(.75,p.r*.20),0,Math.PI*2);
        ctx.fillStyle=`rgba(64,184,238,${Math.min(.5,a*2.8)})`;ctx.fill();
        ctx.restore();
      });
    };

    const draw=()=>{
      ctx.clearRect(0,0,w,h);
      const m=Math.max(0,Math.min(100,maturityRef.current)); if(m<3)return;
      const protectedZones=zones();
      // Mature states gain hierarchy, not just more lines: trunks, secondary routes,
      // then fine capillaries that make dense regions read blue from a distance.
      const stage=m/100;
      const branches=Math.floor((mobile?18:32)+stage*(mobile?62:138));
      const steps=Math.floor(2+stage*8);
      const alpha=.07+(m/100)*.25;

      // Mycelial macro-growth with circuit-board routing rules.
      for(let b=0;b<branches;b++){
        const seed=1100+b*79;
        const side=Math.floor(hash(seed)*4);
        let x=side===0?0:side===1?w:hash(seed+2)*w;
        let y=side===2?0:side===3?h:hash(seed+3)*h;
        let dir=side===0?0:side===1?Math.PI:side===2?Math.PI/2:-Math.PI/2;
        dir+=(hash(seed+4)>.5?1:-1)*Math.PI/4;
        for(let s=0;s<steps;s++){
          const len=(mobile?18:24)+hash(seed+s*17)*(mobile?30:48);
          // Mostly 45/90-degree turns: ordered close-up, organic at page scale.
          if(s>0&&hash(seed+s*31)<.48) dir+=(hash(seed+s*37)>.5?1:-1)*(hash(seed+s*41)>.55?Math.PI/4:Math.PI/2);
          const nx=x+Math.cos(dir)*len,ny=y+Math.sin(dir)*len;
          const hit=protectedZones.some(z=>inside(nx,ny,z,z.logo?8:14));
          if(hit){dir+=(hash(seed+s*53)>.5?1:-1)*Math.PI/2;continue}
          [x,y]=segment(x,y,len,dir,alpha*(.72+hash(seed+s)*.5),hash(seed+s+9)>.88?1.35:.8);
          // Secondary capillaries emerge late and stay short/ordered.
          if(m>62 && hash(seed+s*67)<((m-62)/38)*.48){
            const twigDir=dir+(hash(seed+s*71)>.5?1:-1)*Math.PI/4;
            const twigLen=len*(.28+hash(seed+s*73)*.38);
            segment(x,y,twigLen,twigDir,alpha*.72,.55);
          }
          if(x<0||x>w||y<0||y>h)break;
        }
      }

      // At maturity, deliberately frame key content instead of leaving white holes.
      if(m>42){
        const frameStrength=(m-42)/58;
        protectedZones.forEach((z,zi)=>{
          const pad=z.logo?18:26;
          const spacing=mobile?22:16;
          const points:number[][]=[];
          for(let x=z.x-pad;x<=z.x+z.w+pad;x+=spacing){points.push([x,z.y-pad],[x,z.y+z.h+pad])}
          for(let y=z.y-pad;y<=z.y+z.h+pad;y+=spacing){points.push([z.x-pad,y],[z.x+z.w+pad,y])}
          points.forEach((p,i)=>{
            if(hash(zi*1000+i)<frameStrength*.88){
              const r=1.2+hash(i+zi*71)*2.3;
              ctx.beginPath();ctx.arc(p[0],p[1],r,0,Math.PI*2);
              ctx.fillStyle=`rgba(64,184,238,${.12+frameStrength*.32})`;ctx.fill();
              if(hash(i*13+zi)>.42){
                const angle=(Math.floor(hash(i*19+zi)*8)*Math.PI)/4;
                segment(p[0],p[1],spacing*(.45+hash(i)*.7),angle,.10+frameStrength*.25,.7);
              }
            }
          });
        });
      }
      drawSpores(performance.now());
    };

    const ambient=(time:number)=>{
      if(!reduced&&!document.hidden&&maturityRef.current>=12){
        draw();
        drawSpores(time);
      }
      ambientRaf=requestAnimationFrame(ambient);
    };

    const pulse=()=>{
      if(reduced || document.hidden || maturityRef.current<35) return;
      const root=canvas.getBoundingClientRect();
      const seed=Date.now()%100000;
      const y=hash(seed)*h, fromLeft=hash(seed+1)>.5;
      const x0=fromLeft?0:w, x1=fromLeft?w:0;
      const duration=1100+hash(seed+2)*1100, start=performance.now();
      const animate=(now:number)=>{
        const t=Math.min(1,(now-start)/duration);
        draw();
        const x=x0+(x1-x0)*t;
        ctx.beginPath();ctx.arc(x,y,1.6+hash(seed+3)*1.8,0,Math.PI*2);
        ctx.fillStyle=`rgba(64,184,238,${.25+.35*Math.sin(Math.PI*t)})`;ctx.fill();
        if(t<1&&!document.hidden) raf=requestAnimationFrame(animate);
      };
      raf=requestAnimationFrame(animate);
    };

    const resize=()=>{const r=canvas.getBoundingClientRect();w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);makeSpores();draw()};
    const redraw=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)};
    addEventListener("resize",resize,{passive:true});addEventListener("living-growth",redraw);
    resize();
    // Rare, brief motion only. The page is still most of the time.
    const pulseEvery=mobile?22000:15000;
    const pulseTimer=window.setInterval(pulse,pulseEvery);
    // Ambient loop is deliberately tiny: 8 simple spores desktop / 4 mobile.
    if(!reduced) ambientRaf=requestAnimationFrame(ambient);
    return()=>{window.clearInterval(pulseTimer);cancelAnimationFrame(ambientRaf);cancelAnimationFrame(raf);removeEventListener("resize",resize);removeEventListener("living-growth",redraw)};
  },[]);

  useEffect(()=>{dispatchEvent(new Event("living-growth"))},[maturity]);
  return <canvas ref={ref} className="livingCanvas" aria-hidden="true" />;
}
