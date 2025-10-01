'use client';import { useEffect,useRef,useState } from 'react';
export default function Wallet(){const [token,setToken]=useState('');const canvasRef=useRef<HTMLCanvasElement>(null);
async function refresh(){const res=await fetch('/api/wallet/issue');const j=await res.json();if(res.ok){setToken(j.token);const QR=(await import('qrcode')).default;await QR.toCanvas(canvasRef.current,j.token,{width:240,errorCorrectionLevel:'M'});}}
useEffect(()=>{refresh();const t=setInterval(refresh,55000);return()=>clearInterval(t);},[]);
return(<div className="grid gap-3"><h1 className="text-2xl font-semibold">Carteirinha</h1><canvas ref={canvasRef} className="border rounded p-2 w-[260px]"/><p className="text-xs">Token: <code>{token.slice(0,18)}...</code></p></div>);}