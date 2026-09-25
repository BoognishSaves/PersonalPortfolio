"use client";
import { useEffect, useRef } from "react";

export default function PartyCanvas(){
  const ref=useRef<HTMLCanvasElement|null>(null);
  useEffect(()=>{
    const canvas=ref.current;if(!canvas)return;
    const ctx=canvas.getContext("2d",{alpha:true});if(!ctx)return;
    const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile=matchMedia("(max-width: 760px)").matches;
    if(reduced)return;
    let w=0,h=0,dpr=1,raf=0,start=performance.now();
    const count=mobile?38:82;
    const motes=Array.from({length:count},(_,i)=>({a:(i/count)*Math.PI*2,r:40+(i%11)*19,s:.00035+(i%7)*.00007,z:1+(i%4)}));
    const resize=()=>{w=canvas.clientWidth;h=canvas.clientHeight;dpr=Math.min(devicePixelRatio||1,mobile?1.15:1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)};
    const draw=(t:number)=>{
      ctx.clearRect(0,0,w,h);
      const age=t-start,life=Math.max(0,1-age/15000),cx=w*.78,cy=Math.min(h*.18,360);
      const beat=.55+.45*Math.pow(Math.max(0,Math.sin(age*.009)),4);
      ctx.globalCompositeOperation="lighter";
      motes.forEach((m,i)=>{
        const ang=m.a+age*m.s*(i%2?1:-1),rad=m.r+(1-life)*120+Math.sin(age*.002+i)*18;
        const x=cx+Math.cos(ang)*rad,y=cy+Math.sin(ang)*rad*.62;
        ctx.beginPath();ctx.arc(x,y,m.z*(.8+beat*.7),0,Math.PI*2);
        ctx.fillStyle=`rgba(64,184,238,${(.12+.38*beat)*life})`;ctx.fill();
        if(i%4===0){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.strokeStyle=`rgba(64,184,238,${.035*beat*life})`;ctx.stroke()}
      });
      const pulse=(age%1800)/1800;
      ctx.beginPath();ctx.arc(cx,cy,30+pulse*Math.min(w,h)*.48,0,Math.PI*2);
      ctx.strokeStyle=`rgba(64,184,238,${(1-pulse)*.28*life})`;ctx.lineWidth=1.2;ctx.stroke();
      ctx.globalCompositeOperation="source-over";
      if(age<15000&&!document.hidden)raf=requestAnimationFrame(draw);
    };
    resize();addEventListener("resize",resize);raf=requestAnimationFrame(draw);
    return()=>{cancelAnimationFrame(raf);removeEventListener("resize",resize)};
  },[]);
  return <canvas ref={ref} className="partyCanvas" aria-hidden="true"/>;
}
