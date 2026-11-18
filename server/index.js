import http from 'node:http';
const target=process.env.N8N_WEBHOOK_URL;
http.createServer(async(req,res)=>{
res.setHeader('Content-Type','application/json');
if(req.method!=='POST'||req.url!=='/api/leads'){res.writeHead(404);return res.end(JSON.stringify({error:'Not found'}));}
let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>15000){res.writeHead(413);return res.end(JSON.stringify({error:'Request too large'}));}}
let data;try{data=JSON.parse(raw)}catch{res.writeHead(400);return res.end(JSON.stringify({error:'Invalid JSON'}));}
const clean=k=>String(data[k]??'').trim();const name=clean('name'),email=clean('email'),message=clean('message'),service=clean('service'),budget=clean('budget');
if(!name||!message||!service||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){res.writeHead(400);return res.end(JSON.stringify({error:'Invalid inquiry'}));}
if(!target){res.writeHead(503);return res.end(JSON.stringify({error:'Webhook not configured'}));}
try{const response=await fetch(target,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,message,service,budget,source:'leadpilot_website'}),signal:AbortSignal.timeout(12000)});if(!response.ok)throw Error('Webhook rejected request');res.writeHead(200);res.end(JSON.stringify({ok:true}));}
catch{res.writeHead(502);res.end(JSON.stringify({error:'Automation unavailable. Please try again.'}));}
}).listen(8787,'127.0.0.1',()=>console.log('LeadPilot bridge listening on http://127.0.0.1:8787'));
