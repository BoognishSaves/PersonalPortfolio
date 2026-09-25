import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "John Paul Haddad — HaddadaddaH";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path d="M10 64H42V34L58 18V56H70V18L118 64H88V94L70 110V72H58V110L10 64Z" fill="#35B9F3" stroke="#10191C" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
const markSrc = `data:image/svg+xml;base64,${btoa(mark)}`;

const traces = [
  [0,110,250,110],[0,190,170,190],[70,0,70,80],[180,0,180,145],[250,40,350,140],
  [1200,105,930,105],[1200,190,1030,190],[1120,0,1120,120],[1010,0,1010,150],[950,45,850,145],
  [0,360,180,360],[1020,360,1200,360],[90,360,210,480],[1110,360,990,480]
];

export default function Image() {
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#050b12 0%,#071827 50%,#03070c 100%)",fontFamily:"Arial, sans-serif",color:"#f5f4ef"}}>
      {traces.map((t,i)=><div key={i} style={{position:"absolute",left:t[0],top:t[1],width:Math.hypot(t[2]-t[0],t[3]-t[1]),height:2,background:"rgba(53,185,243,.62)",transformOrigin:"0 0",transform:`rotate(${Math.atan2(t[3]-t[1],t[2]-t[0])}rad)`,boxShadow:"0 0 8px rgba(53,185,243,.25)"}} />)}
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",paddingTop:4}}>
        <div style={{width:270,height:270,border:"1px solid rgba(53,185,243,.65)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 60px rgba(53,185,243,.12)"}}>
          <img src={markSrc} width="215" height="215" />
        </div>
        <div style={{fontSize:54,letterSpacing:10,fontWeight:500,marginTop:28}}>JOHN PAUL HADDAD</div>
        <div style={{display:"flex",alignItems:"center",gap:24,marginTop:20}}>
          <div style={{width:110,height:2,background:"#35B9F3"}} />
          <div style={{fontSize:27,letterSpacing:8,fontWeight:700,color:"#35B9F3"}}>HADDADADDAH.COM</div>
          <div style={{width:110,height:2,background:"#35B9F3"}} />
        </div>
      </div>
    </div>,
    size
  );
}
