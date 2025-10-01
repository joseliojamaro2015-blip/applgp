'use client';import { useEffect,useState } from 'react';import { supabase } from '@/lib/supabase-client';
export default function Leads(){const [leads,setLeads]=useState<any[]>([]);const [form,setForm]=useState({name:'',email:'',phone:'',source:'site'});
async function load(){const { data }=await supabase.from('leads').select('*').order('created_at',{ascending:false});setLeads(data||[]);}useEffect(()=>{load();},[]);
async function addLead(e:any){e.preventDefault();await supabase.from('leads').insert({...form});setForm({name:'',email:'',phone:'',source:'site'});load();}
return(<div className="grid gap-3"><h1 className="text-2xl font-semibold">CRM — Leads</h1><form onSubmit={addLead} className="card grid sm:grid-cols-4 gap-2">
<input placeholder="Nome" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2"/>
<input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border rounded px-3 py-2"/>
<input placeholder="Telefone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border rounded px-3 py-2"/>
<button className="btn btn-primary">Capturar</button></form>
<div className="card"><table className="w-full text-sm"><thead><tr><th className="text-left">Nome</th><th className="text-left">Email</th><th>Telefone</th><th>Fonte</th><th>Status</th></tr></thead>
<tbody>{leads.map(l=>(<tr key={l.id}><td>{l.name}</td><td>{l.email}</td><td className="text-center">{l.phone}</td><td className="text-center">{l.source}</td><td className="text-center">{l.status||'novo'}</td></tr>))}</tbody></table></div></div>);}