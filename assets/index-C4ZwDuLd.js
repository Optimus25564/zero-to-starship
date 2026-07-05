(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();function rc(n,e){return n*e}function Nh(n,e=9.81){return n*e}function zh(n,e){return n/e}function Oh(n,e){return e<=0?0:n*Math.log(1/(1-e))}function Fh(n,e=7800){return n>=e}const pa={exhaustVelocity:{key:"exhaustVelocity",label:{zh:"排气速度 vₑ",en:"Exhaust velocity vₑ"},min:1e3,max:4e3,step:50,unit:"m/s",default:2500},massFlow:{key:"massFlow",label:{zh:"每秒喷出质量 ṁ",en:"Mass flow rate ṁ"},min:50,max:300,step:5,unit:"kg/s",default:100}},kh={id:"1.1",stage:"pad",vehicle:"stack",highlight:"thrust",padRise:!0,title:{zh:"推力从哪来",en:"Where Thrust Comes From"},hook:{zh:'马斯克说，火箭最反直觉的地方，是它在真空里没有东西可"蹬"，却照样能加速。',en:'Musk says the most counterintuitive thing about a rocket is that in a vacuum it has nothing to "push against," yet it still accelerates.'},params:[pa.exhaustVelocity,pa.massFlow],compute:n=>({thrust:rc(n.massFlow,n.exhaustVelocity)}),goal:{text:{zh:"把推力调到至少 500 kN",en:"Dial thrust up to at least 500 kN"},check:n=>n.thrust>=5e5},formulaHUD:(n,e,t)=>t==="en"?`F = ṁ × vₑ = ${n.massFlow} × ${n.exhaustVelocity} = ${(e.thrust/1e3).toFixed(0)} kN`:`F = ṁ × vₑ = ${n.massFlow} × ${n.exhaustVelocity} = ${(e.thrust/1e3).toFixed(0)} kN`,milestoneId:"newton-third-law",diagram:{title:{zh:"认识这枚火箭 · 部件总览",en:"Meet This Rocket · Parts Overview"},svg:{zh:`<svg viewBox="0 0 640 450" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="steel11" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c7ccd3"/><stop offset="0.5" stop-color="#eef2f6"/><stop offset="1" stop-color="#b7bdc5"/></linearGradient></defs>
      <polygon points="300,30 260,110 340,110" fill="url(#steel11)" stroke="#8b939c"/>
      <rect x="260" y="110" width="80" height="250" fill="url(#steel11)" stroke="#8b939c" stroke-width="1.5"/>
      <rect x="261" y="116" width="39" height="104" fill="#4f86c6"/>
      <rect x="261" y="224" width="39" height="130" fill="#d99a44"/>
      <line x1="300" y1="110" x2="300" y2="360" stroke="#8b939c" stroke-dasharray="4 3"/>
      <g stroke="#9aa2ac" stroke-width="1">
        <line x1="300" y1="140" x2="340" y2="140"/><line x1="300" y1="170" x2="340" y2="170"/>
        <line x1="300" y1="200" x2="340" y2="200"/><line x1="300" y1="230" x2="340" y2="230"/>
        <line x1="300" y1="260" x2="340" y2="260"/><line x1="300" y1="290" x2="340" y2="290"/>
        <line x1="300" y1="320" x2="340" y2="320"/>
      </g>
      <polygon points="260,270 244,300 250,352 260,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="340,270 356,300 350,352 340,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="260,360 340,360 326,392 274,392" fill="#2c2f35" stroke="#8b939c"/>
      <polygon points="282,392 298,392 294,410 286,410" fill="#3a3d42"/>
      <polygon points="302,392 318,392 314,410 306,410" fill="#3a3d42"/>
      <g font-size="14" fill="#e6ebf2">
        <line x1="290" y1="70" x2="150" y2="60" stroke="#6a7684"/><text x="20" y="64">鼻锥 / 载荷舱</text>
        <line x1="262" y1="165" x2="150" y2="160" stroke="#6a7684"/><text x="20" y="150">氧化剂罐</text><text x="20" y="168" font-size="11" fill="#8ba0b4">液氧</text>
        <line x1="262" y1="290" x2="150" y2="290" stroke="#6a7684"/><text x="20" y="286">燃料罐</text><text x="20" y="304" font-size="11" fill="#8ba0b4">液态甲烷</text>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="352" y1="300" x2="470" y2="290" stroke="#6a7684"/><text x="474" y="286">后襟翼</text><text x="474" y="304" font-size="11" fill="#8ba0b4">再入时控制姿态</text>
        <line x1="330" y1="230" x2="470" y2="180" stroke="#6a7684"/><text x="474" y="176">焊接钢环</text><text x="474" y="194" font-size="11" fill="#8ba0b4">不锈钢船身，一圈圈焊起来</text>
        <line x1="300" y1="400" x2="470" y2="392" stroke="#6a7684"/><text x="474" y="388">发动机（猛禽）</text><text x="474" y="406" font-size="11" fill="#8ba0b4">液氧甲烷、可深度节流</text>
      </g>
    </svg>`,en:`<svg viewBox="0 0 640 450" width="100%" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="steel11" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c7ccd3"/><stop offset="0.5" stop-color="#eef2f6"/><stop offset="1" stop-color="#b7bdc5"/></linearGradient></defs>
      <polygon points="300,30 260,110 340,110" fill="url(#steel11)" stroke="#8b939c"/>
      <rect x="260" y="110" width="80" height="250" fill="url(#steel11)" stroke="#8b939c" stroke-width="1.5"/>
      <rect x="261" y="116" width="39" height="104" fill="#4f86c6"/>
      <rect x="261" y="224" width="39" height="130" fill="#d99a44"/>
      <line x1="300" y1="110" x2="300" y2="360" stroke="#8b939c" stroke-dasharray="4 3"/>
      <g stroke="#9aa2ac" stroke-width="1">
        <line x1="300" y1="140" x2="340" y2="140"/><line x1="300" y1="170" x2="340" y2="170"/>
        <line x1="300" y1="200" x2="340" y2="200"/><line x1="300" y1="230" x2="340" y2="230"/>
        <line x1="300" y1="260" x2="340" y2="260"/><line x1="300" y1="290" x2="340" y2="290"/>
        <line x1="300" y1="320" x2="340" y2="320"/>
      </g>
      <polygon points="260,270 244,300 250,352 260,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="340,270 356,300 350,352 340,348" fill="#cfd6de" stroke="#8b939c"/>
      <polygon points="260,360 340,360 326,392 274,392" fill="#2c2f35" stroke="#8b939c"/>
      <polygon points="282,392 298,392 294,410 286,410" fill="#3a3d42"/>
      <polygon points="302,392 318,392 314,410 306,410" fill="#3a3d42"/>
      <g font-size="14" fill="#e6ebf2">
        <line x1="290" y1="70" x2="150" y2="60" stroke="#6a7684"/><text x="20" y="64">Nose cone / Payload bay</text>
        <line x1="262" y1="165" x2="150" y2="160" stroke="#6a7684"/><text x="20" y="150">Oxidizer tank</text><text x="20" y="168" font-size="11" fill="#8ba0b4">Liquid oxygen</text>
        <line x1="262" y1="290" x2="150" y2="290" stroke="#6a7684"/><text x="20" y="286">Fuel tank</text><text x="20" y="304" font-size="11" fill="#8ba0b4">Liquid methane</text>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="352" y1="300" x2="470" y2="290" stroke="#6a7684"/><text x="474" y="286">Aft flap</text><text x="474" y="304" font-size="11" fill="#8ba0b4">Controls attitude during reentry</text>
        <line x1="330" y1="230" x2="470" y2="180" stroke="#6a7684"/><text x="474" y="176">Welded steel rings</text><text x="474" y="194" font-size="11" fill="#8ba0b4">Stainless-steel hull, welded ring by ring</text>
        <line x1="300" y1="400" x2="470" y2="392" stroke="#6a7684"/><text x="474" y="388">Engine (Raptor)</text><text x="474" y="406" font-size="11" fill="#8ba0b4">LOX/methane, deeply throttleable</text>
      </g>
    </svg>`}}},Bh={id:"newton-third-law",title:{zh:"牛顿第三定律",en:"Newton's Third Law"},fact:{zh:'火箭不是"推着空气"前进——真空里没有空气它照样飞。它是靠把质量高速往后扔，反作用力把自己往前顶。',en:`A rocket doesn't move by "pushing on air"—in a vacuum there is no air, yet it still flies. It works by hurling mass backward at high speed, and the reaction force pushes it forward.`}},sc=Object.freeze(Object.defineProperty({__proto__:null,level:kh,milestone:Bh},Symbol.toStringTag,{value:"Module"})),Gs={exhaustVelocity:{key:"exhaustVelocity",label:{zh:"排气速度 vₑ",en:"Exhaust velocity vₑ"},min:1e3,max:4e3,step:50,unit:"m/s",default:2500},massFlow:{key:"massFlow",label:{zh:"每秒喷出质量 ṁ",en:"Mass flow rate ṁ"},min:50,max:300,step:5,unit:"kg/s",default:100},totalMass:{key:"totalMass",label:{zh:"火箭总重",en:"Rocket total mass"},min:1e4,max:6e4,step:1e3,unit:"kg",default:4e4}},Hh={id:"1.2",stage:"liftoff",vehicle:"stack",title:{zh:"推重比 TWR",en:"Thrust-to-Weight Ratio (TWR)"},hook:{zh:"光有大推力还不够——如果火箭比自己产生的推力还重，它只会趴在发射台上纹丝不动。",en:"Big thrust alone isn't enough—if the rocket weighs more than the thrust it produces, it just sits on the launch pad without budging."},params:[Gs.exhaustVelocity,Gs.massFlow,Gs.totalMass],compute:n=>{const e=rc(n.massFlow,n.exhaustVelocity),t=Nh(n.totalMass);return{thrust:e,weight:t,twr:zh(e,t)}},goal:{text:{zh:"让推重比 TWR ≥ 1，火箭离开地面",en:"Get the thrust-to-weight ratio TWR ≥ 1 so the rocket lifts off"},check:n=>n.twr>=1},formulaHUD:(n,e,t)=>t==="en"?`TWR = F / (m·g) = ${(e.thrust/1e3).toFixed(0)} kN / ${(e.weight/1e3).toFixed(0)} kN = ${e.twr.toFixed(2)}`:`TWR = F / (m·g) = ${(e.thrust/1e3).toFixed(0)} kN / ${(e.weight/1e3).toFixed(0)} kN = ${e.twr.toFixed(2)}`,milestoneId:"falcon1-flight4"},Gh={id:"falcon1-flight4",title:{zh:"Falcon 1 · 第四次飞行（2008）",en:"Falcon 1 · Fourth Flight (2008)"},fact:{zh:"前三次全部失败、公司濒临破产。第四次成功入轨，SpaceX 成为首个把液体燃料火箭送入轨道的私人公司。",en:"The first three flights all failed and the company was nearly bankrupt. The fourth reached orbit, making SpaceX the first private company to put a liquid-fueled rocket into orbit."}},oc=Object.freeze(Object.defineProperty({__proto__:null,level:Hh,milestone:Gh},Symbol.toStringTag,{value:"Module"})),Xr={exhaustVelocity:{key:"exhaustVelocity",label:{zh:"排气速度 vₑ",en:"Exhaust velocity vₑ"},min:1e3,max:4e3,step:50,unit:"m/s",default:2500},massFlow:{key:"massFlow",label:{zh:"每秒喷出质量 ṁ",en:"Mass flow rate ṁ"},min:50,max:300,step:5,unit:"kg/s",default:100},totalMass:{key:"totalMass",label:{zh:"火箭总重",en:"Rocket total mass"},min:1e4,max:6e4,step:1e3,unit:"kg",default:4e4},fuelFraction:{key:"fuelFraction",label:{zh:"燃料占比",en:"Fuel fraction"},min:.3,max:.96,step:.01,unit:"",default:.8}},Vh={id:"1.3",stage:"ascent",vehicle:"stack",title:{zh:"火箭方程",en:"The Rocket Equation"},hook:{zh:"想飞得更快，就得带更多燃料；但燃料本身也有重量……这个死循环，齐奥尔科夫斯基用一个对数公式讲清楚了。",en:"To fly faster you need to carry more fuel; but the fuel itself has weight... Tsiolkovsky captured this vicious circle in a single logarithmic formula."},params:[Xr.exhaustVelocity,Xr.massFlow,Xr.totalMass,Xr.fuelFraction],compute:n=>{const e=Oh(n.exhaustVelocity,n.fuelFraction);return{deltaV:e,reachedOrbit:Fh(e)}},goal:{text:{zh:"把 Δv 堆到入轨速度 7.8 km/s",en:"Build Δv up to orbital velocity, 7.8 km/s"},check:n=>n.reachedOrbit},formulaHUD:(n,e,t)=>t==="en"?`Δv = vₑ·ln(1/(1−f)) = ${n.exhaustVelocity}·ln(1/${(1-n.fuelFraction).toFixed(2)}) = ${(e.deltaV/1e3).toFixed(2)} km/s`:`Δv = vₑ·ln(1/(1−f)) = ${n.exhaustVelocity}·ln(1/${(1-n.fuelFraction).toFixed(2)}) = ${(e.deltaV/1e3).toFixed(2)} km/s`,milestoneId:"tyranny-rocket-equation"},Wh={id:"tyranny-rocket-equation",title:{zh:'火箭方程的"暴政"',en:'The "Tyranny" of the Rocket Equation'},fact:{zh:"因为 Δv 与质量比是对数关系，想多一点速度就要指数级地多带燃料——这就是火箭 90% 都是燃料的根本原因。",en:"Because Δv depends on the mass ratio logarithmically, a little more speed demands exponentially more fuel—that is the fundamental reason a rocket is 90% fuel."}},ac=Object.freeze(Object.defineProperty({__proto__:null,level:Vh,milestone:Wh},Symbol.toStringTag,{value:"Module"}));let Rr="zh";try{Rr=localStorage.getItem("lang")||"zh"}catch{}const Ro=new Set;function Mr(){return Rr}function lc(n){if(!(n!=="zh"&&n!=="en")){Rr=n;try{localStorage.setItem("lang",n)}catch{}for(const e of Ro)e(n)}}function Go(n){return Ro.add(n),()=>Ro.delete(n)}function ae(n){return n&&typeof n=="object"&&!Array.isArray(n)&&("zh"in n||"en"in n)?n[Rr]!=null?n[Rr]:n.zh!=null?n.zh:n.en:n}const ma=[{key:"rp1",label:{zh:"RP-1 煤油 + 液氧",en:"RP-1 Kerosene + LOX"},default:!1,isp:311,density:{zh:"高",en:"High"},reuse:{zh:"差",en:"Poor"},mars:{zh:"否",en:"No"},note:{zh:"Falcon 9 用它：便宜成熟、罐子小；但结焦难清洗、火星上造不出来。",en:"Used by Falcon 9: cheap, mature, and compact tanks; but it cokes up and is hard to clean, and can't be made on Mars."}},{key:"methane",label:{zh:"液态甲烷 + 液氧",en:"Liquid Methane + LOX"},default:!0,isp:350,density:{zh:"中",en:"Medium"},reuse:{zh:"好",en:"Good"},mars:{zh:"可",en:"Yes"},note:{zh:"星舰的选择：燃烧干净好复用、性能均衡，火星上还能就地制造（ISRU）。",en:"Starship's choice: burns clean and reuses well, well-balanced performance, and can be produced on Mars in situ (ISRU)."}},{key:"hydrogen",label:{zh:"液氢 + 液氧",en:"Liquid Hydrogen + LOX"},default:!1,isp:450,density:{zh:"极低",en:"Very low"},reuse:{zh:"中",en:"Medium"},mars:{zh:"否",en:"No"},note:{zh:"比冲之王，但密度极低（罐子巨大）、超低温难存易泄漏、贵。",en:"The king of specific impulse, but extremely low density (huge tanks), hard to store at ultra-low temperature, prone to leaks, and expensive."}}],Xh={id:"2.1",stage:"ascent",vehicle:"stack",title:{zh:"推进剂之选：液体燃料",en:"Choosing a Propellant: Liquid Fuel"},interaction:"choice",hook:{zh:'火箭在真空里没有空气可烧，所以必须自带"氧化剂"——液体燃料火箭把燃料和氧化剂分成两个大罐、用泵抽进燃烧室。选哪种组合，决定了它能飞多远、好不好回收。',en:'In a vacuum a rocket has no air to burn, so it must carry its own "oxidizer"—a liquid-fuel rocket keeps fuel and oxidizer in two large tanks and pumps them into the combustion chamber. Which combination you pick decides how far it can fly and how easily it can be recovered.'},options:ma,compute:n=>{const e=ma.find(t=>t.key===n.choice);return{isBest:n.choice==="methane",chosen:e}},goal:{text:{zh:'为一艘要"反复使用、还要飞往火星"的飞船，选出最合适的推进剂',en:'Pick the best propellant for a ship that must be "reused repeatedly and also fly to Mars"'},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?`Isp ${e.chosen.isp}s · Density ${ae(e.chosen.density)} · Reuse-friendly ${ae(e.chosen.reuse)} · Mars-producible ${ae(e.chosen.mars)}`:`比冲 Isp ${e.chosen.isp}s · 密度 ${ae(e.chosen.density)} · 复用友好 ${ae(e.chosen.reuse)} · 火星可造 ${ae(e.chosen.mars)}`,diagram:{title:{zh:"液体燃料 · 双贮箱构造",en:"Liquid Fuel · Dual-Tank Layout"},svg:{zh:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a21" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g transform="translate(230,0)">
        <polygon points="0,20 -34,96 34,96" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-34" y="96" width="68" height="250" rx="4" fill="#182238" stroke="#8b939c" stroke-width="2"/>
        <rect x="-30" y="104" width="60" height="104" rx="6" fill="#4f86c6"/>
        <rect x="-30" y="216" width="60" height="110" rx="6" fill="#d99a44"/>
        <polygon points="-30,346 30,346 20,376 -20,376" fill="#2c2f35" stroke="#8b939c"/>
        <line x1="0" y1="208" x2="0" y2="216" stroke="#9fd0ff" marker-end="url(#a21)"/>
        <line x1="-16" y1="326" x2="-10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
        <line x1="16" y1="326" x2="10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="264" y1="150" x2="360" y2="140" stroke="#6a7684"/><text x="364" y="144">氧化剂罐（液氧）</text>
        <line x1="264" y1="270" x2="360" y2="266" stroke="#6a7684"/><text x="364" y="270">燃料罐（甲烷/煤油）</text>
        <line x1="256" y1="360" x2="360" y2="366" stroke="#6a7684"/><text x="364" y="370">涡轮泵 + 发动机</text>
      </g>
      <text x="30" y="360" fill="#9fd0ff" font-size="12">真空里没有空气可烧，</text>
      <text x="30" y="378" fill="#9fd0ff" font-size="12">火箭必须自带氧化剂 → 两个罐子</text>
    </svg>`,en:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a21" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g transform="translate(230,0)">
        <polygon points="0,20 -34,96 34,96" fill="#dfe4ea" stroke="#8b939c"/>
        <rect x="-34" y="96" width="68" height="250" rx="4" fill="#182238" stroke="#8b939c" stroke-width="2"/>
        <rect x="-30" y="104" width="60" height="104" rx="6" fill="#4f86c6"/>
        <rect x="-30" y="216" width="60" height="110" rx="6" fill="#d99a44"/>
        <polygon points="-30,346 30,346 20,376 -20,376" fill="#2c2f35" stroke="#8b939c"/>
        <line x1="0" y1="208" x2="0" y2="216" stroke="#9fd0ff" marker-end="url(#a21)"/>
        <line x1="-16" y1="326" x2="-10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
        <line x1="16" y1="326" x2="10" y2="348" stroke="#ffb25a" marker-end="url(#a21)"/>
      </g>
      <g font-size="14" fill="#e6ebf2">
        <line x1="264" y1="150" x2="360" y2="140" stroke="#6a7684"/><text x="364" y="144">Oxidizer tank (LOX)</text>
        <line x1="264" y1="270" x2="360" y2="266" stroke="#6a7684"/><text x="364" y="270">Fuel tank (methane/kerosene)</text>
        <line x1="256" y1="360" x2="360" y2="366" stroke="#6a7684"/><text x="364" y="370">Turbopump + engine</text>
      </g>
      <text x="30" y="360" fill="#9fd0ff" font-size="12">There's no air to burn in a vacuum,</text>
      <text x="30" y="378" fill="#9fd0ff" font-size="12">so the rocket must carry its own oxidizer → two tanks</text>
    </svg>`}},milestoneId:"starship-methane"},qh={id:"starship-methane",title:{zh:"星舰的选择：甲烷",en:"Starship's Choice: Methane"},fact:{zh:'马斯克为星舰选了液氧甲烷——不是性能最高（液氢更高），而是最"平衡且面向复用"：燃烧干净、发动机好翻新重启，而且甲烷能在火星上用二氧化碳和水就地合成，让飞船能加注返航。这就是可复用+去火星的钥匙。',en:'Musk chose LOX/methane for Starship—not because it has the highest performance (hydrogen is higher), but because it is the most "balanced and reuse-oriented": it burns clean, the engines are easy to refurbish and restart, and methane can be synthesized on Mars in situ from carbon dioxide and water, letting the ship refuel for the return trip. This is the key to reusability plus reaching Mars.'}},cc=Object.freeze(Object.defineProperty({__proto__:null,level:Xh,milestone:qh},Symbol.toStringTag,{value:"Module"})),ga={chamberPressure:{key:"chamberPressure",label:{zh:"燃烧室压力",en:"Chamber pressure"},min:50,max:300,step:10,unit:"bar",default:100},expansionRatio:{key:"expansionRatio",label:{zh:"喷管膨胀比",en:"Nozzle expansion ratio"},min:10,max:200,step:5,unit:":1",default:30}},$h={id:"2.2",stage:"ascent",vehicle:"stack",highlight:"engine",title:{zh:"燃烧室与喷管",en:"Combustion Chamber & Nozzle"},hook:{zh:"燃烧室里的燃气又热又高压，但真正决定火箭飞多快的，是喷管怎么把这团混乱的气体，捏成一股笔直高速的气流喷出去。",en:"The gas in the combustion chamber is scorching hot and highly pressurized, but what really determines how fast the rocket flies is how the nozzle squeezes that chaotic gas into a single straight, high-speed jet."},params:[ga.chamberPressure,ga.expansionRatio],compute:n=>({ve:1800+260*Math.log(n.expansionRatio)+3*Math.sqrt(n.chamberPressure)}),goal:{text:{zh:"把排气速度 vₑ 提到至少 3200 m/s",en:"Raise exhaust velocity vₑ to at least 3200 m/s"},check:n=>n.ve>=3200},formulaHUD:(n,e,t)=>t==="en"?`vₑ ≈ 1800 + 260×ln(${n.expansionRatio}) + 3×√${n.chamberPressure} = ${e.ve.toFixed(0)} m/s`:`vₑ ≈ 1800 + 260×ln(${n.expansionRatio}) + 3×√${n.chamberPressure} = ${e.ve.toFixed(0)} m/s`,milestoneId:"nozzle-expansion-ratio",diagram:{title:{zh:"燃烧室与喷管 · 3D 剖面（发动机在火箭尾部，已高亮）",en:"Combustion Chamber & Nozzle · 3D cutaway (the engine sits at the rocket's tail, highlighted)"},model3d:"engine",legend:{zh:"橙管进<b>甲烷</b>、蓝管进<b>液氧</b>，在<b>喷注面板</b>混合点燃 → <b>燃烧室</b>又热又高压 → 收窄的<b>喉部</b>（气流达音速）→ 下方<b>钟形喷管</b>膨胀提速喷出。<br>膨胀比 ε = 出口面积 ÷ 喉部面积，越大 → 真空里膨胀越充分、喷得越快",en:"The orange line feeds <b>methane</b>, the blue line feeds <b>liquid oxygen</b>; they mix and ignite at the <b>injector plate</b> → the <b>combustion chamber</b> runs hot and high-pressure → the narrowing <b>throat</b> (where the flow reaches the speed of sound) → the <b>bell nozzle</b> below expands the flow, speeding it up as it exhausts.<br>Expansion ratio ε = exit area ÷ throat area; the larger it is → the more fully the flow expands in vacuum and the faster it exhausts"}}},Yh={id:"nozzle-expansion-ratio",title:{zh:"喷管膨胀比",en:"Nozzle Expansion Ratio"},fact:{zh:'喷管就像一个越吹越大的喇叭口：燃气从窄喉部冲进去，在扩张段里膨胀降压，把热能换成速度。膨胀比越大，气流能膨胀得越充分、喷得越快——但这只在真空或低压环境里才划算，大气压太高会让气流在喷管里"分离"，反而白白浪费。这也是为什么真空发动机的喷管都又长又大。',en:'A nozzle works like a flared horn that keeps widening: the gas rushes in through the narrow throat, then expands and drops in pressure through the diverging section, trading heat energy for speed. The larger the expansion ratio, the more fully the flow can expand and the faster it exhausts—but this only pays off in vacuum or low-pressure environments. Too much ambient pressure makes the flow "separate" inside the nozzle, wasting energy instead. That is why vacuum engines have such long, large nozzles.'}},hc=Object.freeze(Object.defineProperty({__proto__:null,level:$h,milestone:Yh},Symbol.toStringTag,{value:"Module"})),_a=[{key:"gasgen",label:{zh:"燃气发生器循环",en:"Gas-generator cycle"},default:!1,efficiency:{zh:"一般",en:"Fair"},complexity:{zh:"低",en:"Low"},reusable:{zh:"差",en:"Poor"},note:{zh:"Merlin 用它：简单可靠、造起来便宜，但一部分燃料没进主燃烧室就被排掉，效率打了折扣。",en:"Used by Merlin: simple, reliable, and cheap to build, but some of the propellant is dumped overboard before ever reaching the main chamber, which costs efficiency."}},{key:"staged",label:{zh:"分级燃烧循环",en:"Staged-combustion cycle"},default:!1,efficiency:{zh:"高",en:"High"},complexity:{zh:"高",en:"High"},reusable:{zh:"中",en:"Medium"},note:{zh:"涡轮废气也送回主燃烧室燃烧，效率更高，但涡轮泵压力极高、结构复杂，对可靠性要求苛刻。",en:"The turbine exhaust is also routed back into the main chamber to burn, giving higher efficiency—but the turbopump pressures are extreme and the structure is complex, demanding very high reliability."}},{key:"fullflow",label:{zh:"全流量分级燃烧循环",en:"Full-flow staged-combustion cycle"},default:!0,efficiency:{zh:"最高",en:"Highest"},complexity:{zh:"极高",en:"Very high"},reusable:{zh:"好",en:"Good"},note:{zh:"猛禽 Raptor 用它：燃料和氧化剂全部先富燃/富氧燃烧再汇入主室，燃烧最充分、涡轮温度更低更耐用，是反复复飞的利器——但研发难度最大。",en:"Used by Raptor: all of the fuel and oxidizer are first burned fuel-rich/oxygen-rich, then merge into the main chamber. Combustion is most complete, turbine temperatures are lower and more durable—the ideal tool for repeated reflights—but it is the hardest to develop."}}],jh={id:"2.3",stage:"ascent",vehicle:"stack",title:{zh:"发动机循环",en:"Engine Cycles"},interaction:"choice",hook:{zh:'发动机的"心脏"是涡轮泵，怎么驱动涡轮泵、怎么处理驱动完的废气，决定了发动机能不能被高效点火、反复使用几十次而不用大修。',en:'The "heart" of an engine is its turbopump. How you drive that turbopump—and what you do with the exhaust once it has done its job—decides whether the engine can be fired efficiently and reused dozens of times without an overhaul.'},options:_a,compute:n=>{const e=_a.find(t=>t.key===n.choice);return{isBest:n.choice==="fullflow",chosen:e}},goal:{text:{zh:'为一台要"反复复飞、快速翻新再发射"的发动机，选出最合适的循环方式',en:"Pick the best cycle for an engine meant to fly again and again, refurbished and relaunched quickly"},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?`Efficiency ${ae(e.chosen.efficiency)} · Complexity ${ae(e.chosen.complexity)} · Reuse-friendly ${ae(e.chosen.reusable)}`:`效率 ${ae(e.chosen.efficiency)} · 复杂度 ${ae(e.chosen.complexity)} · 复用友好 ${ae(e.chosen.reusable)}`,diagram:{title:{zh:"全流量分级燃烧循环 · 气体怎么走（3D）",en:"Full-flow staged-combustion cycle · how the gas flows (3D)"},model3d:"engine-cycle",legend:{zh:"<b>橙</b>=甲烷、<b>蓝</b>=液氧：各自经<b>预燃室</b>先烧一点驱动自己的<b>涡轮泵</b>，废气再一起汇入<b>主燃烧室</b>二次烧尽 → 过<b>喉部</b>加速 → <b>钟形喷管</b>喷出。<br>全流量=两股全部进主室，几乎不浪费 → 效率最高、涡轮温度低、最耐复用。",en:"<b>Orange</b>=methane, <b>blue</b>=liquid oxygen: each is partly burned in its own <b>preburner</b> to drive its own <b>turbopump</b>, then the exhaust merges into the <b>main chamber</b> to burn completely → accelerates through the <b>throat</b> → exhausts out the <b>bell nozzle</b>.<br>Full-flow = both streams go entirely into the main chamber, wasting almost nothing → highest efficiency, low turbine temperature, most durable for reuse."},svg:{zh:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="a23" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker>
        <linearGradient id="g23" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff6a2a"/></linearGradient>
      </defs>
      <g font-size="12" fill="#e6ebf2" text-anchor="middle">
        <rect x="70" y="40" width="120" height="40" rx="6" fill="#2a3550" stroke="#5b8fd0"/><text x="130" y="65">燃料泵</text>
        <rect x="410" y="40" width="120" height="40" rx="6" fill="#503028" stroke="#d08a5b"/><text x="470" y="65">氧化剂泵</text>
        <rect x="70" y="130" width="120" height="46" rx="6" fill="#3a2f4a" stroke="#9a7bd0"/><text x="130" y="151">富燃预燃室</text><text x="130" y="167" font-size="10" fill="#b0a0d0">驱动燃料泵</text>
        <rect x="410" y="130" width="120" height="46" rx="6" fill="#4a3524" stroke="#d0a05b"/><text x="470" y="151">富氧预燃室</text><text x="470" y="167" font-size="10" fill="#d0b48a">驱动氧化剂泵</text>
        <rect x="220" y="230" width="160" height="52" rx="8" fill="url(#g23)"/><text x="300" y="255" fill="#3a1a08">主燃烧室</text><text x="300" y="272" font-size="10" fill="#5a2a10">两股都在这里烧尽</text>
        <polygon points="230,282 370,282 340,340 260,340" fill="#2c2f35" stroke="#8b939c"/>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.6">
        <line x1="130" y1="80" x2="130" y2="128" marker-end="url(#a23)"/>
        <line x1="470" y1="80" x2="470" y2="128" marker-end="url(#a23)"/>
        <line x1="130" y1="176" x2="250" y2="228" marker-end="url(#a23)"/>
        <line x1="470" y1="176" x2="350" y2="228" marker-end="url(#a23)"/>
      </g>
      <text x="24" y="380" fill="#9fd0ff" font-size="12">燃料、氧化剂各自预燃驱动各自的泵，几乎不浪费 → 效率最高、最耐复用</text>
    </svg>`,en:`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="a23" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#9fd0ff"/></marker>
        <linearGradient id="g23" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd98a"/><stop offset="1" stop-color="#ff6a2a"/></linearGradient>
      </defs>
      <g font-size="12" fill="#e6ebf2" text-anchor="middle">
        <rect x="70" y="40" width="120" height="40" rx="6" fill="#2a3550" stroke="#5b8fd0"/><text x="130" y="65">Fuel pump</text>
        <rect x="410" y="40" width="120" height="40" rx="6" fill="#503028" stroke="#d08a5b"/><text x="470" y="65">Oxidizer pump</text>
        <rect x="70" y="130" width="120" height="46" rx="6" fill="#3a2f4a" stroke="#9a7bd0"/><text x="130" y="151">Fuel-rich preburner</text><text x="130" y="167" font-size="10" fill="#b0a0d0">Drives fuel pump</text>
        <rect x="410" y="130" width="120" height="46" rx="6" fill="#4a3524" stroke="#d0a05b"/><text x="470" y="151">Oxygen-rich preburner</text><text x="470" y="167" font-size="10" fill="#d0b48a">Drives oxidizer pump</text>
        <rect x="220" y="230" width="160" height="52" rx="8" fill="url(#g23)"/><text x="300" y="255" fill="#3a1a08">Main chamber</text><text x="300" y="272" font-size="10" fill="#5a2a10">Both streams burn out here</text>
        <polygon points="230,282 370,282 340,340 260,340" fill="#2c2f35" stroke="#8b939c"/>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.6">
        <line x1="130" y1="80" x2="130" y2="128" marker-end="url(#a23)"/>
        <line x1="470" y1="80" x2="470" y2="128" marker-end="url(#a23)"/>
        <line x1="130" y1="176" x2="250" y2="228" marker-end="url(#a23)"/>
        <line x1="470" y1="176" x2="350" y2="228" marker-end="url(#a23)"/>
      </g>
      <text x="24" y="380" fill="#9fd0ff" font-size="12">Fuel and oxidizer each preburn to drive their own pump, wasting almost nothing → highest efficiency, most durable for reuse</text>
    </svg>`}},milestoneId:"raptor-fullflow"},Zh={id:"raptor-fullflow",title:{zh:"猛禽的全流量分级燃烧",en:"Raptor's Full-Flow Staged Combustion"},fact:{zh:'猛禽发动机把燃料和氧化剂分别送进两个预燃室，先各自"富燃"和"富氧"燃烧驱动各自的涡轮泵，废气再一起汇入主燃烧室二次燃烧。这样涡轮温度更低、燃烧效率更高，发动机磨损小、翻新快——正是星舰追求"完全且快速复用"的关键一环。',en:`The Raptor engine sends fuel and oxidizer into two separate preburners, first burning each "fuel-rich" and "oxygen-rich" to drive its own turbopump, then merging the exhaust into the main chamber for a second, complete burn. This keeps turbine temperatures lower and combustion more efficient, so the engine wears less and refurbishes faster—a key piece of Starship's pursuit of "full and rapid reuse."`}},uc=Object.freeze(Object.defineProperty({__proto__:null,level:jh,milestone:Zh},Symbol.toStringTag,{value:"Module"})),Vs=[{key:"ignite",label:{zh:"二级点火（热分离）",en:"Stage 2 ignites (hot-staging)"}},{key:"throttle",label:{zh:"一级关大部分主机",en:"Booster shuts down most engines"}},{key:"ring",label:{zh:"一级抛级间环",en:"Booster jettisons hot-stage ring"}},{key:"sep",label:{zh:"级间分离",en:"Stage separation"}}],xa=["throttle","ignite","sep","ring"],Jh=(n,e)=>n.length===e.length&&n.every((t,i)=>t===e[i]),Kh={id:"3.2",stage:"separate",vehicle:"stack",title:{zh:"级间分离时序",en:"Stage Separation Timing"},interaction:"sequence",hook:{zh:'上升段最惊险的几秒——级间分离。动作早一步会顶爆、晚一步会烧穿，"级间环"不抛一级就飞不回来。按星舰"热分离"的飞行手册，把这几步排成正确时序。',en:`The most nerve-wracking seconds of ascent — staging. A step too early and it blows up, too late and it burns through, and if the "hot-stage ring" isn't dropped the booster can't fly home. Order these steps per Starship's hot-staging flight manual.`},steps:Vs,compute:n=>({correct:Jh(n.order||[],xa),done:(n.order||[]).length===xa.length}),goal:{text:{zh:'按星舰"热分离"排出正确时序',en:`Arrange the correct sequence for Starship's "hot-staging"`},check:n=>n.correct},formulaHUD:(n,e,t)=>e.correct?t==="en"?"Sequence correct — hot-staging succeeded ✓":"时序正确 ✓ 热分离成功":t==="en"?`Arranged ${(n.order||[]).length}/${Vs.length} steps`:`已排 ${(n.order||[]).length}/${Vs.length} 步`,milestoneId:"stage-separation-timing"},Qh={id:"stage-separation-timing",title:{zh:"热分离：星舰的招牌一招",en:"Hot-Staging: Starship's Signature Move"},fact:{zh:'传统火箭是"先分离、再点火"，中间有一段一级熄火、二级还没点着的失重滑行，靠沉降火箭或弹簧把两级推开。星舰改用"热分离（hot-staging）"：一级先关掉大部分主机、只留中心几台稳住，二级就在一级顶上直接点火，炽热喷流穿过带孔的"级间环"把一级硬生生顶开。这样几乎不损失速度、结构更简单，代价是一级顶部要扛住二级的火焰、还要在分离后抛掉那圈笨重的级间环才好返场回收。',en:`Traditional rockets "separate then ignite," with a weightless coast in between where the booster has cut off but the upper stage hasn't lit yet, relying on ullage motors or springs to push the stages apart. Starship uses "hot-staging" instead: the booster shuts down most of its engines, keeping only a few center ones running to stay stable, and the upper stage ignites directly on top of it, its blazing exhaust blasting through a vented "hot-stage ring" to force the booster away. This loses almost no speed and keeps the structure simpler, at the cost of the booster's top having to withstand the upper stage's flames — and having to drop that heavy ring after separation before it can fly home to be recovered.`}},fc=Object.freeze(Object.defineProperty({__proto__:null,level:Kh,milestone:Qh},Symbol.toStringTag,{value:"Module"})),va=[{key:"alli",label:{zh:"铝锂合金",en:"Aluminum-lithium alloy"},default:!1,mass:{zh:"轻",en:"Light"},cost:{zh:"贵",en:"Expensive"},heat:{zh:"差",en:"Poor"},repair:{zh:"中",en:"Medium"},note:{zh:"航天工业成熟首选：轻、强度好，但价格高、不耐再入高温，得裹厚厚一层隔热瓦才能扛住返回时的高温。",en:"The mature aerospace-industry favorite: light and strong, but pricey and poor at surviving reentry heat, so it needs a thick layer of heat-shield tiles to withstand the high temperatures of return."}},{key:"steel",label:{zh:"不锈钢",en:"Stainless steel"},default:!0,mass:{zh:"较重",en:"Heavier"},cost:{zh:"便宜",en:"Cheap"},heat:{zh:"好",en:"Good"},repair:{zh:"好",en:"Good"},note:{zh:'星舰的反直觉选择：密度更高、单看更重，但便宜到能"堆料"、本身就耐高温、好焊接好修补，特别适合天天飞的可复用飞船。',en:`Starship's counterintuitive choice: denser and heavier on paper, but cheap enough to "throw material at the problem," inherently heat-resistant, and easy to weld and patch — perfect for a reusable ship that flies every day.`}},{key:"carbon",label:{zh:"碳纤维",en:"Carbon fiber"},default:!1,mass:{zh:"最轻",en:"Lightest"},cost:{zh:"极贵",en:"Very expensive"},heat:{zh:"差",en:"Poor"},repair:{zh:"差",en:"Poor"},note:{zh:"最轻但极贵，大直径贮箱工艺难做、良品率低，星舰早期方案里曾用过又放弃。",en:"The lightest but extremely expensive; large-diameter tanks are hard to manufacture with low yield rates. Starship's early designs used it and then abandoned it."}}],eu={id:"3.3",env:"space",stage:"ascent",title:{zh:"钢还是铝",en:"Steel or Aluminum"},interaction:"choice",hook:{zh:'选火箭主结构材料，直觉都会先选"最轻的"。但马斯克给星舰选了密度更大的不锈钢——因为对一艘要反复回收、反复再入大气层的飞船来说，便宜、耐热、好修远比"轻一点"更重要。',en:`When choosing a rocket's primary structural material, intuition says pick "the lightest." But Musk chose denser stainless steel for Starship — because for a ship meant to be recovered and reenter the atmosphere over and over, being cheap, heat-resistant, and easy to repair matters far more than being "a bit lighter."`},options:va,compute:n=>{const e=va.find(t=>t.key===n.choice);return{isBest:n.choice==="steel",chosen:e}},goal:{text:{zh:'为一艘要"每天可能都要再入大气层、还要能快速检修再飞"的飞船，选出最合适的主结构材料',en:'For a ship that "may need to reenter the atmosphere every day and be quickly serviced and flown again," pick the best-suited primary structural material'},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?`Mass ${ae(e.chosen.mass)} · Cost ${ae(e.chosen.cost)} · Heat resistance ${ae(e.chosen.heat)} · Repairability ${ae(e.chosen.repair)}`:`质量 ${ae(e.chosen.mass)} · 成本 ${ae(e.chosen.cost)} · 耐高温 ${ae(e.chosen.heat)} · 易维修 ${ae(e.chosen.repair)}`,milestoneId:"starship-stainless-steel"},tu={id:"starship-stainless-steel",title:{zh:"星舰的反直觉选择：不锈钢",en:"Starship's Counterintuitive Choice: Stainless Steel"},fact:{zh:'铝锂合金更轻、碳纤维更极致，但星舰选了看起来"更重"的不锈钢：它便宜到几十倍于碳纤维、本身能扛住再入高温（省去大量隔热瓦）、又好焊接好补洞。对一艘追求"像飞机一样天天飞、坏了当天修"的可复用飞船，这些才是决定成败的关键，而不是单纯的轻。',en:`Aluminum-lithium is lighter and carbon fiber is more extreme, but Starship chose the seemingly "heavier" stainless steel: it's dozens of times cheaper than carbon fiber, can withstand reentry heat on its own (saving a lot of heat-shield tiles), and is easy to weld and patch. For a reusable ship that aims to "fly every day like an airplane and be fixed the same day if it breaks," these are what decide success or failure — not lightness alone.`}},dc=Object.freeze(Object.defineProperty({__proto__:null,level:eu,milestone:tu},Symbol.toStringTag,{value:"Module"})),nu={tankPressure:{key:"tankPressure",label:{zh:"贮箱压力 P",en:"Tank pressure P"},min:1,max:8,step:.5,unit:"bar",default:1}},iu={id:"3.4",env:"space",stage:"ascent",title:{zh:"贮箱增压",en:"Tank Pressurization"},hook:{zh:'推进剂罐子看着是个铁皮桶，其实要一直"打气"撑住——压力低了泵会吸空、薄壁会瘪掉；压力高了罐子直接爆开。',en:'A propellant tank looks like a metal drum, but it actually has to be "pumped up" the whole time to hold its shape — too little pressure and the pumps cavitate and the thin walls buckle; too much and the tank simply bursts.'},params:[nu.tankPressure],compute:n=>({safe:n.tankPressure>=3&&n.tankPressure<=6,tooLow:n.tankPressure<3,tooHigh:n.tankPressure>6}),goal:{text:{zh:"把贮箱压力调进安全区 3~6 bar",en:"Set the tank pressure into the safe zone of 3–6 bar"},check:n=>n.safe},formulaHUD:(n,e,t)=>t==="en"?`Pressure P = ${n.tankPressure.toFixed(1)} bar · ${e.tooLow?"Too low: pumps cavitate, thin walls collapse⚠️":e.tooHigh?"Overpressure: tank may rupture⚠️":"Safe zone, pump inlet flow normal✅"}`:`压力 P = ${n.tankPressure.toFixed(1)} bar · ${e.tooLow?"偏低：泵吸空、薄壁塌陷⚠️":e.tooHigh?"超压：罐体可能破裂⚠️":"安全区，泵进气正常✅"}`,diagram:{title:{zh:"自生增压 · 贮箱自己给自己打气",en:"Autogenous Pressurization · the tank pumps itself up"},model3d:"autogenous",legend:{zh:"<b>自生增压</b>：从贮箱底部抽出少量<b>液氧 / 液甲烷</b>（细流↓）→ 流经<b>发动机</b>被余热<b>汽化</b>成高压气体 → 打回<b>自己贮箱顶部的气枕</b>（浅色流↑），把箱压顶在安全区。<br>不用额外背一整套<b>氦气瓶</b>，省重量、也省一套独立增压系统。压力太低泵会吸空、薄壁塌陷；太高罐体破裂。",en:"<b>Autogenous pressurization</b>: a small amount of <b>liquid oxygen / methane</b> is drawn from the bottom of each tank (thin flow ↓) → passes through the <b>engine</b> where waste heat <b>vaporizes</b> it into high-pressure gas → fed back into <b>the ullage at the top of its own tank</b> (pale flow ↑), holding tank pressure in the safe zone.<br>No need to carry a whole set of <b>helium bottles</b> — saving weight and an entire separate pressurization system. Too little pressure and the pumps cavitate and thin walls buckle; too much and the tank ruptures."}},milestoneId:"autogenous-pressurization"},ru={id:"autogenous-pressurization",title:{zh:"自生增压 Autogenous",en:"Autogenous Pressurization"},fact:{zh:'星舰不用额外带氦气瓶增压，而是抽一部分液氧、液甲烷出来，经发动机余热汽化成气体，再打回各自的贮箱顶部——这叫"自生增压"，省重量还省一套独立的增压系统。',en:`Instead of carrying extra helium bottles to pressurize its tanks, Starship taps off a portion of its liquid oxygen and liquid methane, vaporizes it into gas using the engine's waste heat, and feeds it back into the top of each respective tank — this is called "autogenous pressurization," saving weight and eliminating a separate pressurization system.`}},pc=Object.freeze(Object.defineProperty({__proto__:null,level:iu,milestone:ru},Symbol.toStringTag,{value:"Module"})),su={throttle:{key:"throttle",label:{zh:"过 Max-Q 时的油门 throttle",en:"Throttle at Max-Q"},min:50,max:100,step:1,unit:"%",default:100}},Ws=600,ou={id:"4.2",stage:"ascent",vehicle:"stack",title:{zh:"最大动压 Max-Q",en:"Maximum Dynamic Pressure (Max-Q)"},hook:{zh:'火箭穿过稠密大气层时，速度和空气密度的乘积会先冲高再回落——那个峰值叫"最大动压"，简称 Max-Q。发射直播里那句"Max-Q，主机节流"，就是主控在这一刻把发动机拉低推力，怕结构被吹散。',en:'As a rocket climbs through the dense lower atmosphere, the product of its speed and the air density rises then falls back — that peak is called "maximum dynamic pressure," or Max-Q for short. That line in launch broadcasts, "Max-Q, throttling down," is mission control cutting engine thrust at this moment, for fear the structure could be torn apart.'},params:[su.throttle],compute:n=>{const e=n.throttle*7.2;return{q:e,safe:e<=Ws}},goal:{text:{zh:"把 Max-Q 时的油门调到 65%~80% 之间，既压住动压又不浪费太多速度",en:"Set the throttle at Max-Q between 65% and 80% — enough to hold down the dynamic pressure without wasting too much speed"},check:n=>n.q>=65*7.2&&n.q<=80*7.2},formulaHUD:(n,e,t)=>t==="en"?`Throttle ${n.throttle}% → q ≈ ${e.q.toFixed(0)} kPa (limit ${Ws} kPa) · Dynamic pressure: ${e.safe?"Safe":"Over limit"}`:`油门 ${n.throttle}% → q ≈ ${e.q.toFixed(0)} kPa（上限 ${Ws} kPa）· 动压水平：${e.safe?"安全":"超限"}`,milestoneId:"max-q-throttle-down"},au={id:"max-q-throttle-down",title:{zh:"Max-Q：主机节流",en:"Max-Q: Throttling Down the Engines"},fact:{zh:'火箭飞得越快，撞上的空气就越"硬"；但飞得越高，空气又越稀薄。这两者相乘，在跨音速附近会出现一个动压峰值——Max-Q。这一刻结构承受的气动载荷最大，所以主机会临时降低推力（节流），把加速度压一压，等穿过稠密大气层再重新全力爬升。',en:'The faster a rocket flies, the "harder" the air it slams into; but the higher it climbs, the thinner the air becomes. Multiply these two together and a dynamic-pressure peak appears near the transonic region — Max-Q. At this moment the structure bears the greatest aerodynamic load, so the engines temporarily reduce thrust (throttle down) to ease the acceleration, then throttle back up to full power once past the dense atmosphere.'}},mc=Object.freeze(Object.defineProperty({__proto__:null,level:ou,milestone:au},Symbol.toStringTag,{value:"Module"})),lu={horizontalV:{key:"horizontalV",label:{zh:"横向速度 v",en:"Horizontal velocity v"},min:0,max:9e3,step:100,unit:"m/s",default:2e3}},cu={id:"4.3",env:"space",stage:"ascent",title:{zh:"入轨=往旁边飞得够快",en:"Reaching orbit = flying sideways fast enough"},hook:{zh:'很多人以为"入轨"是飞得够高。其实真正的秘密是：往旁边飞得够快，快到你不断往下掉，却总也落不到地面上。',en:'Many people think "reaching orbit" means flying high enough. The real secret is flying sideways so fast that even though you keep falling, you never actually hit the ground.'},params:[lu.horizontalV],compute:n=>({inOrbit:n.horizontalV>=7800}),goal:{text:{zh:"把横向速度调到至少 7800 m/s（近地轨道速度）",en:"Set horizontal velocity to at least 7800 m/s (low Earth orbit velocity)"},check:n=>n.inOrbit},formulaHUD:(n,e,t)=>t==="en"?`Horizontal velocity ${n.horizontalV} m/s / 7800 m/s needed for orbit → ${e.inOrbit?"Earth's curvature can't keep up with your fall — orbit achieved!":"Not yet matching Earth's curvature, you'll fall back to the ground"}`:`横向速度 ${n.horizontalV} m/s / 入轨所需 7800 m/s → ${e.inOrbit?"地面弧度追不上你的下落，成功入轨！":"还没追上地球的弧度，会掉回地面"}`,milestoneId:"orbit-is-falling"},hu={id:"orbit-is-falling",title:{zh:"轨道的本质是永远在下落",en:"An orbit is really just falling forever"},fact:{zh:'牛顿的思想实验：把炮弹打得越来越快，它落地前飞过的距离越来越远。当速度快到"落下的弧度"恰好等于"地球表面弯曲远离你的弧度"，你就会一直下落、却一直绕地球飞——这就是轨道。入轨不是逃离重力，而是让重力和你的速度配合着让你"永远够不到地面"。',en:`Newton's thought experiment: fire a cannonball faster and faster, and it travels farther before hitting the ground. When it goes fast enough that the arc of its fall exactly matches the arc of Earth's surface curving away beneath it, you keep falling yet keep circling the Earth — that is an orbit. Reaching orbit isn't escaping gravity; it's letting gravity and your speed work together so you "can never reach the ground."`}},gc=Object.freeze(Object.defineProperty({__proto__:null,level:cu,milestone:hu},Symbol.toStringTag,{value:"Module"})),Xs=[{key:"circularize",label:{zh:"远地点圆化点火",en:"Circularization burn at apogee"}},{key:"deploy",label:{zh:"载荷释放",en:"Payload deployment"}},{key:"sep",label:{zh:"一二级分离",en:"Stage separation"}},{key:"coast",label:{zh:"滑行到远地点",en:"Coast to apogee"}},{key:"ignite",label:{zh:"二级主机点火",en:"Second-stage main engine ignition"}}],ya=["sep","ignite","coast","circularize","deploy"],uu=(n,e)=>n.length===e.length&&n.every((t,i)=>t===e[i]),fu={id:"4.4",env:"space",stage:"ascent",title:{zh:"二级点火入轨",en:"Second-stage burn to orbit"},interaction:"sequence",hook:{zh:"一级只负责把二级抬出大气层——真正把载荷送进轨道的,是二级那台在寂静太空里点两次火的发动机。",en:"The first stage only lifts the second stage out of the atmosphere — what actually delivers the payload to orbit is the second-stage engine, firing twice in the silence of space."},steps:Xs,compute:n=>({correct:uu(n.order||[],ya),done:(n.order||[]).length===ya.length}),goal:{text:{zh:"把二级入轨的正确时序排出来",en:"Arrange the correct sequence for the second stage to reach orbit"},check:n=>n.correct},formulaHUD:(n,e,t)=>t==="en"?e.correct?"Sequence correct! Second stage reached orbit":`${(n.order||[]).length}/${Xs.length} steps arranged`:e.correct?"时序正确！二级成功入轨":`已排 ${(n.order||[]).length}/${Xs.length} 步`,milestoneId:"second-stage-two-burns"},du={id:"second-stage-two-burns",title:{zh:"二级为什么要点两次火",en:"Why the second stage fires twice"},fact:{zh:'第一次点火把飞船送上一条椭圆转移轨道,近地点还压在大气层边缘;滑行到远地点后再点第二次火,把轨道"圆化",这样近地点才不会再一头扎回大气层。先入轨、再圆化,是几乎所有航天器上太空的标准套路。',en:'The first burn puts the spacecraft on an elliptical transfer orbit whose perigee still grazes the edge of the atmosphere; after coasting to apogee, a second burn "circularizes" the orbit so the perigee no longer dips back into the atmosphere. Insert first, then circularize — this is the standard playbook for almost every spacecraft heading to space.'}},_c=Object.freeze(Object.defineProperty({__proto__:null,level:fu,milestone:du},Symbol.toStringTag,{value:"Module"})),Ma=[{key:"none",label:{zh:"什么都不做，等它自己回正",en:"Do nothing and wait for it to right itself"},default:!1,response:{zh:"继续倾倒",en:"Keeps tipping over"},outcome:{zh:"翻",en:"Topples"},note:{zh:"火箭又高又细、重心天生不稳，姿态偏差会越来越大——不管，几秒内就会彻底翻倒解体。",en:"A rocket is tall and slender with an inherently unstable center of mass, so an attitude error only grows — leave it alone and within seconds it will topple and break apart."}},{key:"correct",label:{zh:"按偏差比例，把发动机推力矢量偏向右侧修正",en:"Vector the engine thrust to the right in proportion to the error"},default:!0,response:{zh:"小角度回摆",en:"Small corrective swing back"},outcome:{zh:"稳",en:"Stable"},note:{zh:'这就是闭环制导：传感器测出偏差有多大，就按比例给多大的修正力，每秒重复几百次，把火箭稳稳"走钢丝"般立住。',en:"This is closed-loop guidance: the sensors measure how large the error is, apply a correction force proportional to it, and repeat hundreds of times per second, keeping the rocket balanced as if walking a tightrope."}},{key:"overcorrect",label:{zh:"不管偏差大小，一律把发动机猛地打到底",en:"Slam the engine hard over to the stop regardless of the error size"},default:!1,response:{zh:"大幅反向摆动",en:"Large reverse swing"},outcome:{zh:"震荡失控",en:"Oscillates out of control"},note:{zh:'修正量和偏差不成比例，火箭会被"过修正"甩向另一侧，再被下一次过修正甩回来，越摆越大直至失控。',en:'When the correction is out of proportion to the error, the rocket gets "over-corrected" and flung to the other side, then flung back by the next over-correction, swinging wider and wider until it loses control.'}}],pu={id:"5.4",env:"space",stage:"ascent",title:{zh:"GNC：机器怎么自己稳住",en:"GNC: how the machine stabilizes itself"},interaction:"choice",hook:{zh:'火箭又高又细，立在自己的推力上，天生就想像扫帚倒立一样往一边翻。人手根本反应不过来——闭环制导每秒要修正几百次,靠的是"测量-计算-作动"的飞轮。现在火箭正开始向左倾倒，你会怎么操作？',en:`A rocket is tall and slender, balanced on its own thrust, and naturally wants to tip over to one side like an upended broom. Human hands simply can't react fast enough — closed-loop guidance corrects hundreds of times per second, driven by a "measure-compute-actuate" flywheel. The rocket is now starting to tip to the left. What do you do?`},options:Ma,compute:n=>{const e=Ma.find(t=>t.key===n.choice);return{isBest:n.choice==="correct",chosen:e}},goal:{text:{zh:"在火箭开始向左倾倒时，选出能让它稳稳立住的控制动作",en:"As the rocket starts tipping to the left, pick the control action that keeps it standing steady"},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?`Action: "${ae(e.chosen.label)}" → ${ae(e.chosen.response)} → Result: ${ae(e.chosen.outcome)}`:`动作："${ae(e.chosen.label)}" → ${ae(e.chosen.response)} → 结果：${ae(e.chosen.outcome)}`,milestoneId:"gnc-closed-loop"},mu={id:"gnc-closed-loop",title:{zh:"GNC 闭环：比人快得多",en:"The GNC loop: far faster than a human"},fact:{zh:'制导-导航-控制（GNC）是一个不停打转的闭环：传感器（陀螺仪、加速度计）先测出姿态偏差，计算机立刻算出该往哪个方向、用多大力矫正，再驱动发动机摆动矢量喷管把力"作动"出去。这个循环每秒执行几百次，人类的反应速度根本跟不上——这正是又高又细的火箭能像顶着扫帚立在指尖上一样稳住的原因。',en:'Guidance, Navigation and Control (GNC) is a loop that never stops spinning: the sensors (gyroscopes, accelerometers) first measure the attitude error, the computer instantly works out which way and how hard to correct, then drives the engine to gimbal its vectoring nozzle and "actuate" that force. This loop runs hundreds of times per second — far faster than human reaction time — which is exactly why a tall, slender rocket can stay balanced like a broom held upright on a fingertip.'}},xc=Object.freeze(Object.defineProperty({__proto__:null,level:pu,milestone:mu},Symbol.toStringTag,{value:"Module"})),qs=[{key:"gridfins",label:{zh:"展开栅格舵",en:"Deploy grid fins"}},{key:"landing",label:{zh:"着陆点火",en:"Landing burn"}},{key:"boostback",label:{zh:"回推点火",en:"Boostback burn"}},{key:"reentry",label:{zh:"再入点火",en:"Reentry burn"}}],Sa=["boostback","gridfins","reentry","landing"],gu=(n,e)=>n.length===e.length&&n.every((t,i)=>t===e[i]),_u={id:"6.1",stage:"descent",vehicle:"booster",recovery:"full",title:{zh:"回收三次点火",en:"The three recovery burns"},interaction:"sequence",hook:{zh:"猎鹰9号一级分离后不是自由落体那么简单——它要在几分钟内精确完成三次重新点火，稍有差池就会像早期试验那样在海面上砸出一团火球。",en:"After the Falcon 9 first stage separates, it's not a simple free fall — within a few minutes it must precisely perform three re-ignitions, and the slightest error would leave it smashing into the sea in a fireball, just like the early test flights."},steps:qs,compute:n=>({correct:gu(n.order||[],Sa),done:(n.order||[]).length===Sa.length}),goal:{text:{zh:"把一级回收的动作按正确时序排好",en:"Arrange the first-stage recovery actions in the correct order"},check:n=>n.correct},formulaHUD:(n,e,t)=>t==="en"?e.correct?"Sequence correct! Three burns, a steady touchdown.":`${(n.order||[]).length}/${qs.length} steps arranged`:e.correct?"时序正确！三次点火，稳稳落地。":`已排 ${(n.order||[]).length}/${qs.length} 步`,milestoneId:"triple-burn-landing",diagram:{title:{zh:'栅格舵 · 再入时的"操舵格栅"',en:"Grid Fin · the steering lattice at reentry"},model3d:"gridfin",legend:{zh:"<b>栅格舵</b>是像华夫饼一样的<b>镂空格栅</b>——面积大、折叠后又很小。上升时贴在箭体上，<b>再入前展开</b>。高速气流穿过格栅，<b>转动栅格舵</b>就能偏转气流 → 给坠落中的一级<b>操舵控姿</b>，稳稳飞回发射场。整块钛合金铸造，耐得住再入高温。",en:"A <b>grid fin</b> is a <b>waffle-like open lattice</b> — large surface area, yet folds down small. It lies flat against the body during ascent and <b>deploys before reentry</b>. High-speed air flows through the lattice, and <b>rotating the fin</b> deflects that flow → steering the falling first stage back to the launch site. Cast from solid titanium to survive reentry heat."}}},xu={id:"triple-burn-landing",title:{zh:"三次点火法：回推、再入、着陆悬停被夹",en:"The three-burn method: boostback, reentry, hover-and-catch"},fact:{zh:'一级分离后先做"回推点火"把弹道调头飞回发射场附近；再入大气前展开栅格舵稳定姿态、并用"再入点火"顶住高速气流减速防烧毁；最后用"着陆点火"精确刹车——这一下发动机被深度节流到只剩约三成推力，把推重比压到刚好 1 附近悬停，稳稳送进机械臂（筷子）夹住。固体火箭点了就关不掉、推力也调不了，永远做不到这种悬停软回收。三段点火环环相扣，缺一步都会摔。',en:`After separation the first stage does a "boostback burn" to reverse its trajectory back toward the launch site; before reentry it deploys grid fins to steady its attitude and fires a "reentry burn" to push against the high-speed airflow and avoid burning up; finally a "landing burn" brakes precisely — here the engine is throttled deep, down to about a third of thrust, holding the thrust-to-weight ratio right around 1 to hover and settle gently into the mechanical arms (the "chopsticks"). A solid rocket can't be shut off or throttled once lit, so it could never do this hovering soft catch. The three burns are tightly interlinked — miss one and it crashes.`}},vc=Object.freeze(Object.defineProperty({__proto__:null,level:_u,milestone:xu},Symbol.toStringTag,{value:"Module"})),vu={reentryAngle:{key:"reentryAngle",label:{zh:"再入角",en:"Reentry angle"},min:1,max:12,step:1,unit:"°",default:1}},yu={id:"6.2",stage:"descent",env:"space",recovery:"reentry",title:{zh:"再入走廊",en:"The Reentry Corridor"},hook:{zh:"阿波罗返回地球时,再入角只有几度的误差空间——太陡会被烧穿,太浅会像打水漂一样被大气弹回太空,再也回不来。",en:"When Apollo returned to Earth, the reentry angle had only a few degrees of margin—too steep and you burn through, too shallow and you skip off the atmosphere like a stone on water, flung back into space, never to return."},params:[vu.reentryAngle],compute:n=>({ok:n.reentryAngle>=4&&n.reentryAngle<=7,tooShallow:n.reentryAngle<4,tooSteep:n.reentryAngle>7}),goal:{text:{zh:"把再入角调进安全走廊 4°~7°",en:"Set the reentry angle inside the safe corridor of 4°–7°"},check:n=>n.ok},formulaHUD:(n,e,t)=>t==="en"?`Reentry angle ${n.reentryAngle}° → ${e.tooShallow?"Too shallow: you skip off the atmosphere and bounce away":e.tooSteep?"Too steep: overheating and overload, may burn up":"Safe: inside the reentry corridor"}`:`再入角 ${n.reentryAngle}° → ${e.tooShallow?"太浅：会被大气弹回，打水漂飞走":e.tooSteep?"太陡：过热过载，可能烧毁":"安全：落入再入走廊"}`,milestoneId:"reentry-corridor"},Mu={id:"reentry-corridor",title:{zh:"再入走廊",en:"The Reentry Corridor"},fact:{zh:"再入角必须落在一条极窄的走廊里：太陡，减速太快、热流和过载都会飙升,可能把飞船烧穿;太浅,大气密度不够,飞船会像打水漂的石头一样被弹回太空。阿波罗指令舱和龙飞船,都得精确瞄准这条走廊才能安全回家。",en:"The reentry angle must fall within an extremely narrow corridor: too steep, and deceleration is too fast—heat flux and g-loads spike, and the spacecraft can burn through; too shallow, and the atmosphere is too thin, so the craft skips back into space like a stone off water. The Apollo command module and the Dragon capsule both have to aim precisely at this corridor to make it home safely."}},yc=Object.freeze(Object.defineProperty({__proto__:null,level:yu,milestone:Mu},Symbol.toStringTag,{value:"Module"})),ba=[{key:"rtls",label:{zh:"陆地回收 RTLS",en:"Return to Launch Site (RTLS)"},default:!1,fuelCost:{zh:"高",en:"High"},shipSaved:{zh:"省一艘船",en:"Saves a droneship"},bestFor:{zh:"轻/低能量任务",en:"Light / low-energy missions"},note:{zh:'一级要掉头飞回发射场，得多留一大截燃料做"返场+减速"机动，运力损失最大。',en:'The booster has to turn around and fly back to the launch site, reserving a big chunk of fuel for the "boost-back + deceleration" maneuvers—the largest payload penalty.'}},{key:"asds",label:{zh:"海上无人船 ASDS",en:"Autonomous Droneship (ASDS)"},default:!0,fuelCost:{zh:"低",en:"Low"},shipSaved:{zh:"需要一艘无人船",en:"Needs a droneship"},bestFor:{zh:"高能量重载任务",en:"High-energy, heavy-payload missions"},note:{zh:'一级顺着原本的下降轨迹，飞到下游洋面的无人船上着陆，几乎不用额外燃料"跑回来"。',en:'The booster follows its natural descent trajectory and lands on a droneship out on the downrange ocean, using almost no extra fuel to "come back".'}},{key:"exp",label:{zh:"不回收 Expendable",en:"Expendable (no recovery)"},default:!1,fuelCost:{zh:"无",en:"None"},shipSaved:{zh:"每次都扔",en:"Thrown away each time"},bestFor:{zh:"运力拉满的任务",en:"Max-payload missions"},note:{zh:"全部燃料都用来送货，运力最大，但一级直接报废，单次成本最高。",en:"All the fuel goes into delivering payload for maximum capacity, but the booster is scrapped outright—the highest per-flight cost."}}],Su={id:"6.4",vehicle:"booster",stage:"descent",env:"sea",recovery:"sea",title:{zh:"海上还是陆地回收",en:"Recover at Sea or on Land?"},interaction:"choice",hook:{zh:"这次任务又重又远：卫星很沉，还要送到一条高能量转移轨道。一级用光了大部分燃料才把它推上去，选错回收方式，一级可能连回家的油都不够。",en:"This mission is both heavy and far: the satellite is massive and has to go to a high-energy transfer orbit. The booster burns most of its fuel just to push it up there, so pick the wrong recovery mode and the booster may not even have enough fuel to get home."},options:ba,compute:n=>{const e=ba.find(t=>t.key===n.choice);return{isBest:n.choice==="asds",chosen:e}},goal:{text:{zh:'为这次"高能量、重载荷"任务选出最合适的回收方式',en:'Choose the best recovery mode for this "high-energy, heavy-payload" mission'},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?`Extra fuel ${ae(e.chosen.fuelCost)} · Ship cost ${ae(e.chosen.shipSaved)} · Best for ${ae(e.chosen.bestFor)}`:`额外燃料 ${ae(e.chosen.fuelCost)} · 船只成本 ${ae(e.chosen.shipSaved)} · 适合 ${ae(e.chosen.bestFor)}`,milestoneId:"asds-droneship-recovery"},bu={id:"asds-droneship-recovery",title:{zh:'无人船 "Of Course I Still Love You"',en:'The Droneship "Of Course I Still Love You"'},fact:{zh:'当任务能量太高、留给一级的燃料太少时，飞回发射场（RTLS）就不划算——多出来的返场燃料会直接吃掉运力。于是 SpaceX 造了自动驾驶无人船 ASDS，让一级顺势降落在下游洋面，几乎不消耗额外燃料。这艘船的名字"Of Course I Still Love You"来自科幻作家伊恩·班克斯笔下的星际飞船名。',en:`When a mission is too energetic and too little fuel is left for the booster, flying back to the launch site (RTLS) is not worth it—the extra boost-back fuel eats directly into payload. So SpaceX built the autonomous droneship (ASDS), letting the booster land downrange on the ocean while using almost no extra fuel. The ship's name, "Of Course I Still Love You," comes from a starship in the novels of science-fiction author Iain Banks.`}},Mc=Object.freeze(Object.defineProperty({__proto__:null,level:Su,milestone:bu},Symbol.toStringTag,{value:"Module"})),Ea=[{key:"earth",label:{zh:"从地球用货船把返程燃料运过去",en:"Ship the return fuel from Earth by cargo vessel"},default:!1,note:{zh:"把整程返航的推进剂运到火星，质量成本高到无法承受——等于每次都多背一枚火箭的燃料。",en:"Hauling all the return propellant to Mars carries an unbearable mass cost—it's like carrying an extra rocket's worth of fuel every time."}},{key:"isru",label:{zh:"在火星就地制造：用大气 CO₂ + 地下水冰合成",en:"Make it on Mars: synthesize from atmospheric CO₂ + subsurface water ice"},default:!0,note:{zh:"正解（ISRU）：火星大气 96% 是 CO₂，地下有水冰。电解水得氢和氧，再用 Sabatier 反应把 CO₂ 和氢合成甲烷——燃料(CH₄)和氧化剂(O₂)都能在火星本地造出来。",en:"The right answer (ISRU): the Martian atmosphere is 96% CO₂, and there is water ice underground. Electrolyze the water for hydrogen and oxygen, then use the Sabatier reaction to combine CO₂ and hydrogen into methane—both the fuel (CH₄) and the oxidizer (O₂) can be produced locally on Mars."}},{key:"roundtrip",label:{zh:"让星舰一次带够往返双程的燃料",en:"Have Starship carry enough fuel for the full round trip at once"},default:!1,note:{zh:"带双程燃料会让起飞质量爆炸式增长，火箭方程直接判死刑——根本飞不起来。",en:"Carrying round-trip fuel makes the liftoff mass explode; the rocket equation hands down a death sentence—it simply can't get off the ground."}}],Eu={id:"8.1",stage:"ascent",vehicle:"ship",title:{zh:"在火星上造燃料（ISRU）",en:"Making Fuel on Mars (ISRU)"},interaction:"choice",hook:{zh:'星舰要去火星还要回来，可火星上没有加油站。马斯克的答案是：让飞船在火星"就地取材"，自己造出返程的甲烷和液氧——这也是当初非选甲烷不可的深层原因。',en:`Starship has to go to Mars and come back, but there are no gas stations on Mars. Musk's answer: let the ship "live off the land" on Mars and make its own return methane and liquid oxygen—this is also the deeper reason methane had to be the fuel of choice.`},options:Ea,compute:n=>{const e=Ea.find(t=>t.key===n.choice);return{isBest:n.choice==="isru",chosen:e}},goal:{text:{zh:'为"从火星返航"选出可行的推进剂来源',en:'Choose a viable propellant source for the "return from Mars"'},check:n=>n.isBest},formulaHUD:(n,e,t)=>t==="en"?e.isBest?"Make it on site: CO₂ + water → methane + LOX, refuel and return ✓":"Think again: shipping from Earth / carrying round-trip fuel are both crushed by mass":e.isBest?"就地制造：CO₂ + 水 → 甲烷 + 液氧，加注返航 ✓":"再想想：从地球运/带双程都被质量压垮",milestoneId:"mars-isru-methane",diagram:{title:{zh:"火星就地制推进剂 · Sabatier 反应",en:"In-Situ Propellant Production on Mars · Sabatier Reaction"},svg:{zh:`<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a81" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g font-size="13" fill="#e6ebf2" text-anchor="middle">
        <!-- 原料 -->
        <rect x="20" y="40" width="150" height="56" rx="8" fill="#4a3524" stroke="#d0a05b"/>
        <text x="95" y="64">火星大气</text><text x="95" y="84" font-size="12" fill="#d8b98a">96% 二氧化碳 CO₂</text>
        <rect x="20" y="230" width="150" height="56" rx="8" fill="#26405e" stroke="#5b8fd0"/>
        <text x="95" y="254">地下水冰</text><text x="95" y="274" font-size="12" fill="#a8c8ef">水 H₂O</text>
        <!-- 处理 -->
        <rect x="235" y="220" width="185" height="66" rx="8" fill="#243a30" stroke="#5bd0a0"/>
        <text x="327" y="245">电解水</text><text x="327" y="266" font-size="12" fill="#a0e0c0">2H₂O → 2H₂ + O₂</text>
        <rect x="235" y="60" width="185" height="66" rx="8" fill="#3a2f4a" stroke="#9a7bd0"/>
        <text x="327" y="85">Sabatier 反应</text><text x="327" y="106" font-size="12" fill="#c0b0e0">CO₂ + 4H₂ → CH₄ + 2H₂O</text>
        <!-- 产物 -->
        <rect x="480" y="60" width="140" height="56" rx="8" fill="#503018" stroke="#ff9a3a"/>
        <text x="550" y="84">甲烷 CH₄</text><text x="550" y="104" font-size="12" fill="#ffc48a">燃料</text>
        <rect x="480" y="220" width="140" height="56" rx="8" fill="#1c3a4a" stroke="#5aa8ff"/>
        <text x="550" y="244">液氧 O₂</text><text x="550" y="264" font-size="12" fill="#a8d8ff">氧化剂</text>
        <rect x="360" y="350" width="220" height="52" rx="8" fill="#2a2f3a" stroke="#8b939c"/>
        <text x="470" y="374">加注星舰 → 返航地球</text><text x="470" y="392" font-size="11" fill="#9fb0c4">燃料和氧化剂都在火星本地造出</text>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.7">
        <line x1="170" y1="66" x2="233" y2="86" marker-end="url(#a81)"/>        <!-- CO2 → Sabatier -->
        <line x1="170" y1="258" x2="233" y2="256" marker-end="url(#a81)"/>       <!-- 水 → 电解 -->
        <line x1="327" y1="220" x2="327" y2="130" marker-end="url(#a81)"/>       <!-- 电解产 H2 → Sabatier -->
        <line x1="420" y1="90" x2="478" y2="88" marker-end="url(#a81)"/>         <!-- Sabatier → 甲烷 -->
        <line x1="420" y1="250" x2="478" y2="248" marker-end="url(#a81)"/>       <!-- 电解 O2 → 液氧 -->
        <line x1="550" y1="116" x2="550" y2="180" stroke-dasharray="4 3"/>
        <line x1="550" y1="276" x2="550" y2="300" stroke-dasharray="4 3"/>
        <line x1="470" y1="300" x2="470" y2="348" marker-end="url(#a81)"/>
      </g>
      <text x="327" y="150" font-size="11" fill="#8fd0b0" text-anchor="middle">电解出的 H₂ 送去合成甲烷</text>
      <text x="20" y="420" font-size="12" fill="#9fd0ff">火星大气的 CO₂ + 地下水冰 → 甲烷(燃料) + 液氧(氧化剂)，就地加注、返航</text>
    </svg>`,en:`<svg viewBox="0 0 640 430" xmlns="http://www.w3.org/2000/svg">
      <defs><marker id="a81" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="#9fd0ff"/></marker></defs>
      <g font-size="13" fill="#e6ebf2" text-anchor="middle">
        <!-- feedstock -->
        <rect x="20" y="40" width="150" height="56" rx="8" fill="#4a3524" stroke="#d0a05b"/>
        <text x="95" y="64">Mars atmosphere</text><text x="95" y="84" font-size="12" fill="#d8b98a">96% CO₂</text>
        <rect x="20" y="230" width="150" height="56" rx="8" fill="#26405e" stroke="#5b8fd0"/>
        <text x="95" y="254">Subsurface water ice</text><text x="95" y="274" font-size="12" fill="#a8c8ef">Water H₂O</text>
        <!-- processing -->
        <rect x="235" y="220" width="185" height="66" rx="8" fill="#243a30" stroke="#5bd0a0"/>
        <text x="327" y="245">Water electrolysis</text><text x="327" y="266" font-size="12" fill="#a0e0c0">2H₂O → 2H₂ + O₂</text>
        <rect x="235" y="60" width="185" height="66" rx="8" fill="#3a2f4a" stroke="#9a7bd0"/>
        <text x="327" y="85">Sabatier reaction</text><text x="327" y="106" font-size="12" fill="#c0b0e0">CO₂ + 4H₂ → CH₄ + 2H₂O</text>
        <!-- products -->
        <rect x="480" y="60" width="140" height="56" rx="8" fill="#503018" stroke="#ff9a3a"/>
        <text x="550" y="84">Methane CH₄</text><text x="550" y="104" font-size="12" fill="#ffc48a">Fuel</text>
        <rect x="480" y="220" width="140" height="56" rx="8" fill="#1c3a4a" stroke="#5aa8ff"/>
        <text x="550" y="244">LOX O₂</text><text x="550" y="264" font-size="12" fill="#a8d8ff">Oxidizer</text>
        <rect x="360" y="350" width="220" height="52" rx="8" fill="#2a2f3a" stroke="#8b939c"/>
        <text x="470" y="374">Refuel Starship → return to Earth</text><text x="470" y="392" font-size="11" fill="#9fb0c4">Fuel and oxidizer both made locally on Mars</text>
      </g>
      <g stroke="#9fd0ff" fill="none" stroke-width="1.7">
        <line x1="170" y1="66" x2="233" y2="86" marker-end="url(#a81)"/>        <!-- CO2 → Sabatier -->
        <line x1="170" y1="258" x2="233" y2="256" marker-end="url(#a81)"/>       <!-- water → electrolysis -->
        <line x1="327" y1="220" x2="327" y2="130" marker-end="url(#a81)"/>       <!-- electrolysis H2 → Sabatier -->
        <line x1="420" y1="90" x2="478" y2="88" marker-end="url(#a81)"/>         <!-- Sabatier → methane -->
        <line x1="420" y1="250" x2="478" y2="248" marker-end="url(#a81)"/>       <!-- electrolysis O2 → LOX -->
        <line x1="550" y1="116" x2="550" y2="180" stroke-dasharray="4 3"/>
        <line x1="550" y1="276" x2="550" y2="300" stroke-dasharray="4 3"/>
        <line x1="470" y1="300" x2="470" y2="348" marker-end="url(#a81)"/>
      </g>
      <text x="327" y="150" font-size="11" fill="#8fd0b0" text-anchor="middle">H₂ from electrolysis feeds methane synthesis</text>
      <text x="20" y="420" font-size="12" fill="#9fd0ff">Mars atmosphere CO₂ + subsurface water ice → methane (fuel) + LOX (oxidizer), refuel on site and return</text>
    </svg>`}}},wu={id:"mars-isru-methane",title:{zh:"火星造燃料：Sabatier 反应",en:"Making Fuel on Mars: The Sabatier Reaction"},fact:{zh:'星舰选甲烷的深层原因，是它能在火星"就地制造"（ISRU）。火星大气 96% 是二氧化碳，地下有水冰：先电解水得到氢气和氧气，再用 Sabatier 反应让二氧化碳和氢气合成甲烷（CO₂ + 4H₂ → CH₄ + 2H₂O）。于是燃料（甲烷）和氧化剂（液氧）都能在火星本地造出来，飞船加注后就能返航——这是人类能"往返"火星、而不是有去无回的关键一环。',en:'The deeper reason Starship chose methane is that it can be produced in situ on Mars (ISRU). The Martian atmosphere is 96% carbon dioxide, and there is water ice underground: first electrolyze the water to get hydrogen and oxygen, then use the Sabatier reaction to combine carbon dioxide and hydrogen into methane (CO₂ + 4H₂ → CH₄ + 2H₂O). So both the fuel (methane) and the oxidizer (liquid oxygen) can be made locally on Mars, and once the ship is refueled it can return—this is the key link that lets humans make a "round trip" to Mars rather than a one-way journey.'}},Sc=Object.freeze(Object.defineProperty({__proto__:null,level:Eu,milestone:wu},Symbol.toStringTag,{value:"Module"})),Tu={reuseCount:{key:"reuseCount",label:{zh:"复用次数",en:"Number of reuses"},min:1,max:20,step:1,unit:{zh:"次",en:"flights"},default:1}},Au={id:"8.3",stage:"ascent",title:{zh:"复用经济学",en:"The Economics of Reuse"},hook:{zh:"猎鹰9号一级造价上千万美元，但马斯克说：如果每次飞完就扔掉波音747，机票会贵成什么样？复用不是炫技，是算账。",en:"A Falcon 9 first stage costs tens of millions of dollars, but Musk asked: if you threw away a Boeing 747 after every flight, how much would a plane ticket cost? Reuse isn't showing off—it's arithmetic."},params:[Tu.reuseCount],compute:n=>({costPerFlight:6e3/n.reuseCount+300}),goal:{text:{zh:"把每次飞行的摊薄成本降到 ≤ 800 万美元",en:"Bring the amortized cost per flight down to ≤ $8 million"},check:n=>n.costPerFlight<=800},formulaHUD:(n,e,t)=>t==="en"?`Cost per flight = 6000/${n.reuseCount} + 300 = ${e.costPerFlight.toFixed(0)} ×10k USD (reused ${n.reuseCount} times)`:`每次成本 = 6000万/${n.reuseCount} + 300 = ${e.costPerFlight.toFixed(0)} 万美元（复用 ${n.reuseCount} 次）`,milestoneId:"reuse-economics"},Ru={id:"reuse-economics",title:{zh:"复用摊薄成本",en:"Amortizing Cost Through Reuse"},fact:{zh:'一枚箭体只飞一次，造价全部由这一次买单；飞十几次，造价被摊得很薄，每次只剩翻新和燃料钱。复用把每公斤入轨成本压下一个数量级——这才是让火箭像飞机一样"廉价往返"的革命。',en:'If a rocket flies only once, that single flight bears the entire build cost; fly it a dozen times and the build cost is spread thin, leaving little more than refurbishment and fuel per flight. Reuse drives the cost per kilogram to orbit down by an order of magnitude—that is the revolution that lets rockets fly "cheap round trips" like airplanes.'}},bc=Object.freeze(Object.defineProperty({__proto__:null,level:Au,milestone:Ru},Symbol.toStringTag,{value:"Module"})),Cu=Object.assign({"./levels/1-1.js":sc,"./levels/1-2.js":oc,"./levels/1-3.js":ac,"./levels/2-1.js":cc,"./levels/2-2.js":hc,"./levels/2-3.js":uc,"./levels/3-2.js":fc,"./levels/3-3.js":dc,"./levels/3-4.js":pc,"./levels/4-2.js":mc,"./levels/4-3.js":gc,"./levels/4-4.js":_c,"./levels/5-4.js":xc,"./levels/6-1.js":vc,"./levels/6-2.js":yc,"./levels/6-4.js":Mc,"./levels/8-1.js":Sc,"./levels/8-3.js":bc}),wa=["1.1","1.2","1.3","2.1","2.2","2.3","4.2","3.2","6.1","6.4","3.3","3.4","4.3","4.4","5.4","6.2","8.1","8.3"];function Ta(n){const e=wa.indexOf(n.id);return e<0?wa.length+100:e}const Pu=Object.values(Cu),Aa=Pu.map(n=>n.level).sort((n,e)=>Ta(n)-Ta(e));function Lu(n){const e={};for(const t of n.params)e[t.key]=t.default;return e}const Du=Object.assign({"./levels/1-1.js":sc,"./levels/1-2.js":oc,"./levels/1-3.js":ac,"./levels/2-1.js":cc,"./levels/2-2.js":hc,"./levels/2-3.js":uc,"./levels/3-2.js":fc,"./levels/3-3.js":dc,"./levels/3-4.js":pc,"./levels/4-2.js":mc,"./levels/4-3.js":gc,"./levels/4-4.js":_c,"./levels/5-4.js":xc,"./levels/6-1.js":vc,"./levels/6-2.js":yc,"./levels/6-4.js":Mc,"./levels/8-1.js":Sc,"./levels/8-3.js":bc}),Uu=Object.fromEntries(Object.values(Du).filter(n=>n.milestone).map(n=>[n.milestone.id,{title:n.milestone.title,fact:n.milestone.fact}]));function Ra(n,e){const t=n.compute(e),i=n.goal.check(t);return{derived:t,goalMet:i}}function Iu(n){const e={};function t(l){return n.indexOf(l)}function i(l){const c=t(l);return c===0?!0:c<0?!1:(e[n[c-1]]||0)>0}function r(l,c){c<1||c>3||(e[l]=Math.max(e[l]||0,c))}function s(l){return e[l]||0}function a(){for(const l of n)if(i(l)&&s(l)===0)return l;return null}function o(l){const c=t(l);return c>0?n[c-1]:null}return{isUnlocked:i,complete:r,getStars:s,nextLockedUnlockedId:a,prevId:o}}function Nu(n,e,t,i){const r={...t},s={};for(const a of e){const o=document.createElement("div");o.className="slider-row";const l=document.createElement("label");l.textContent=ae(a.label),o.appendChild(l);const c=document.createElement("input");c.type="range",c.min=String(a.min),c.max=String(a.max),c.step=String(a.step),c.value=String(r[a.key]);const h=document.createElement("span");h.className="slider-readout";const u=()=>{h.textContent=`${r[a.key]} ${ae(a.unit)}`.trim()};u(),s[a.key]=u,c.addEventListener("input",()=>{r[a.key]=Number(c.value),s[a.key](),i({...r})}),o.appendChild(c),o.appendChild(h),n.appendChild(o)}return{getValues:()=>({...r}),destroy:()=>{n.innerHTML=""}}}function zu(n,e,t,i){let r=t;const s={};function a(){for(const o of Object.keys(s))s[o].classList.toggle("selected",o===r)}for(const o of e){const l=document.createElement("button");l.type="button",l.className="choice-option",l.textContent=ae(o.label),l.addEventListener("click",()=>{r=o.key,a(),i(r)}),s[o.key]=l,n.appendChild(l)}return a(),{getValue:()=>r,destroy:()=>{n.innerHTML=""}}}function Ou(n,e,t){let i=[];const r={},s=document.createElement("div");s.className="seq-steps",n.appendChild(s);const a=document.createElement("div");a.className="seq-ordered",n.appendChild(a);function o(){a.textContent=i.map(c=>{var h;return ae((h=e.find(u=>u.key===c))==null?void 0:h.label)??c}).join(" → ")}for(const c of e){const h=document.createElement("button");h.type="button",h.className="seq-step",h.textContent=ae(c.label),h.addEventListener("click",()=>{h.classList.contains("used")||(h.classList.add("used"),i=[...i,c.key],o(),t(i))}),r[c.key]=h,s.appendChild(h)}const l=document.createElement("button");return l.type="button",l.className="seq-reset",l.textContent=ae({zh:"↺ 重置",en:"↺ Reset"}),l.addEventListener("click",()=>{i=[];for(const c of Object.keys(r))r[c].classList.remove("used");o(),t(i)}),n.appendChild(l),{getOrder:()=>[...i],destroy:()=>{n.innerHTML=""}}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vo="160",Fu=0,Ca=1,ku=2,Ec=1,Bu=2,Hn=3,ni=0,jt=1,Yt=2,Qn=0,er=1,pn=2,Pa=3,La=4,Hu=5,fi=100,Gu=101,Vu=102,Da=103,Ua=104,Wu=200,Xu=201,qu=202,$u=203,Co=204,Po=205,Yu=206,ju=207,Zu=208,Ju=209,Ku=210,Qu=211,ef=212,tf=213,nf=214,rf=0,sf=1,of=2,Ms=3,af=4,lf=5,cf=6,hf=7,wc=0,uf=1,ff=2,ei=0,df=1,pf=2,mf=3,Tc=4,gf=5,_f=6,Ac=300,ir=301,rr=302,Cr=303,Lo=304,Ps=306,Pr=1e3,bn=1001,Do=1002,Qt=1003,Ia=1004,$s=1005,mn=1006,xf=1007,Lr=1008,ti=1009,vf=1010,yf=1011,Wo=1012,Rc=1013,Jn=1014,Kn=1015,Dr=1016,Cc=1017,Pc=1018,gi=1020,Mf=1021,En=1023,Sf=1024,bf=1025,_i=1026,sr=1027,Ef=1028,Lc=1029,wf=1030,Dc=1031,Uc=1033,Ys=33776,js=33777,Zs=33778,Js=33779,Na=35840,za=35841,Oa=35842,Fa=35843,Ic=36196,ka=37492,Ba=37496,Ha=37808,Ga=37809,Va=37810,Wa=37811,Xa=37812,qa=37813,$a=37814,Ya=37815,ja=37816,Za=37817,Ja=37818,Ka=37819,Qa=37820,el=37821,Ks=36492,tl=36494,nl=36495,Tf=36283,il=36284,rl=36285,sl=36286,Nc=3e3,xi=3001,Af=3200,Rf=3201,zc=0,Cf=1,_n="",ht="srgb",Wn="srgb-linear",Xo="display-p3",Ls="display-p3-linear",Ss="linear",vt="srgb",bs="rec709",Es="p3",Li=7680,ol=519,Pf=512,Lf=513,Df=514,Oc=515,Uf=516,If=517,Nf=518,zf=519,Uo=35044,al="300 es",Io=1035,Gn=2e3,ws=2001;class ar{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ll=1234567;const Sr=Math.PI/180,Ur=180/Math.PI;function Un(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Wt[n&255]+Wt[n>>8&255]+Wt[n>>16&255]+Wt[n>>24&255]+"-"+Wt[e&255]+Wt[e>>8&255]+"-"+Wt[e>>16&15|64]+Wt[e>>24&255]+"-"+Wt[t&63|128]+Wt[t>>8&255]+"-"+Wt[t>>16&255]+Wt[t>>24&255]+Wt[i&255]+Wt[i>>8&255]+Wt[i>>16&255]+Wt[i>>24&255]).toLowerCase()}function Ft(n,e,t){return Math.max(e,Math.min(t,n))}function qo(n,e){return(n%e+e)%e}function Of(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Ff(n,e,t){return n!==e?(t-n)/(e-n):0}function br(n,e,t){return(1-t)*n+t*e}function kf(n,e,t,i){return br(n,e,1-Math.exp(-t*i))}function Bf(n,e=1){return e-Math.abs(qo(n,e*2)-e)}function Hf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Gf(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Vf(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Wf(n,e){return n+Math.random()*(e-n)}function Xf(n){return n*(.5-Math.random())}function qf(n){n!==void 0&&(ll=n);let e=ll+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function $f(n){return n*Sr}function Yf(n){return n*Ur}function No(n){return(n&n-1)===0&&n!==0}function jf(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Ts(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Zf(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+i)/2),h=a((e+i)/2),u=s((e-i)/2),d=a((e-i)/2),p=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ft(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Jf={DEG2RAD:Sr,RAD2DEG:Ur,generateUUID:Un,clamp:Ft,euclideanModulo:qo,mapLinear:Of,inverseLerp:Ff,lerp:br,damp:kf,pingpong:Bf,smoothstep:Hf,smootherstep:Gf,randInt:Vf,randFloat:Wf,randFloatSpread:Xf,seededRandom:qf,degToRad:$f,radToDeg:Yf,isPowerOfTwo:No,ceilPowerOfTwo:jf,floorPowerOfTwo:Ts,setQuaternionFromProperEuler:Zf,normalize:ft,denormalize:Dn};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class tt{constructor(e,t,i,r,s,a,o,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c)}set(e,t,i,r,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],_=r[0],m=r[3],f=r[6],w=r[1],x=r[4],M=r[7],D=r[2],T=r[5],A=r[8];return s[0]=a*_+o*w+l*D,s[3]=a*m+o*x+l*T,s[6]=a*f+o*M+l*A,s[1]=c*_+h*w+u*D,s[4]=c*m+h*x+u*T,s[7]=c*f+h*M+u*A,s[2]=d*_+p*w+g*D,s[5]=d*m+p*x+g*T,s[8]=d*f+p*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-i*s*h+i*o*l+r*s*c-r*a*l}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,p=c*s-a*l,g=t*u+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(r*c-h*i)*_,e[2]=(o*i-r*a)*_,e[3]=d*_,e[4]=(h*t-r*l)*_,e[5]=(r*s-o*t)*_,e[6]=p*_,e[7]=(i*l-c*t)*_,e[8]=(a*t-i*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-r*c,r*l,-r*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Qs.makeScale(e,t)),this}rotate(e){return this.premultiply(Qs.makeRotation(-e)),this}translate(e,t){return this.premultiply(Qs.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Qs=new tt;function Fc(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function As(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Kf(){const n=As("canvas");return n.style.display="block",n}const cl={};function Er(n){n in cl||(cl[n]=!0,console.warn(n))}const hl=new tt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ul=new tt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qr={[Wn]:{transfer:Ss,primaries:bs,toReference:n=>n,fromReference:n=>n},[ht]:{transfer:vt,primaries:bs,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ls]:{transfer:Ss,primaries:Es,toReference:n=>n.applyMatrix3(ul),fromReference:n=>n.applyMatrix3(hl)},[Xo]:{transfer:vt,primaries:Es,toReference:n=>n.convertSRGBToLinear().applyMatrix3(ul),fromReference:n=>n.applyMatrix3(hl).convertLinearToSRGB()}},Qf=new Set([Wn,Ls]),dt={enabled:!0,_workingColorSpace:Wn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Qf.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,e,t){if(this.enabled===!1||e===t||!e||!t)return n;const i=qr[e].toReference,r=qr[t].fromReference;return r(i(n))},fromWorkingColorSpace:function(n,e){return this.convert(n,this._workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this._workingColorSpace)},getPrimaries:function(n){return qr[n].primaries},getTransfer:function(n){return n===_n?Ss:qr[n].transfer}};function tr(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function eo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Di;class kc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Di===void 0&&(Di=As("canvas")),Di.width=e.width,Di.height=e.height;const i=Di.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Di}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=tr(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(tr(t[i]/255)*255):t[i]=tr(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let ed=0;class Bc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Un(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(to(r[a].image)):s.push(to(r[a]))}else s=to(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function to(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?kc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let td=0;class nn extends ar{constructor(e=nn.DEFAULT_IMAGE,t=nn.DEFAULT_MAPPING,i=bn,r=bn,s=mn,a=Lr,o=En,l=ti,c=nn.DEFAULT_ANISOTROPY,h=_n){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:td++}),this.uuid=Un(),this.name="",this.source=new Bc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===xi?ht:_n),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ac)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Pr:e.x=e.x-Math.floor(e.x);break;case bn:e.x=e.x<0?0:1;break;case Do:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Pr:e.y=e.y-Math.floor(e.y);break;case bn:e.y=e.y<0?0:1;break;case Do:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ht?xi:Nc}set encoding(e){Er("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===xi?ht:_n}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Ac;nn.DEFAULT_ANISOTROPY=1;class kt{constructor(e=0,t=0,i=0,r=1){kt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],_=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(p+1)/2,D=(f+1)/2,T=(h+d)/4,A=(u+_)/4,j=(g+m)/4;return x>M&&x>D?x<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(x),r=T/i,s=A/i):M>D?M<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(M),i=T/r,s=j/r):D<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),i=A/s,r=j/s),this.set(i,r,s,t),this}let w=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(m-g)/w,this.y=(u-_)/w,this.z=(d-h)/w,this.w=Math.acos((c+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nd extends ar{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new kt(0,0,e,t),this.scissorTest=!1,this.viewport=new kt(0,0,e,t);const r={width:e,height:t,depth:1};i.encoding!==void 0&&(Er("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===xi?ht:_n),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new nn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(e,t,i=1){(this.width!==e||this.height!==t||this.depth!==i)&&(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Bc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vi extends nd{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Hc extends nn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class id extends nn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Or{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3];const d=s[a+0],p=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==p||h!==g){let m=1-o;const f=l*d+c*p+h*g+u*_,w=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const D=Math.sqrt(x),T=Math.atan2(D,f*w);m=Math.sin(m*T)/D,o=Math.sin(o*T)/D}const M=o*w;if(l=l*m+d*M,c=c*m+p*M,h=h*m+g*M,u=u*m+_*M,m===1-o){const D=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=D,c*=D,h*=D,u*=D}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[a],d=s[a+1],p=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-o*p,e[t+2]=c*g+h*p+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(r/2),u=o(s/2),d=l(i/2),p=l(r/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-r)*p}else if(i>o&&i>u){const p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(r+a)/p,this._z=(s+c)/p}else if(o>u){const p=2*Math.sqrt(1+o-i-u);this._w=(s-c)/p,this._x=(r+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+u-i-o);this._w=(a-r)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+a*o+r*c-s*l,this._y=r*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-r*o,this._w=a*h-i*o-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*i+t*this._x,this._y=p*r+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=Math.random(),t=Math.sqrt(1-e),i=Math.sqrt(e),r=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(r),i*Math.sin(s),i*Math.cos(s),t*Math.sin(r))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*r-o*i),h=2*(o*t-s*r),u=2*(s*i-a*t);return this.x=t+l*c+a*u-o*h,this.y=i+l*h+o*c-s*u,this.z=r+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=r*l-s*o,this.y=s*a-i*l,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return no.copy(this).projectOnVector(e),this.sub(no)}reflect(e){return this.sub(no.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,i=Math.sqrt(1-e**2);return this.x=i*Math.cos(t),this.y=i*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const no=new U,fl=new Or;class Fr{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yn):yn.fromBufferAttribute(s,a),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$r.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$r.copy(i.boundingBox)),$r.applyMatrix4(e.matrixWorld),this.union($r)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(pr),Yr.subVectors(this.max,pr),Ui.subVectors(e.a,pr),Ii.subVectors(e.b,pr),Ni.subVectors(e.c,pr),qn.subVectors(Ii,Ui),$n.subVectors(Ni,Ii),oi.subVectors(Ui,Ni);let t=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-oi.z,oi.y,qn.z,0,-qn.x,$n.z,0,-$n.x,oi.z,0,-oi.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-oi.y,oi.x,0];return!io(t,Ui,Ii,Ni,Yr)||(t=[1,0,0,0,1,0,0,0,1],!io(t,Ui,Ii,Ni,Yr))?!1:(jr.crossVectors(qn,$n),t=[jr.x,jr.y,jr.z],io(t,Ui,Ii,Ni,Yr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const zn=[new U,new U,new U,new U,new U,new U,new U,new U],yn=new U,$r=new Fr,Ui=new U,Ii=new U,Ni=new U,qn=new U,$n=new U,oi=new U,pr=new U,Yr=new U,jr=new U,ai=new U;function io(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){ai.fromArray(n,s);const o=r.x*Math.abs(ai.x)+r.y*Math.abs(ai.y)+r.z*Math.abs(ai.z),l=e.dot(ai),c=t.dot(ai),h=i.dot(ai);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const rd=new Fr,mr=new U,ro=new U;class $o{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):rd.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;mr.subVectors(e,this.center);const t=mr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(mr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ro.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(mr.copy(e.center).add(ro)),this.expandByPoint(mr.copy(e.center).sub(ro))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const On=new U,so=new U,Zr=new U,Yn=new U,oo=new U,Jr=new U,ao=new U;class Gc{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,On)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=On.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(On.copy(this.origin).addScaledVector(this.direction,t),On.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){so.copy(e).add(t).multiplyScalar(.5),Zr.copy(t).sub(e).normalize(),Yn.copy(this.origin).sub(so);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Zr),o=Yn.dot(this.direction),l=-Yn.dot(Zr),c=Yn.lengthSq(),h=Math.abs(1-a*a);let u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(so).addScaledVector(Zr,d),p}intersectSphere(e,t){On.subVectors(e.center,this.origin);const i=On.dot(this.direction),r=On.dot(On)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||o>r)||((o>i||i!==i)&&(i=o),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,On)!==null}intersectTriangle(e,t,i,r,s){oo.subVectors(t,e),Jr.subVectors(i,e),ao.crossVectors(oo,Jr);let a=this.direction.dot(ao),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Yn.subVectors(this.origin,e);const l=o*this.direction.dot(Jr.crossVectors(Yn,Jr));if(l<0)return null;const c=o*this.direction.dot(oo.cross(Yn));if(c<0||l+c>a)return null;const h=-o*Yn.dot(ao);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Rt{constructor(e,t,i,r,s,a,o,l,c,h,u,d,p,g,_,m){Rt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,l,c,h,u,d,p,g,_,m)}set(e,t,i,r,s,a,o,l,c,h,u,d,p,g,_,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=_,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Rt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/zi.setFromMatrixColumn(e,0).length(),s=1/zi.setFromMatrixColumn(e,1).length(),a=1/zi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,p=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,p=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,p=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,p=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sd,e,od)}lookAt(e,t,i){const r=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),jn.crossVectors(i,sn),jn.lengthSq()===0&&(Math.abs(i.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),jn.crossVectors(i,sn)),jn.normalize(),Kr.crossVectors(sn,jn),r[0]=jn.x,r[4]=Kr.x,r[8]=sn.x,r[1]=jn.y,r[5]=Kr.y,r[9]=sn.y,r[2]=jn.z,r[6]=Kr.z,r[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],_=i[6],m=i[10],f=i[14],w=i[3],x=i[7],M=i[11],D=i[15],T=r[0],A=r[4],j=r[8],v=r[12],b=r[1],I=r[5],F=r[9],Q=r[13],R=r[2],z=r[6],k=r[10],Z=r[14],q=r[3],Y=r[7],ee=r[11],te=r[15];return s[0]=a*T+o*b+l*R+c*q,s[4]=a*A+o*I+l*z+c*Y,s[8]=a*j+o*F+l*k+c*ee,s[12]=a*v+o*Q+l*Z+c*te,s[1]=h*T+u*b+d*R+p*q,s[5]=h*A+u*I+d*z+p*Y,s[9]=h*j+u*F+d*k+p*ee,s[13]=h*v+u*Q+d*Z+p*te,s[2]=g*T+_*b+m*R+f*q,s[6]=g*A+_*I+m*z+f*Y,s[10]=g*j+_*F+m*k+f*ee,s[14]=g*v+_*Q+m*Z+f*te,s[3]=w*T+x*b+M*R+D*q,s[7]=w*A+x*I+M*z+D*Y,s[11]=w*j+x*F+M*k+D*ee,s[15]=w*v+x*Q+M*Z+D*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],_=e[7],m=e[11],f=e[15];return g*(+s*l*u-r*c*u-s*o*d+i*c*d+r*o*p-i*l*p)+_*(+t*l*p-t*c*d+s*a*d-r*a*p+r*c*h-s*l*h)+m*(+t*c*u-t*o*p-s*a*u+i*a*p+s*o*h-i*c*h)+f*(-r*o*h-t*l*u+t*o*d+r*a*u-i*a*d+i*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],_=e[13],m=e[14],f=e[15],w=u*m*c-_*d*c+_*l*p-o*m*p-u*l*f+o*d*f,x=g*d*c-h*m*c-g*l*p+a*m*p+h*l*f-a*d*f,M=h*_*c-g*u*c+g*o*p-a*_*p-h*o*f+a*u*f,D=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,T=t*w+i*x+r*M+s*D;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=w*A,e[1]=(_*d*s-u*m*s-_*r*p+i*m*p+u*r*f-i*d*f)*A,e[2]=(o*m*s-_*l*s+_*r*c-i*m*c-o*r*f+i*l*f)*A,e[3]=(u*l*s-o*d*s-u*r*c+i*d*c+o*r*p-i*l*p)*A,e[4]=x*A,e[5]=(h*m*s-g*d*s+g*r*p-t*m*p-h*r*f+t*d*f)*A,e[6]=(g*l*s-a*m*s-g*r*c+t*m*c+a*r*f-t*l*f)*A,e[7]=(a*d*s-h*l*s+h*r*c-t*d*c-a*r*p+t*l*p)*A,e[8]=M*A,e[9]=(g*u*s-h*_*s-g*i*p+t*_*p+h*i*f-t*u*f)*A,e[10]=(a*_*s-g*o*s+g*i*c-t*_*c-a*i*f+t*o*f)*A,e[11]=(h*o*s-a*u*s-h*i*c+t*u*c+a*i*p-t*o*p)*A,e[12]=D*A,e[13]=(h*_*r-g*u*r+g*i*d-t*_*d-h*i*m+t*u*m)*A,e[14]=(g*o*r-a*_*r-g*i*l+t*_*l+a*i*m-t*o*m)*A,e[15]=(a*u*r-h*o*r+h*i*l-t*u*l-a*i*d+t*o*d)*A,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-r*l,c*l+r*o,0,c*o+r*l,h*o+i,h*l-r*a,0,c*l-r*o,h*l+r*a,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,p=s*h,g=s*u,_=a*h,m=a*u,f=o*u,w=l*c,x=l*h,M=l*u,D=i.x,T=i.y,A=i.z;return r[0]=(1-(_+f))*D,r[1]=(p+M)*D,r[2]=(g-x)*D,r[3]=0,r[4]=(p-M)*T,r[5]=(1-(d+f))*T,r[6]=(m+w)*T,r[7]=0,r[8]=(g+x)*A,r[9]=(m-w)*A,r[10]=(1-(d+_))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=zi.set(r[0],r[1],r[2]).length();const a=zi.set(r[4],r[5],r[6]).length(),o=zi.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Mn.copy(this);const c=1/s,h=1/a,u=1/o;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=h,Mn.elements[5]*=h,Mn.elements[6]*=h,Mn.elements[8]*=u,Mn.elements[9]*=u,Mn.elements[10]*=u,t.setFromRotationMatrix(Mn),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=Gn){const l=this.elements,c=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),d=(i+r)/(i-r);let p,g;if(o===Gn)p=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===ws)p=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=Gn){const l=this.elements,c=1/(t-e),h=1/(i-r),u=1/(a-s),d=(t+e)*c,p=(i+r)*h;let g,_;if(o===Gn)g=(a+s)*u,_=-2*u;else if(o===ws)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const zi=new U,Mn=new Rt,sd=new U(0,0,0),od=new U(1,1,1),jn=new U,Kr=new U,sn=new U,dl=new Rt,pl=new Or;class Ds{constructor(e=0,t=0,i=0,r=Ds.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return dl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pl.setFromEuler(this),this.setFromQuaternion(pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ds.DEFAULT_ORDER="XYZ";class Yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ad=0;const ml=new U,Oi=new Or,Fn=new Rt,Qr=new U,gr=new U,ld=new U,cd=new Or,gl=new U(1,0,0),_l=new U(0,1,0),xl=new U(0,0,1),hd={type:"added"},ud={type:"removed"};class Bt extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ad++}),this.uuid=Un(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new U,t=new Ds,i=new Or,r=new U(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Rt},normalMatrix:{value:new tt}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(gl,e)}rotateY(e){return this.rotateOnAxis(_l,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return ml.copy(e).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gl,e)}translateY(e){return this.translateOnAxis(_l,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Qr.copy(e):Qr.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),gr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(gr,Qr,this.up):Fn.lookAt(Qr,gr,this.up),this.quaternion.setFromRotationMatrix(Fn),r&&(Fn.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(hd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ud)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,e,ld),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(gr,cd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++){const s=t[i];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++){const o=r[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];r.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Bt.DEFAULT_UP=new U(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Sn=new U,kn=new U,lo=new U,Bn=new U,Fi=new U,ki=new U,vl=new U,co=new U,ho=new U,uo=new U;let es=!1;class gn{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Sn.subVectors(e,t),r.cross(Sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Sn.subVectors(r,t),kn.subVectors(i,t),lo.subVectors(e,t);const a=Sn.dot(Sn),o=Sn.dot(kn),l=Sn.dot(lo),c=kn.dot(kn),h=kn.dot(lo),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getUV(e,t,i,r,s,a,o,l){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),this.getInterpolation(e,t,i,r,s,a,o,l)}static getInterpolation(e,t,i,r,s,a,o,l){return this.getBarycoord(e,t,i,r,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static isFrontFacing(e,t,i,r){return Sn.subVectors(i,t),kn.subVectors(e,t),Sn.cross(kn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),Sn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,i,r,s){return es===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),es=!0),gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}getInterpolation(e,t,i,r,s){return gn.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Fi.subVectors(r,i),ki.subVectors(s,i),co.subVectors(e,i);const l=Fi.dot(co),c=ki.dot(co);if(l<=0&&c<=0)return t.copy(i);ho.subVectors(e,r);const h=Fi.dot(ho),u=ki.dot(ho);if(h>=0&&u<=h)return t.copy(r);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(i).addScaledVector(Fi,a);uo.subVectors(e,s);const p=Fi.dot(uo),g=ki.dot(uo);if(g>=0&&p<=g)return t.copy(s);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(i).addScaledVector(ki,o);const m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return vl.subVectors(s,r),o=(u-h)/(u-h+(p-g)),t.copy(r).addScaledVector(vl,o);const f=1/(m+_+d);return a=_*f,o=d*f,t.copy(i).addScaledVector(Fi,a).addScaledVector(ki,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Vc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},ts={h:0,s:0,l:0};function fo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class rt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=i,dt.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=dt.workingColorSpace){if(e=qo(e,1),t=Ft(t,0,1),i=Ft(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=fo(a,s,e+1/3),this.g=fo(a,s,e),this.b=fo(a,s,e-1/3)}return dt.toWorkingColorSpace(this,r),this}setStyle(e,t=ht){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ht){const i=Vc[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=tr(e.r),this.g=tr(e.g),this.b=tr(e.b),this}copyLinearToSRGB(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ht){return dt.fromWorkingColorSpace(Xt.copy(this),e),Math.round(Ft(Xt.r*255,0,255))*65536+Math.round(Ft(Xt.g*255,0,255))*256+Math.round(Ft(Xt.b*255,0,255))}getHexString(e=ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.fromWorkingColorSpace(Xt.copy(this),t);const i=Xt.r,r=Xt.g,s=Xt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=dt.workingColorSpace){return dt.fromWorkingColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=ht){dt.fromWorkingColorSpace(Xt.copy(this),e);const t=Xt.r,i=Xt.g,r=Xt.b;return e!==ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(ts);const i=br(Zn.h,ts.h,t),r=br(Zn.s,ts.s,t),s=br(Zn.l,ts.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xt=new rt;rt.NAMES=Vc;let fd=0;class lr extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Un(),this.name="",this.type="Material",this.blending=er,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Co,this.blendDst=Po,this.blendEquation=fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==er&&(i.blending=this.blending),this.side!==ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Co&&(i.blendSrc=this.blendSrc),this.blendDst!==Po&&(i.blendDst=this.blendDst),this.blendEquation!==fi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class It extends lr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Dt=new U,ns=new he;class wn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Uo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ns.fromBufferAttribute(this,t),ns.applyMatrix3(e),this.setXY(t,ns.x,ns.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix3(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ft(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),r=ft(r,this.array),s=ft(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Uo&&(e.usage=this.usage),e}}class Wc extends wn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Xc extends wn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class gt extends wn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let dd=0;const fn=new Rt,po=new Bt,Bi=new U,on=new Fr,_r=new Fr,Ot=new U;class en extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Un(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fc(e)?Xc:Wc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new tt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=[];for(let i=0,r=e.length;i<r;i++){const s=e[i];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new gt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];on.setFromBufferAttribute(s),this.morphTargetsRelative?(Ot.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ot),Ot.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ot)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $o);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(on.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];_r.setFromBufferAttribute(o),this.morphTargetsRelative?(Ot.addVectors(on.min,_r.min),on.expandByPoint(Ot),Ot.addVectors(on.max,_r.max),on.expandByPoint(Ot)):(on.expandByPoint(_r.min),on.expandByPoint(_r.max))}on.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ot.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ot));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ot.fromBufferAttribute(o,c),l&&(Bi.fromBufferAttribute(e,c),Ot.add(Bi)),r=Math.max(r,i.distanceToSquared(Ot))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.array,r=t.position.array,s=t.normal.array,a=t.uv.array,o=r.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<o;b++)c[b]=new U,h[b]=new U;const u=new U,d=new U,p=new U,g=new he,_=new he,m=new he,f=new U,w=new U;function x(b,I,F){u.fromArray(r,b*3),d.fromArray(r,I*3),p.fromArray(r,F*3),g.fromArray(a,b*2),_.fromArray(a,I*2),m.fromArray(a,F*2),d.sub(u),p.sub(u),_.sub(g),m.sub(g);const Q=1/(_.x*m.y-m.x*_.y);isFinite(Q)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(Q),w.copy(p).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(Q),c[b].add(f),c[I].add(f),c[F].add(f),h[b].add(w),h[I].add(w),h[F].add(w))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let b=0,I=M.length;b<I;++b){const F=M[b],Q=F.start,R=F.count;for(let z=Q,k=Q+R;z<k;z+=3)x(i[z+0],i[z+1],i[z+2])}const D=new U,T=new U,A=new U,j=new U;function v(b){A.fromArray(s,b*3),j.copy(A);const I=c[b];D.copy(I),D.sub(A.multiplyScalar(A.dot(I))).normalize(),T.crossVectors(j,I);const Q=T.dot(h[b])<0?-1:1;l[b*4]=D.x,l[b*4+1]=D.y,l[b*4+2]=D.z,l[b*4+3]=Q}for(let b=0,I=M.length;b<I;++b){const F=M[b],Q=F.start,R=F.count;for(let z=Q,k=Q+R;z<k;z+=3)v(i[z+0]),v(i[z+1]),v(i[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new wn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new U,s=new U,a=new U,o=new U,l=new U,c=new U,h=new U,u=new U;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ot.fromBufferAttribute(e,t),Ot.normalize(),e.setXYZ(t,Ot.x,Ot.y,Ot.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?p=l[_]*o.data.stride+o.offset:p=l[_]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new wn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new en,i=this.index.array,r=this.attributes;for(const o in r){const l=r[o],c=e(l,i);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],p=e(d,i);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const c in r){const h=r[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const yl=new Rt,li=new Gc,is=new $o,Ml=new U,Hi=new U,Gi=new U,Vi=new U,mo=new U,rs=new U,ss=new he,os=new he,as=new he,Sl=new U,bl=new U,El=new U,ls=new U,cs=new U;class Me extends Bt{constructor(e=new en,t=new It){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){rs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(mo.fromBufferAttribute(u,e),a?rs.addScaledVector(mo,h):rs.addScaledVector(mo.sub(t),h))}t.add(rs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),is.copy(i.boundingSphere),is.applyMatrix4(s),li.copy(e.ray).recast(e.near),!(is.containsPoint(li.origin)===!1&&(li.intersectSphere(is,Ml)===null||li.origin.distanceToSquared(Ml)>(e.far-e.near)**2))&&(yl.copy(s).invert(),li.copy(e.ray).applyMatrix4(yl),!(i.boundingBox!==null&&li.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,li)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],w=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,D=x;M<D;M+=3){const T=o.getX(M),A=o.getX(M+1),j=o.getX(M+2);r=hs(this,f,e,i,c,h,u,T,A,j),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=o.getX(m),x=o.getX(m+1),M=o.getX(m+2);r=hs(this,a,e,i,c,h,u,w,x,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],f=a[m.materialIndex],w=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let M=w,D=x;M<D;M+=3){const T=M,A=M+1,j=M+2;r=hs(this,f,e,i,c,h,u,T,A,j),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,f=_;m<f;m+=3){const w=m,x=m+1,M=m+2;r=hs(this,a,e,i,c,h,u,w,x,M),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}}function pd(n,e,t,i,r,s,a,o){let l;if(e.side===jt?l=i.intersectTriangle(a,s,r,!0,o):l=i.intersectTriangle(r,s,a,e.side===ni,o),l===null)return null;cs.copy(o),cs.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(cs);return c<t.near||c>t.far?null:{distance:c,point:cs.clone(),object:n}}function hs(n,e,t,i,r,s,a,o,l,c){n.getVertexPosition(o,Hi),n.getVertexPosition(l,Gi),n.getVertexPosition(c,Vi);const h=pd(n,e,t,i,Hi,Gi,Vi,ls);if(h){r&&(ss.fromBufferAttribute(r,o),os.fromBufferAttribute(r,l),as.fromBufferAttribute(r,c),h.uv=gn.getInterpolation(ls,Hi,Gi,Vi,ss,os,as,new he)),s&&(ss.fromBufferAttribute(s,o),os.fromBufferAttribute(s,l),as.fromBufferAttribute(s,c),h.uv1=gn.getInterpolation(ls,Hi,Gi,Vi,ss,os,as,new he),h.uv2=h.uv1),a&&(Sl.fromBufferAttribute(a,o),bl.fromBufferAttribute(a,l),El.fromBufferAttribute(a,c),h.normal=gn.getInterpolation(ls,Hi,Gi,Vi,Sl,bl,El,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new U,materialIndex:0};gn.getNormal(Hi,Gi,Vi,u.normal),h.face=u}return h}class $t extends en{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,p=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(u,2));function g(_,m,f,w,x,M,D,T,A,j,v){const b=M/A,I=D/j,F=M/2,Q=D/2,R=T/2,z=A+1,k=j+1;let Z=0,q=0;const Y=new U;for(let ee=0;ee<k;ee++){const te=ee*I-Q;for(let le=0;le<z;le++){const W=le*b-F;Y[_]=W*w,Y[m]=te*x,Y[f]=R,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[m]=0,Y[f]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(le/A),u.push(1-ee/j),Z+=1}}for(let ee=0;ee<j;ee++)for(let te=0;te<A;te++){const le=d+te+z*ee,W=d+te+z*(ee+1),ne=d+(te+1)+z*(ee+1),xe=d+(te+1)+z*ee;l.push(le,W,xe),l.push(W,ne,xe),q+=6}o.addGroup(p,q,v),p+=q,d+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $t(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function or(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Kt(n){const e={};for(let t=0;t<n.length;t++){const i=or(n[t]);for(const r in i)e[r]=i[r]}return e}function md(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function qc(n){return n.getRenderTarget()===null?n.outputColorSpace:dt.workingColorSpace}const gd={clone:or,merge:Kt};var _d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yi extends lr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=_d,this.fragmentShader=xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class $c extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Gn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class an extends $c{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*r/l,t-=a.offsetY*i/c,r*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Wi=-90,Xi=1;class vd extends Bt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Wi,Xi,e,t);r.layers=this.layers,this.add(r);const s=new an(Wi,Xi,e,t);s.layers=this.layers,this.add(s);const a=new an(Wi,Xi,e,t);a.layers=this.layers,this.add(a);const o=new an(Wi,Xi,e,t);o.layers=this.layers,this.add(o);const l=new an(Wi,Xi,e,t);l.layers=this.layers,this.add(l);const c=new an(Wi,Xi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===Gn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ws)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=_,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Yc extends nn{constructor(e,t,i,r,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:ir,super(e,t,i,r,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yd extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];t.encoding!==void 0&&(Er("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===xi?ht:_n),this.texture=new Yc(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:mn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new $t(5,5,5),s=new yi({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:jt,blending:Qn});s.uniforms.tEquirect.value=t;const a=new Me(r,s),o=t.minFilter;return t.minFilter===Lr&&(t.minFilter=mn),new vd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const go=new U,Md=new U,Sd=new tt;class hi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=go.subVectors(i,t).cross(Md.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(go),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Sd.getNormalMatrix(e),r=this.coplanarPoint(go).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new $o,us=new U;class jo{constructor(e=new hi,t=new hi,i=new hi,r=new hi,s=new hi,a=new hi){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Gn){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],l=r[3],c=r[4],h=r[5],u=r[6],d=r[7],p=r[8],g=r[9],_=r[10],m=r[11],f=r[12],w=r[13],x=r[14],M=r[15];if(i[0].setComponents(l-s,d-c,m-p,M-f).normalize(),i[1].setComponents(l+s,d+c,m+p,M+f).normalize(),i[2].setComponents(l+a,d+h,m+g,M+w).normalize(),i[3].setComponents(l-a,d-h,m-g,M-w).normalize(),i[4].setComponents(l-o,d-u,m-_,M-x).normalize(),t===Gn)i[5].setComponents(l+o,d+u,m+_,M+x).normalize();else if(t===ws)i[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(e){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(us.x=r.normal.x>0?e.max.x:e.min.x,us.y=r.normal.y>0?e.max.y:e.min.y,us.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(us)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function jc(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function bd(n,e){const t=e.isWebGL2,i=new WeakMap;function r(c,h){const u=c.array,d=c.usage,p=u.byteLength,g=n.createBuffer();n.bindBuffer(h,g),n.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=n.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=n.SHORT;else if(u instanceof Uint32Array)_=n.UNSIGNED_INT;else if(u instanceof Int32Array)_=n.INT;else if(u instanceof Int8Array)_=n.BYTE;else if(u instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:p}}function s(c,h,u){const d=h.array,p=h._updateRange,g=h.updateRanges;if(n.bindBuffer(u,c),p.count===-1&&g.length===0&&n.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const f=g[_];t?n.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):n.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(t?n.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=i.get(c);h&&(n.deleteBuffer(h.buffer),i.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=i.get(c);(!d||d.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=i.get(c);if(u===void 0)i.set(c,r(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class pi extends en{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),l=Math.floor(r),c=o+1,h=l+1,u=e/o,d=t/l,p=[],g=[],_=[],m=[];for(let f=0;f<h;f++){const w=f*d-a;for(let x=0;x<c;x++){const M=x*u-s;g.push(M,-w,0),_.push(0,0,1),m.push(x/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let w=0;w<o;w++){const x=w+c*f,M=w+c*(f+1),D=w+1+c*(f+1),T=w+1+c*f;p.push(x,M,T),p.push(M,D,T)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pi(e.width,e.height,e.widthSegments,e.heightSegments)}}var Ed=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Td=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ad=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Rd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Cd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Dd=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ud=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Od=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Fd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Xd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$d=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Kd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",tp=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ip=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ap=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,up=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,dp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,pp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,mp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,gp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,_p=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,xp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,yp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Mp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Sp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ep=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ap=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Rp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Pp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Lp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Dp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Up=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Np=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Op=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,kp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Hp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Xp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,$p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,jp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Zp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Jp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Kp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Qp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,im=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,om=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,lm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,pm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,mm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,gm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_m=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,xm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Em=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Am=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Pm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Lm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Dm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Um=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zm=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Fm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,km=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hm=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Wm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$m=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ym=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Km=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,t0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,n0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qe={alphahash_fragment:Ed,alphahash_pars_fragment:wd,alphamap_fragment:Td,alphamap_pars_fragment:Ad,alphatest_fragment:Rd,alphatest_pars_fragment:Cd,aomap_fragment:Pd,aomap_pars_fragment:Ld,batching_pars_vertex:Dd,batching_vertex:Ud,begin_vertex:Id,beginnormal_vertex:Nd,bsdfs:zd,iridescence_fragment:Od,bumpmap_pars_fragment:Fd,clipping_planes_fragment:kd,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:Hd,clipping_planes_vertex:Gd,color_fragment:Vd,color_pars_fragment:Wd,color_pars_vertex:Xd,color_vertex:qd,common:$d,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Zd,displacementmap_vertex:Jd,emissivemap_fragment:Kd,emissivemap_pars_fragment:Qd,colorspace_fragment:ep,colorspace_pars_fragment:tp,envmap_fragment:np,envmap_common_pars_fragment:ip,envmap_pars_fragment:rp,envmap_pars_vertex:sp,envmap_physical_pars_fragment:_p,envmap_vertex:op,fog_vertex:ap,fog_pars_vertex:lp,fog_fragment:cp,fog_pars_fragment:hp,gradientmap_pars_fragment:up,lightmap_fragment:fp,lightmap_pars_fragment:dp,lights_lambert_fragment:pp,lights_lambert_pars_fragment:mp,lights_pars_begin:gp,lights_toon_fragment:xp,lights_toon_pars_fragment:vp,lights_phong_fragment:yp,lights_phong_pars_fragment:Mp,lights_physical_fragment:Sp,lights_physical_pars_fragment:bp,lights_fragment_begin:Ep,lights_fragment_maps:wp,lights_fragment_end:Tp,logdepthbuf_fragment:Ap,logdepthbuf_pars_fragment:Rp,logdepthbuf_pars_vertex:Cp,logdepthbuf_vertex:Pp,map_fragment:Lp,map_pars_fragment:Dp,map_particle_fragment:Up,map_particle_pars_fragment:Ip,metalnessmap_fragment:Np,metalnessmap_pars_fragment:zp,morphcolor_vertex:Op,morphnormal_vertex:Fp,morphtarget_pars_vertex:kp,morphtarget_vertex:Bp,normal_fragment_begin:Hp,normal_fragment_maps:Gp,normal_pars_fragment:Vp,normal_pars_vertex:Wp,normal_vertex:Xp,normalmap_pars_fragment:qp,clearcoat_normal_fragment_begin:$p,clearcoat_normal_fragment_maps:Yp,clearcoat_pars_fragment:jp,iridescence_pars_fragment:Zp,opaque_fragment:Jp,packing:Kp,premultiplied_alpha_fragment:Qp,project_vertex:em,dithering_fragment:tm,dithering_pars_fragment:nm,roughnessmap_fragment:im,roughnessmap_pars_fragment:rm,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:om,shadowmap_vertex:am,shadowmask_pars_fragment:lm,skinbase_vertex:cm,skinning_pars_vertex:hm,skinning_vertex:um,skinnormal_vertex:fm,specularmap_fragment:dm,specularmap_pars_fragment:pm,tonemapping_fragment:mm,tonemapping_pars_fragment:gm,transmission_fragment:_m,transmission_pars_fragment:xm,uv_pars_fragment:vm,uv_pars_vertex:ym,uv_vertex:Mm,worldpos_vertex:Sm,background_vert:bm,background_frag:Em,backgroundCube_vert:wm,backgroundCube_frag:Tm,cube_vert:Am,cube_frag:Rm,depth_vert:Cm,depth_frag:Pm,distanceRGBA_vert:Lm,distanceRGBA_frag:Dm,equirect_vert:Um,equirect_frag:Im,linedashed_vert:Nm,linedashed_frag:zm,meshbasic_vert:Om,meshbasic_frag:Fm,meshlambert_vert:km,meshlambert_frag:Bm,meshmatcap_vert:Hm,meshmatcap_frag:Gm,meshnormal_vert:Vm,meshnormal_frag:Wm,meshphong_vert:Xm,meshphong_frag:qm,meshphysical_vert:$m,meshphysical_frag:Ym,meshtoon_vert:jm,meshtoon_frag:Zm,points_vert:Jm,points_frag:Km,shadow_vert:Qm,shadow_frag:e0,sprite_vert:t0,sprite_frag:n0},pe={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Ln={basic:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new rt(0)}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:Kt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:Kt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:Kt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new rt(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:Kt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:Kt([pe.points,pe.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:Kt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:Kt([pe.common,pe.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:Kt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:Kt([pe.sprite,pe.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distanceRGBA:{uniforms:Kt([pe.common,pe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distanceRGBA_vert,fragmentShader:Qe.distanceRGBA_frag},shadow:{uniforms:Kt([pe.lights,pe.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Ln.physical={uniforms:Kt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const fs={r:0,b:0,g:0};function i0(n,e,t,i,r,s,a){const o=new rt(0);let l=s===!0?0:1,c,h,u=null,d=0,p=null;function g(m,f){let w=!1,x=f.isScene===!0?f.background:null;x&&x.isTexture&&(x=(f.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),w=!0);const M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||w)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===Ps)?(h===void 0&&(h=new Me(new $t(1,1,1),new yi({name:"BackgroundCubeMaterial",uniforms:or(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(D,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,(u!==x||d!==x.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,p=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Me(new pi(2,2),new yi({name:"BackgroundMaterial",uniforms:or(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.toneMapped=dt.getTransfer(x.colorSpace)!==vt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,p=n.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,f){m.getRGB(fs,qc(n)),i.buffers.color.setClear(fs.r,fs.g,fs.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),l=f,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function r0(n,e,t,i){const r=n.getParameter(n.MAX_VERTEX_ATTRIBS),s=i.isWebGL2?null:e.get("OES_vertex_array_object"),a=i.isWebGL2||s!==null,o={},l=m(null);let c=l,h=!1;function u(R,z,k,Z,q){let Y=!1;if(a){const ee=_(Z,k,z);c!==ee&&(c=ee,p(c.object)),Y=f(R,Z,k,q),Y&&w(R,Z,k,q)}else{const ee=z.wireframe===!0;(c.geometry!==Z.id||c.program!==k.id||c.wireframe!==ee)&&(c.geometry=Z.id,c.program=k.id,c.wireframe=ee,Y=!0)}q!==null&&t.update(q,n.ELEMENT_ARRAY_BUFFER),(Y||h)&&(h=!1,j(R,z,k,Z),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return i.isWebGL2?n.createVertexArray():s.createVertexArrayOES()}function p(R){return i.isWebGL2?n.bindVertexArray(R):s.bindVertexArrayOES(R)}function g(R){return i.isWebGL2?n.deleteVertexArray(R):s.deleteVertexArrayOES(R)}function _(R,z,k){const Z=k.wireframe===!0;let q=o[R.id];q===void 0&&(q={},o[R.id]=q);let Y=q[z.id];Y===void 0&&(Y={},q[z.id]=Y);let ee=Y[Z];return ee===void 0&&(ee=m(d()),Y[Z]=ee),ee}function m(R){const z=[],k=[],Z=[];for(let q=0;q<r;q++)z[q]=0,k[q]=0,Z[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:k,attributeDivisors:Z,object:R,attributes:{},index:null}}function f(R,z,k,Z){const q=c.attributes,Y=z.attributes;let ee=0;const te=k.getAttributes();for(const le in te)if(te[le].location>=0){const ne=q[le];let xe=Y[le];if(xe===void 0&&(le==="instanceMatrix"&&R.instanceMatrix&&(xe=R.instanceMatrix),le==="instanceColor"&&R.instanceColor&&(xe=R.instanceColor)),ne===void 0||ne.attribute!==xe||xe&&ne.data!==xe.data)return!0;ee++}return c.attributesNum!==ee||c.index!==Z}function w(R,z,k,Z){const q={},Y=z.attributes;let ee=0;const te=k.getAttributes();for(const le in te)if(te[le].location>=0){let ne=Y[le];ne===void 0&&(le==="instanceMatrix"&&R.instanceMatrix&&(ne=R.instanceMatrix),le==="instanceColor"&&R.instanceColor&&(ne=R.instanceColor));const xe={};xe.attribute=ne,ne&&ne.data&&(xe.data=ne.data),q[le]=xe,ee++}c.attributes=q,c.attributesNum=ee,c.index=Z}function x(){const R=c.newAttributes;for(let z=0,k=R.length;z<k;z++)R[z]=0}function M(R){D(R,0)}function D(R,z){const k=c.newAttributes,Z=c.enabledAttributes,q=c.attributeDivisors;k[R]=1,Z[R]===0&&(n.enableVertexAttribArray(R),Z[R]=1),q[R]!==z&&((i.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,z),q[R]=z)}function T(){const R=c.newAttributes,z=c.enabledAttributes;for(let k=0,Z=z.length;k<Z;k++)z[k]!==R[k]&&(n.disableVertexAttribArray(k),z[k]=0)}function A(R,z,k,Z,q,Y,ee){ee===!0?n.vertexAttribIPointer(R,z,k,q,Y):n.vertexAttribPointer(R,z,k,Z,q,Y)}function j(R,z,k,Z){if(i.isWebGL2===!1&&(R.isInstancedMesh||Z.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const q=Z.attributes,Y=k.getAttributes(),ee=z.defaultAttributeValues;for(const te in Y){const le=Y[te];if(le.location>=0){let W=q[te];if(W===void 0&&(te==="instanceMatrix"&&R.instanceMatrix&&(W=R.instanceMatrix),te==="instanceColor"&&R.instanceColor&&(W=R.instanceColor)),W!==void 0){const ne=W.normalized,xe=W.itemSize,Re=t.get(W);if(Re===void 0)continue;const be=Re.buffer,ke=Re.type,$e=Re.bytesPerElement,Ce=i.isWebGL2===!0&&(ke===n.INT||ke===n.UNSIGNED_INT||W.gpuType===Rc);if(W.isInterleavedBufferAttribute){const Ve=W.data,C=Ve.stride,fe=W.offset;if(Ve.isInstancedInterleavedBuffer){for(let V=0;V<le.locationSize;V++)D(le.location+V,Ve.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let V=0;V<le.locationSize;V++)M(le.location+V);n.bindBuffer(n.ARRAY_BUFFER,be);for(let V=0;V<le.locationSize;V++)A(le.location+V,xe/le.locationSize,ke,ne,C*$e,(fe+xe/le.locationSize*V)*$e,Ce)}else{if(W.isInstancedBufferAttribute){for(let Ve=0;Ve<le.locationSize;Ve++)D(le.location+Ve,W.meshPerAttribute);R.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let Ve=0;Ve<le.locationSize;Ve++)M(le.location+Ve);n.bindBuffer(n.ARRAY_BUFFER,be);for(let Ve=0;Ve<le.locationSize;Ve++)A(le.location+Ve,xe/le.locationSize,ke,ne,xe*$e,xe/le.locationSize*Ve*$e,Ce)}}else if(ee!==void 0){const ne=ee[te];if(ne!==void 0)switch(ne.length){case 2:n.vertexAttrib2fv(le.location,ne);break;case 3:n.vertexAttrib3fv(le.location,ne);break;case 4:n.vertexAttrib4fv(le.location,ne);break;default:n.vertexAttrib1fv(le.location,ne)}}}}T()}function v(){F();for(const R in o){const z=o[R];for(const k in z){const Z=z[k];for(const q in Z)g(Z[q].object),delete Z[q];delete z[k]}delete o[R]}}function b(R){if(o[R.id]===void 0)return;const z=o[R.id];for(const k in z){const Z=z[k];for(const q in Z)g(Z[q].object),delete Z[q];delete z[k]}delete o[R.id]}function I(R){for(const z in o){const k=o[z];if(k[R.id]===void 0)continue;const Z=k[R.id];for(const q in Z)g(Z[q].object),delete Z[q];delete k[R.id]}}function F(){Q(),h=!0,c!==l&&(c=l,p(c.object))}function Q(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:F,resetDefaultState:Q,dispose:v,releaseStatesOfGeometry:b,releaseStatesOfProgram:I,initAttributes:x,enableAttribute:M,disableUnusedAttributes:T}}function s0(n,e,t,i){const r=i.isWebGL2;let s;function a(h){s=h}function o(h,u){n.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let p,g;if(r)p=n,g="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{p.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function o0(n,e,t){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function s(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),w=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,M=a||e.has("OES_texture_float"),D=x&&M,T=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:r,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:w,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:D,maxSamples:T}}function a0(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new hi,o=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||r;return r=d,i=u.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{const w=s?0:i,x=w*4;let M=f.clippingState||null;l.value=M,M=h(g,d,x,p);for(let D=0;D!==x;++D)M[D]=t[D];f.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,p,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const f=p+_*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(m===null||m.length<f)&&(m=new Float32Array(f));for(let x=0,M=p;x!==_;++x,M+=4)a.copy(u[x]).applyMatrix4(w,o),a.normal.toArray(m,M),m[M+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function l0(n){let e=new WeakMap;function t(a,o){return o===Cr?a.mapping=ir:o===Lo&&(a.mapping=rr),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Cr||o===Lo)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new yd(l.height/2);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",r),t(c.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Zc extends $c{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ji=4,wl=[.125,.215,.35,.446,.526,.582],di=20,_o=new Zc,Tl=new rt;let xo=null,vo=0,yo=0;const ui=(1+Math.sqrt(5))/2,qi=1/ui,Al=[new U(1,1,1),new U(-1,1,1),new U(1,1,-1),new U(-1,1,-1),new U(0,ui,qi),new U(0,ui,-qi),new U(qi,0,ui),new U(-qi,0,ui),new U(ui,qi,0),new U(-ui,qi,0)];class zo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){xo=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xo,vo,yo),e.scissorTest=!1,ds(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ir||e.mapping===rr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xo=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),yo=this._renderer.getActiveMipmapLevel();const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:mn,minFilter:mn,generateMipmaps:!1,type:Dr,format:En,colorSpace:Wn,depthBuffer:!1},r=Rl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=c0(s)),this._blurMaterial=h0(s,e,t)}return r}_compileMaterial(e){const t=new Me(this._lodPlanes[0],e);this._renderer.compile(t,_o)}_sceneToCubeUV(e,t,i,r){const o=new an(90,1,t,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Tl),h.toneMapping=ei,h.autoClear=!1;const p=new It({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1}),g=new Me(new $t,p);let _=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,_=!0):(p.color.copy(Tl),_=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):w===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const x=this._cubeSize;ds(r,w*x,f>2?x:0,x,x),h.setRenderTarget(r),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===ir||e.mapping===rr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Cl());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Me(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;ds(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,_o)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Al[(r-1)%Al.length];this._blur(e,r-1,r,s,a)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Me(this._lodPlanes[r],c),d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*di-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):di;m>di&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${di}`);const f=[];let w=0;for(let A=0;A<di;++A){const j=A/_,v=Math.exp(-j*j/2);f.push(v),A===0?w+=v:A<m&&(w+=2*v)}for(let A=0;A<f.length;A++)f[A]=f[A]/w;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-i;const M=this._sizeLods[r],D=3*M*(r>x-Ji?r-x+Ji:0),T=4*(this._cubeSize-M);ds(t,D,T,3*M,2*M),l.setRenderTarget(t),l.render(u,_o)}}function c0(n){const e=[],t=[],i=[];let r=n;const s=n-Ji+1+wl.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let l=1/o;a>n-Ji?l=wl[a-n+Ji-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,_=3,m=2,f=1,w=new Float32Array(_*g*p),x=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,j=T>2?0:-1,v=[A,j,0,A+2/3,j,0,A+2/3,j+1,0,A,j,0,A+2/3,j+1,0,A,j+1,0];w.set(v,_*g*T),x.set(d,m*g*T);const b=[T,T,T,T,T,T];M.set(b,f*g*T)}const D=new en;D.setAttribute("position",new wn(w,_)),D.setAttribute("uv",new wn(x,m)),D.setAttribute("faceIndex",new wn(M,f)),e.push(D),r>Ji&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Rl(n,e,t){const i=new vi(n,e,t);return i.texture.mapping=Ps,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ds(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function h0(n,e,t){const i=new Float32Array(di),r=new U(0,1,0);return new yi({name:"SphericalGaussianBlur",defines:{n:di,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Cl(){return new yi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Pl(){return new yi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Zo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function u0(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Cr||l===Lo,h=l===ir||l===rr;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new zo(n)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&r(u)){t===null&&(t=new zo(n));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function r(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function f0(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(i){i.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(i){const r=t(i);return r===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function d0(n,e,t,i){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,f=_.length;m<f;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],n.ARRAY_BUFFER);const p=u.morphAttributes;for(const g in p){const _=p[g];for(let m=0,f=_.length;m<f;m++)e.update(_[m],n.ARRAY_BUFFER)}}function c(u){const d=[],p=u.index,g=u.attributes.position;let _=0;if(p!==null){const w=p.array;_=p.version;for(let x=0,M=w.length;x<M;x+=3){const D=w[x+0],T=w[x+1],A=w[x+2];d.push(D,T,T,A,A,D)}}else if(g!==void 0){const w=g.array;_=g.version;for(let x=0,M=w.length/3-1;x<M;x+=3){const D=x+0,T=x+1,A=x+2;d.push(D,T,T,A,A,D)}}else return;const m=new(Fc(d)?Xc:Wc)(d,1);m.version=_;const f=s.get(u);f&&e.remove(f),s.set(u,m)}function h(u){const d=s.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function p0(n,e,t,i){const r=i.isWebGL2;let s;function a(p){s=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,g){n.drawElements(s,g,o,p*l),t.update(g,s,1)}function u(p,g,_){if(_===0)return;let m,f;if(r)m=n,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](s,g,o,p*l,_),t.update(g,s,_)}function d(p,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<_;f++)this.render(p[f]/l,g[f]);else{m.multiDrawElementsWEBGL(s,g,0,o,p,0,_);let f=0;for(let w=0;w<_;w++)f+=g[w];t.update(f,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function m0(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function g0(n,e){return n[0]-e[0]}function _0(n,e){return Math.abs(e[1])-Math.abs(n[1])}function x0(n,e,t){const i={},r=new Float32Array(8),s=new WeakMap,a=new kt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==_){let z=function(){Q.dispose(),s.delete(h),h.removeEventListener("dispose",z)};var p=z;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,D=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],j=h.morphAttributes.color||[];let v=0;x===!0&&(v=1),M===!0&&(v=2),D===!0&&(v=3);let b=h.attributes.position.count*v,I=1;b>e.maxTextureSize&&(I=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const F=new Float32Array(b*I*4*_),Q=new Hc(F,b,I,_);Q.type=Kn,Q.needsUpdate=!0;const R=v*4;for(let k=0;k<_;k++){const Z=T[k],q=A[k],Y=j[k],ee=b*I*4*k;for(let te=0;te<Z.count;te++){const le=te*R;x===!0&&(a.fromBufferAttribute(Z,te),F[ee+le+0]=a.x,F[ee+le+1]=a.y,F[ee+le+2]=a.z,F[ee+le+3]=0),M===!0&&(a.fromBufferAttribute(q,te),F[ee+le+4]=a.x,F[ee+le+5]=a.y,F[ee+le+6]=a.z,F[ee+le+7]=0),D===!0&&(a.fromBufferAttribute(Y,te),F[ee+le+8]=a.x,F[ee+le+9]=a.y,F[ee+le+10]=a.z,F[ee+le+11]=Y.itemSize===4?a.w:1)}}m={count:_,texture:Q,size:new he(b,I)},s.set(h,m),h.addEventListener("dispose",z)}let f=0;for(let x=0;x<d.length;x++)f+=d[x];const w=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",w),u.getUniforms().setValue(n,"morphTargetInfluences",d),u.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=i[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];i[h.id]=_}for(let M=0;M<g;M++){const D=_[M];D[0]=M,D[1]=d[M]}_.sort(_0);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(g0);const m=h.morphAttributes.position,f=h.morphAttributes.normal;let w=0;for(let M=0;M<8;M++){const D=o[M],T=D[0],A=D[1];T!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+M)!==m[T]&&h.setAttribute("morphTarget"+M,m[T]),f&&h.getAttribute("morphNormal"+M)!==f[T]&&h.setAttribute("morphNormal"+M,f[T]),r[M]=A,w+=A):(m&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),f&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),r[M]=0)}const x=h.morphTargetsRelative?1:1-w;u.getUniforms().setValue(n,"morphTargetBaseInfluence",x),u.getUniforms().setValue(n,"morphTargetInfluences",r)}}return{update:l}}function v0(n,e,t,i){let r=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function a(){r=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class Jc extends nn{constructor(e,t,i,r,s,a,o,l,c,h){if(h=h!==void 0?h:_i,h!==_i&&h!==sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===_i&&(i=Jn),i===void 0&&h===sr&&(i=gi),super(null,r,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Qt,this.minFilter=l!==void 0?l:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Kc=new nn,Qc=new Jc(1,1);Qc.compareFunction=Oc;const eh=new Hc,th=new id,nh=new Yc,Ll=[],Dl=[],Ul=new Float32Array(16),Il=new Float32Array(9),Nl=new Float32Array(4);function cr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ll[r];if(s===void 0&&(s=new Float32Array(r),Ll[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Nt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function zt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Us(n,e){let t=Dl[e];t===void 0&&(t=new Int32Array(e),Dl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function y0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function M0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2fv(this.addr,e),zt(t,e)}}function S0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;n.uniform3fv(this.addr,e),zt(t,e)}}function b0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4fv(this.addr,e),zt(t,e)}}function E0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(Nt(t,i))return;Nl.set(i),n.uniformMatrix2fv(this.addr,!1,Nl),zt(t,i)}}function w0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(Nt(t,i))return;Il.set(i),n.uniformMatrix3fv(this.addr,!1,Il),zt(t,i)}}function T0(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Nt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(Nt(t,i))return;Ul.set(i),n.uniformMatrix4fv(this.addr,!1,Ul),zt(t,i)}}function A0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function R0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2iv(this.addr,e),zt(t,e)}}function C0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3iv(this.addr,e),zt(t,e)}}function P0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4iv(this.addr,e),zt(t,e)}}function L0(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function D0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;n.uniform2uiv(this.addr,e),zt(t,e)}}function U0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;n.uniform3uiv(this.addr,e),zt(t,e)}}function I0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;n.uniform4uiv(this.addr,e),zt(t,e)}}function N0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);const s=this.type===n.SAMPLER_2D_SHADOW?Qc:Kc;t.setTexture2D(e||s,r)}function z0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||th,r)}function O0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||nh,r)}function F0(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||eh,r)}function k0(n){switch(n){case 5126:return y0;case 35664:return M0;case 35665:return S0;case 35666:return b0;case 35674:return E0;case 35675:return w0;case 35676:return T0;case 5124:case 35670:return A0;case 35667:case 35671:return R0;case 35668:case 35672:return C0;case 35669:case 35673:return P0;case 5125:return L0;case 36294:return D0;case 36295:return U0;case 36296:return I0;case 35678:case 36198:case 36298:case 36306:case 35682:return N0;case 35679:case 36299:case 36307:return z0;case 35680:case 36300:case 36308:case 36293:return O0;case 36289:case 36303:case 36311:case 36292:return F0}}function B0(n,e){n.uniform1fv(this.addr,e)}function H0(n,e){const t=cr(e,this.size,2);n.uniform2fv(this.addr,t)}function G0(n,e){const t=cr(e,this.size,3);n.uniform3fv(this.addr,t)}function V0(n,e){const t=cr(e,this.size,4);n.uniform4fv(this.addr,t)}function W0(n,e){const t=cr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function X0(n,e){const t=cr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function q0(n,e){const t=cr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function $0(n,e){n.uniform1iv(this.addr,e)}function Y0(n,e){n.uniform2iv(this.addr,e)}function j0(n,e){n.uniform3iv(this.addr,e)}function Z0(n,e){n.uniform4iv(this.addr,e)}function J0(n,e){n.uniform1uiv(this.addr,e)}function K0(n,e){n.uniform2uiv(this.addr,e)}function Q0(n,e){n.uniform3uiv(this.addr,e)}function eg(n,e){n.uniform4uiv(this.addr,e)}function tg(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||Kc,s[a])}function ng(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||th,s[a])}function ig(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||nh,s[a])}function rg(n,e,t){const i=this.cache,r=e.length,s=Us(t,r);Nt(i,s)||(n.uniform1iv(this.addr,s),zt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||eh,s[a])}function sg(n){switch(n){case 5126:return B0;case 35664:return H0;case 35665:return G0;case 35666:return V0;case 35674:return W0;case 35675:return X0;case 35676:return q0;case 5124:case 35670:return $0;case 35667:case 35671:return Y0;case 35668:case 35672:return j0;case 35669:case 35673:return Z0;case 5125:return J0;case 36294:return K0;case 36295:return Q0;case 36296:return eg;case 35678:case 36198:case 36298:case 36306:case 35682:return tg;case 35679:case 36299:case 36307:return ng;case 35680:case 36300:case 36308:case 36293:return ig;case 36289:case 36303:case 36311:case 36292:return rg}}class og{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=k0(t.type)}}class ag{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=sg(t.type)}}class lg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Mo=/(\w+)(\])?(\[|\.)?/g;function zl(n,e){n.seq.push(e),n.map[e.id]=e}function cg(n,e,t){const i=n.name,r=i.length;for(Mo.lastIndex=0;;){const s=Mo.exec(i),a=Mo.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===r){zl(t,c===void 0?new og(o,n,e):new ag(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new lg(o),zl(t,u)),t=u}}}class ys{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);cg(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Ol(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const hg=37297;let ug=0;function fg(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}function dg(n){const e=dt.getPrimaries(dt.workingColorSpace),t=dt.getPrimaries(n);let i;switch(e===t?i="":e===Es&&t===bs?i="LinearDisplayP3ToLinearSRGB":e===bs&&t===Es&&(i="LinearSRGBToLinearDisplayP3"),n){case Wn:case Ls:return[i,"LinearTransferOETF"];case ht:case Xo:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Fl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+fg(n.getShaderSource(e),a)}else return r}function pg(n,e){const t=dg(e);return`vec4 ${n}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function mg(n,e){let t;switch(e){case df:t="Linear";break;case pf:t="Reinhard";break;case mf:t="OptimizedCineon";break;case Tc:t="ACESFilmic";break;case _f:t="AgX";break;case gf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function gg(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ki).join(`
`)}function _g(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ki).join(`
`)}function xg(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function vg(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ki(n){return n!==""}function kl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const yg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(n){return n.replace(yg,Sg)}const Mg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Sg(n,e){let t=Qe[e];if(t===void 0){const i=Mg.get(e);if(i!==void 0)t=Qe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Oo(t)}const bg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hl(n){return n.replace(bg,Eg)}function Eg(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Gl(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function wg(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Ec?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Bu?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Hn&&(e="SHADOWMAP_TYPE_VSM"),e}function Tg(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case ir:case rr:e="ENVMAP_TYPE_CUBE";break;case Ps:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ag(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case rr:e="ENVMAP_MODE_REFRACTION";break}return e}function Rg(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case wc:e="ENVMAP_BLENDING_MULTIPLY";break;case uf:e="ENVMAP_BLENDING_MIX";break;case ff:e="ENVMAP_BLENDING_ADD";break}return e}function Cg(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function Pg(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=wg(t),c=Tg(t),h=Ag(t),u=Rg(t),d=Cg(t),p=t.isWebGL2?"":gg(t),g=_g(t),_=xg(s),m=r.createProgram();let f,w,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),f.length>0&&(f+=`
`),w=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ki).join(`
`),w.length>0&&(w+=`
`)):(f=[Gl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ki).join(`
`),w=[p,Gl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ei?"#define TONE_MAPPING":"",t.toneMapping!==ei?Qe.tonemapping_pars_fragment:"",t.toneMapping!==ei?mg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,pg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ki).join(`
`)),a=Oo(a),a=kl(a,t),a=Bl(a,t),o=Oo(o),o=kl(o,t),o=Bl(o,t),a=Hl(a),o=Hl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,f=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,w=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+w);const M=x+f+a,D=x+w+o,T=Ol(r,r.VERTEX_SHADER,M),A=Ol(r,r.FRAGMENT_SHADER,D);r.attachShader(m,T),r.attachShader(m,A),t.index0AttributeName!==void 0?r.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(m,0,"position"),r.linkProgram(m);function j(F){if(n.debug.checkShaderErrors){const Q=r.getProgramInfoLog(m).trim(),R=r.getShaderInfoLog(T).trim(),z=r.getShaderInfoLog(A).trim();let k=!0,Z=!0;if(r.getProgramParameter(m,r.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,m,T,A);else{const q=Fl(r,T,"vertex"),Y=Fl(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(m,r.VALIDATE_STATUS)+`

Program Info Log: `+Q+`
`+q+`
`+Y)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(R===""||z==="")&&(Z=!1);Z&&(F.diagnostics={runnable:k,programLog:Q,vertexShader:{log:R,prefix:f},fragmentShader:{log:z,prefix:w}})}r.deleteShader(T),r.deleteShader(A),v=new ys(r,m),b=vg(r,m)}let v;this.getUniforms=function(){return v===void 0&&j(this),v};let b;this.getAttributes=function(){return b===void 0&&j(this),b};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=r.getProgramParameter(m,hg)),I},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ug++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=A,this}let Lg=0;class Dg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ug(e),t.set(e,i)),i}}class Ug{constructor(e){this.id=Lg++,this.code=e,this.usedTimes=0}}function Ig(n,e,t,i,r,s,a){const o=new Yo,l=new Dg,c=[],h=r.isWebGL2,u=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return v===0?"uv":`uv${v}`}function m(v,b,I,F,Q){const R=F.fog,z=Q.geometry,k=v.isMeshStandardMaterial?F.environment:null,Z=(v.isMeshStandardMaterial?t:e).get(v.envMap||k),q=Z&&Z.mapping===Ps?Z.image.height:null,Y=g[v.type];v.precision!==null&&(p=r.getMaxPrecision(v.precision),p!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",p,"instead."));const ee=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=ee!==void 0?ee.length:0;let le=0;z.morphAttributes.position!==void 0&&(le=1),z.morphAttributes.normal!==void 0&&(le=2),z.morphAttributes.color!==void 0&&(le=3);let W,ne,xe,Re;if(Y){const Mt=Ln[Y];W=Mt.vertexShader,ne=Mt.fragmentShader}else W=v.vertexShader,ne=v.fragmentShader,l.update(v),xe=l.getVertexShaderID(v),Re=l.getFragmentShaderID(v);const be=n.getRenderTarget(),ke=Q.isInstancedMesh===!0,$e=Q.isBatchedMesh===!0,Ce=!!v.map,Ve=!!v.matcap,C=!!Z,fe=!!v.aoMap,V=!!v.lightMap,ce=!!v.bumpMap,J=!!v.normalMap,Le=!!v.displacementMap,ve=!!v.emissiveMap,S=!!v.metalnessMap,y=!!v.roughnessMap,O=v.anisotropy>0,oe=v.clearcoat>0,re=v.iridescence>0,ie=v.sheen>0,Te=v.transmission>0,ge=O&&!!v.anisotropyMap,Se=oe&&!!v.clearcoatMap,Ue=oe&&!!v.clearcoatNormalMap,Be=oe&&!!v.clearcoatRoughnessMap,se=re&&!!v.iridescenceMap,ot=re&&!!v.iridescenceThicknessMap,Ae=ie&&!!v.sheenColorMap,He=ie&&!!v.sheenRoughnessMap,we=!!v.specularMap,Ee=!!v.specularColorMap,Ye=!!v.specularIntensityMap,at=Te&&!!v.transmissionMap,yt=Te&&!!v.thicknessMap,Je=!!v.gradientMap,de=!!v.alphaMap,L=v.alphaTest>0,me=!!v.alphaHash,_e=!!v.extensions,Oe=!!z.attributes.uv1,Ne=!!z.attributes.uv2,ut=!!z.attributes.uv3;let lt=ei;return v.toneMapped&&(be===null||be.isXRRenderTarget===!0)&&(lt=n.toneMapping),{isWebGL2:h,shaderID:Y,shaderType:v.type,shaderName:v.name,vertexShader:W,fragmentShader:ne,defines:v.defines,customVertexShaderID:xe,customFragmentShaderID:Re,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:p,batching:$e,instancing:ke,instancingColor:ke&&Q.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:be===null?n.outputColorSpace:be.isXRRenderTarget===!0?be.texture.colorSpace:Wn,map:Ce,matcap:Ve,envMap:C,envMapMode:C&&Z.mapping,envMapCubeUVHeight:q,aoMap:fe,lightMap:V,bumpMap:ce,normalMap:J,displacementMap:d&&Le,emissiveMap:ve,normalMapObjectSpace:J&&v.normalMapType===Cf,normalMapTangentSpace:J&&v.normalMapType===zc,metalnessMap:S,roughnessMap:y,anisotropy:O,anisotropyMap:ge,clearcoat:oe,clearcoatMap:Se,clearcoatNormalMap:Ue,clearcoatRoughnessMap:Be,iridescence:re,iridescenceMap:se,iridescenceThicknessMap:ot,sheen:ie,sheenColorMap:Ae,sheenRoughnessMap:He,specularMap:we,specularColorMap:Ee,specularIntensityMap:Ye,transmission:Te,transmissionMap:at,thicknessMap:yt,gradientMap:Je,opaque:v.transparent===!1&&v.blending===er,alphaMap:de,alphaTest:L,alphaHash:me,combine:v.combine,mapUv:Ce&&_(v.map.channel),aoMapUv:fe&&_(v.aoMap.channel),lightMapUv:V&&_(v.lightMap.channel),bumpMapUv:ce&&_(v.bumpMap.channel),normalMapUv:J&&_(v.normalMap.channel),displacementMapUv:Le&&_(v.displacementMap.channel),emissiveMapUv:ve&&_(v.emissiveMap.channel),metalnessMapUv:S&&_(v.metalnessMap.channel),roughnessMapUv:y&&_(v.roughnessMap.channel),anisotropyMapUv:ge&&_(v.anisotropyMap.channel),clearcoatMapUv:Se&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:Ue&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:se&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:ot&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:He&&_(v.sheenRoughnessMap.channel),specularMapUv:we&&_(v.specularMap.channel),specularColorMapUv:Ee&&_(v.specularColorMap.channel),specularIntensityMapUv:Ye&&_(v.specularIntensityMap.channel),transmissionMapUv:at&&_(v.transmissionMap.channel),thicknessMapUv:yt&&_(v.thicknessMap.channel),alphaMapUv:de&&_(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(J||O),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:Oe,vertexUv2s:Ne,vertexUv3s:ut,pointsUvs:Q.isPoints===!0&&!!z.attributes.uv&&(Ce||de),fog:!!R,useFog:v.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Q.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:le,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:lt,useLegacyLights:n._useLegacyLights,decodeVideoTexture:Ce&&v.map.isVideoTexture===!0&&dt.getTransfer(v.map.colorSpace)===vt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Yt,flipSided:v.side===jt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:_e&&v.extensions.derivatives===!0,extensionFragDepth:_e&&v.extensions.fragDepth===!0,extensionDrawBuffers:_e&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:_e&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:_e&&v.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function f(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const I in v.defines)b.push(I),b.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(w(b,v),x(b,v),b.push(n.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function w(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),v.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),v.push(o.mask)}function M(v){const b=g[v.type];let I;if(b){const F=Ln[b];I=gd.clone(F.uniforms)}else I=v.uniforms;return I}function D(v,b){let I;for(let F=0,Q=c.length;F<Q;F++){const R=c[F];if(R.cacheKey===b){I=R,++I.usedTimes;break}}return I===void 0&&(I=new Pg(n,b,v,s),c.push(I)),I}function T(v){if(--v.usedTimes===0){const b=c.indexOf(v);c[b]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function j(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:D,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:j}}function Ng(){let n=new WeakMap;function e(s){let a=n.get(s);return a===void 0&&(a={},n.set(s,a)),a}function t(s){n.delete(s)}function i(s,a,o){n.get(s)[a]=o}function r(){n=new WeakMap}return{get:e,remove:t,update:i,dispose:r}}function zg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Vl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Wl(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u,d,p,g,_,m){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},n[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=_,f.group=m),e++,f}function o(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):t.push(f)}function l(u,d,p,g,_,m){const f=a(u,d,p,g,_,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||zg),i.length>1&&i.sort(d||Vl),r.length>1&&r.sort(d||Vl)}function h(){for(let u=e,d=n.length;u<d;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:l,finish:h,sort:c}}function Og(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Wl,n.set(i,[a])):r>=s.length?(a=new Wl,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Fg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new rt};break;case"SpotLight":t={position:new U,direction:new U,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new U,halfWidth:new U,halfHeight:new U};break}return n[e.id]=t,t}}}function kg(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Bg=0;function Hg(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Gg(n,e){const t=new Fg,i=kg(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)r.probe.push(new U);const s=new U,a=new Rt,o=new Rt;function l(h,u){let d=0,p=0,g=0;for(let F=0;F<9;F++)r.probe[F].set(0,0,0);let _=0,m=0,f=0,w=0,x=0,M=0,D=0,T=0,A=0,j=0,v=0;h.sort(Hg);const b=u===!0?Math.PI:1;for(let F=0,Q=h.length;F<Q;F++){const R=h[F],z=R.color,k=R.intensity,Z=R.distance,q=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)d+=z.r*k*b,p+=z.g*k*b,g+=z.b*k*b;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)r.probe[Y].addScaledVector(R.sh.coefficients[Y],k);v++}else if(R.isDirectionalLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*b),R.castShadow){const ee=R.shadow,te=i.get(R);te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,r.directionalShadow[_]=te,r.directionalShadowMap[_]=q,r.directionalShadowMatrix[_]=R.shadow.matrix,M++}r.directional[_]=Y,_++}else if(R.isSpotLight){const Y=t.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(z).multiplyScalar(k*b),Y.distance=Z,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,r.spot[f]=Y;const ee=R.shadow;if(R.map&&(r.spotLightMap[A]=R.map,A++,ee.updateMatrices(R),R.castShadow&&j++),r.spotLightMatrix[f]=ee.matrix,R.castShadow){const te=i.get(R);te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,r.spotShadow[f]=te,r.spotShadowMap[f]=q,T++}f++}else if(R.isRectAreaLight){const Y=t.get(R);Y.color.copy(z).multiplyScalar(k),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),r.rectArea[w]=Y,w++}else if(R.isPointLight){const Y=t.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity*b),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const ee=R.shadow,te=i.get(R);te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,te.shadowCameraNear=ee.camera.near,te.shadowCameraFar=ee.camera.far,r.pointShadow[m]=te,r.pointShadowMap[m]=q,r.pointShadowMatrix[m]=R.shadow.matrix,D++}r.point[m]=Y,m++}else if(R.isHemisphereLight){const Y=t.get(R);Y.skyColor.copy(R.color).multiplyScalar(k*b),Y.groundColor.copy(R.groundColor).multiplyScalar(k*b),r.hemi[x]=Y,x++}}w>0&&(e.isWebGL2?n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_FLOAT_1,r.rectAreaLTC2=pe.LTC_FLOAT_2):(r.rectAreaLTC1=pe.LTC_HALF_1,r.rectAreaLTC2=pe.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_FLOAT_1,r.rectAreaLTC2=pe.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=pe.LTC_HALF_1,r.rectAreaLTC2=pe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=d,r.ambient[1]=p,r.ambient[2]=g;const I=r.hash;(I.directionalLength!==_||I.pointLength!==m||I.spotLength!==f||I.rectAreaLength!==w||I.hemiLength!==x||I.numDirectionalShadows!==M||I.numPointShadows!==D||I.numSpotShadows!==T||I.numSpotMaps!==A||I.numLightProbes!==v)&&(r.directional.length=_,r.spot.length=f,r.rectArea.length=w,r.point.length=m,r.hemi.length=x,r.directionalShadow.length=M,r.directionalShadowMap.length=M,r.pointShadow.length=D,r.pointShadowMap.length=D,r.spotShadow.length=T,r.spotShadowMap.length=T,r.directionalShadowMatrix.length=M,r.pointShadowMatrix.length=D,r.spotLightMatrix.length=T+A-j,r.spotLightMap.length=A,r.numSpotLightShadowsWithMaps=j,r.numLightProbes=v,I.directionalLength=_,I.pointLength=m,I.spotLength=f,I.rectAreaLength=w,I.hemiLength=x,I.numDirectionalShadows=M,I.numPointShadows=D,I.numSpotShadows=T,I.numSpotMaps=A,I.numLightProbes=v,r.version=Bg++)}function c(h,u){let d=0,p=0,g=0,_=0,m=0;const f=u.matrixWorldInverse;for(let w=0,x=h.length;w<x;w++){const M=h[w];if(M.isDirectionalLight){const D=r.directional[d];D.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(f),d++}else if(M.isSpotLight){const D=r.spot[g];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(f),D.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),D.direction.sub(s),D.direction.transformDirection(f),g++}else if(M.isRectAreaLight){const D=r.rectArea[_];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(f),o.identity(),a.copy(M.matrixWorld),a.premultiply(f),o.extractRotation(a),D.halfWidth.set(M.width*.5,0,0),D.halfHeight.set(0,M.height*.5,0),D.halfWidth.applyMatrix4(o),D.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const D=r.point[p];D.position.setFromMatrixPosition(M.matrixWorld),D.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){const D=r.hemi[m];D.direction.setFromMatrixPosition(M.matrixWorld),D.direction.transformDirection(f),m++}}}return{setup:l,setupView:c,state:r}}function Xl(n,e){const t=new Gg(n,e),i=[],r=[];function s(){i.length=0,r.length=0}function a(u){i.push(u)}function o(u){r.push(u)}function l(u){t.setup(i,u)}function c(u){t.setupView(i,u)}return{init:s,state:{lightsArray:i,shadowsArray:r,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Vg(n,e){let t=new WeakMap;function i(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new Xl(n,e),t.set(s,[l])):a>=o.length?(l=new Xl(n,e),o.push(l)):l=o[a],l}function r(){t=new WeakMap}return{get:i,dispose:r}}class Wg extends lr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Af,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xg extends lr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const qg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$g=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Yg(n,e,t){let i=new jo;const r=new he,s=new he,a=new kt,o=new Wg({depthPacking:Rf}),l=new Xg,c={},h=t.maxTextureSize,u={[ni]:jt,[jt]:ni,[Yt]:Yt},d=new yi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:qg,fragmentShader:$g}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new en;g.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Me(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let f=this.type;this.render=function(T,A,j){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;const v=n.getRenderTarget(),b=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Qn),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Q=f!==Hn&&this.type===Hn,R=f===Hn&&this.type!==Hn;for(let z=0,k=T.length;z<k;z++){const Z=T[z],q=Z.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;r.copy(q.mapSize);const Y=q.getFrameExtents();if(r.multiply(Y),s.copy(q.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Y.x),r.x=s.x*Y.x,q.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Y.y),r.y=s.y*Y.y,q.mapSize.y=s.y)),q.map===null||Q===!0||R===!0){const te=this.type!==Hn?{minFilter:Qt,magFilter:Qt}:{};q.map!==null&&q.map.dispose(),q.map=new vi(r.x,r.y,te),q.map.texture.name=Z.name+".shadowMap",q.camera.updateProjectionMatrix()}n.setRenderTarget(q.map),n.clear();const ee=q.getViewportCount();for(let te=0;te<ee;te++){const le=q.getViewport(te);a.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),F.viewport(a),q.updateMatrices(Z,te),i=q.getFrustum(),M(A,j,q.camera,Z,this.type)}q.isPointLightShadow!==!0&&this.type===Hn&&w(q,j),q.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(v,b,I)};function w(T,A){const j=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new vi(r.x,r.y)),d.uniforms.shadow_pass.value=T.map.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,n.setRenderTarget(T.mapPass),n.clear(),n.renderBufferDirect(A,null,j,d,_,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,n.setRenderTarget(T.map),n.clear(),n.renderBufferDirect(A,null,j,p,_,null)}function x(T,A,j,v){let b=null;const I=j.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)b=I;else if(b=j.isPointLight===!0?l:o,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const F=b.uuid,Q=A.uuid;let R=c[F];R===void 0&&(R={},c[F]=R);let z=R[Q];z===void 0&&(z=b.clone(),R[Q]=z,A.addEventListener("dispose",D)),b=z}if(b.visible=A.visible,b.wireframe=A.wireframe,v===Hn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,j.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const F=n.properties.get(b);F.light=j}return b}function M(T,A,j,v,b){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&b===Hn)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld);const Q=e.update(T),R=T.material;if(Array.isArray(R)){const z=Q.groups;for(let k=0,Z=z.length;k<Z;k++){const q=z[k],Y=R[q.materialIndex];if(Y&&Y.visible){const ee=x(T,Y,v,b);T.onBeforeShadow(n,T,A,j,Q,ee,q),n.renderBufferDirect(j,null,Q,ee,T,q),T.onAfterShadow(n,T,A,j,Q,ee,q)}}}else if(R.visible){const z=x(T,R,v,b);T.onBeforeShadow(n,T,A,j,Q,z,null),n.renderBufferDirect(j,null,Q,z,T,null),T.onAfterShadow(n,T,A,j,Q,z,null)}}const F=T.children;for(let Q=0,R=F.length;Q<R;Q++)M(F[Q],A,j,v,b)}function D(T){T.target.removeEventListener("dispose",D);for(const j in c){const v=c[j],b=T.target.uuid;b in v&&(v[b].dispose(),delete v[b])}}}function jg(n,e,t){const i=t.isWebGL2;function r(){let L=!1;const me=new kt;let _e=null;const Oe=new kt(0,0,0,0);return{setMask:function(Ne){_e!==Ne&&!L&&(n.colorMask(Ne,Ne,Ne,Ne),_e=Ne)},setLocked:function(Ne){L=Ne},setClear:function(Ne,ut,lt,At,Mt){Mt===!0&&(Ne*=At,ut*=At,lt*=At),me.set(Ne,ut,lt,At),Oe.equals(me)===!1&&(n.clearColor(Ne,ut,lt,At),Oe.copy(me))},reset:function(){L=!1,_e=null,Oe.set(-1,0,0,0)}}}function s(){let L=!1,me=null,_e=null,Oe=null;return{setTest:function(Ne){Ne?$e(n.DEPTH_TEST):Ce(n.DEPTH_TEST)},setMask:function(Ne){me!==Ne&&!L&&(n.depthMask(Ne),me=Ne)},setFunc:function(Ne){if(_e!==Ne){switch(Ne){case rf:n.depthFunc(n.NEVER);break;case sf:n.depthFunc(n.ALWAYS);break;case of:n.depthFunc(n.LESS);break;case Ms:n.depthFunc(n.LEQUAL);break;case af:n.depthFunc(n.EQUAL);break;case lf:n.depthFunc(n.GEQUAL);break;case cf:n.depthFunc(n.GREATER);break;case hf:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}_e=Ne}},setLocked:function(Ne){L=Ne},setClear:function(Ne){Oe!==Ne&&(n.clearDepth(Ne),Oe=Ne)},reset:function(){L=!1,me=null,_e=null,Oe=null}}}function a(){let L=!1,me=null,_e=null,Oe=null,Ne=null,ut=null,lt=null,At=null,Mt=null;return{setTest:function(ct){L||(ct?$e(n.STENCIL_TEST):Ce(n.STENCIL_TEST))},setMask:function(ct){me!==ct&&!L&&(n.stencilMask(ct),me=ct)},setFunc:function(ct,St,Ut){(_e!==ct||Oe!==St||Ne!==Ut)&&(n.stencilFunc(ct,St,Ut),_e=ct,Oe=St,Ne=Ut)},setOp:function(ct,St,Ut){(ut!==ct||lt!==St||At!==Ut)&&(n.stencilOp(ct,St,Ut),ut=ct,lt=St,At=Ut)},setLocked:function(ct){L=ct},setClear:function(ct){Mt!==ct&&(n.clearStencil(ct),Mt=ct)},reset:function(){L=!1,me=null,_e=null,Oe=null,Ne=null,ut=null,lt=null,At=null,Mt=null}}}const o=new r,l=new s,c=new a,h=new WeakMap,u=new WeakMap;let d={},p={},g=new WeakMap,_=[],m=null,f=!1,w=null,x=null,M=null,D=null,T=null,A=null,j=null,v=new rt(0,0,0),b=0,I=!1,F=null,Q=null,R=null,z=null,k=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,Y=0;const ee=n.getParameter(n.VERSION);ee.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(ee)[1]),q=Y>=1):ee.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(ee)[1]),q=Y>=2);let te=null,le={};const W=n.getParameter(n.SCISSOR_BOX),ne=n.getParameter(n.VIEWPORT),xe=new kt().fromArray(W),Re=new kt().fromArray(ne);function be(L,me,_e,Oe){const Ne=new Uint8Array(4),ut=n.createTexture();n.bindTexture(L,ut),n.texParameteri(L,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(L,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let lt=0;lt<_e;lt++)i&&(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)?n.texImage3D(me,0,n.RGBA,1,1,Oe,0,n.RGBA,n.UNSIGNED_BYTE,Ne):n.texImage2D(me+lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ne);return ut}const ke={};ke[n.TEXTURE_2D]=be(n.TEXTURE_2D,n.TEXTURE_2D,1),ke[n.TEXTURE_CUBE_MAP]=be(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ke[n.TEXTURE_2D_ARRAY]=be(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ke[n.TEXTURE_3D]=be(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),$e(n.DEPTH_TEST),l.setFunc(Ms),ve(!1),S(Ca),$e(n.CULL_FACE),J(Qn);function $e(L){d[L]!==!0&&(n.enable(L),d[L]=!0)}function Ce(L){d[L]!==!1&&(n.disable(L),d[L]=!1)}function Ve(L,me){return p[L]!==me?(n.bindFramebuffer(L,me),p[L]=me,i&&(L===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=me),L===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=me)),!0):!1}function C(L,me){let _e=_,Oe=!1;if(L)if(_e=g.get(me),_e===void 0&&(_e=[],g.set(me,_e)),L.isWebGLMultipleRenderTargets){const Ne=L.texture;if(_e.length!==Ne.length||_e[0]!==n.COLOR_ATTACHMENT0){for(let ut=0,lt=Ne.length;ut<lt;ut++)_e[ut]=n.COLOR_ATTACHMENT0+ut;_e.length=Ne.length,Oe=!0}}else _e[0]!==n.COLOR_ATTACHMENT0&&(_e[0]=n.COLOR_ATTACHMENT0,Oe=!0);else _e[0]!==n.BACK&&(_e[0]=n.BACK,Oe=!0);Oe&&(t.isWebGL2?n.drawBuffers(_e):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(_e))}function fe(L){return m!==L?(n.useProgram(L),m=L,!0):!1}const V={[fi]:n.FUNC_ADD,[Gu]:n.FUNC_SUBTRACT,[Vu]:n.FUNC_REVERSE_SUBTRACT};if(i)V[Da]=n.MIN,V[Ua]=n.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(V[Da]=L.MIN_EXT,V[Ua]=L.MAX_EXT)}const ce={[Wu]:n.ZERO,[Xu]:n.ONE,[qu]:n.SRC_COLOR,[Co]:n.SRC_ALPHA,[Ku]:n.SRC_ALPHA_SATURATE,[Zu]:n.DST_COLOR,[Yu]:n.DST_ALPHA,[$u]:n.ONE_MINUS_SRC_COLOR,[Po]:n.ONE_MINUS_SRC_ALPHA,[Ju]:n.ONE_MINUS_DST_COLOR,[ju]:n.ONE_MINUS_DST_ALPHA,[Qu]:n.CONSTANT_COLOR,[ef]:n.ONE_MINUS_CONSTANT_COLOR,[tf]:n.CONSTANT_ALPHA,[nf]:n.ONE_MINUS_CONSTANT_ALPHA};function J(L,me,_e,Oe,Ne,ut,lt,At,Mt,ct){if(L===Qn){f===!0&&(Ce(n.BLEND),f=!1);return}if(f===!1&&($e(n.BLEND),f=!0),L!==Hu){if(L!==w||ct!==I){if((x!==fi||T!==fi)&&(n.blendEquation(n.FUNC_ADD),x=fi,T=fi),ct)switch(L){case er:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pn:n.blendFunc(n.ONE,n.ONE);break;case Pa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case La:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case er:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Pa:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case La:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}M=null,D=null,A=null,j=null,v.set(0,0,0),b=0,w=L,I=ct}return}Ne=Ne||me,ut=ut||_e,lt=lt||Oe,(me!==x||Ne!==T)&&(n.blendEquationSeparate(V[me],V[Ne]),x=me,T=Ne),(_e!==M||Oe!==D||ut!==A||lt!==j)&&(n.blendFuncSeparate(ce[_e],ce[Oe],ce[ut],ce[lt]),M=_e,D=Oe,A=ut,j=lt),(At.equals(v)===!1||Mt!==b)&&(n.blendColor(At.r,At.g,At.b,Mt),v.copy(At),b=Mt),w=L,I=!1}function Le(L,me){L.side===Yt?Ce(n.CULL_FACE):$e(n.CULL_FACE);let _e=L.side===jt;me&&(_e=!_e),ve(_e),L.blending===er&&L.transparent===!1?J(Qn):J(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Oe=L.stencilWrite;c.setTest(Oe),Oe&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),O(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?$e(n.SAMPLE_ALPHA_TO_COVERAGE):Ce(n.SAMPLE_ALPHA_TO_COVERAGE)}function ve(L){F!==L&&(L?n.frontFace(n.CW):n.frontFace(n.CCW),F=L)}function S(L){L!==Fu?($e(n.CULL_FACE),L!==Q&&(L===Ca?n.cullFace(n.BACK):L===ku?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ce(n.CULL_FACE),Q=L}function y(L){L!==R&&(q&&n.lineWidth(L),R=L)}function O(L,me,_e){L?($e(n.POLYGON_OFFSET_FILL),(z!==me||k!==_e)&&(n.polygonOffset(me,_e),z=me,k=_e)):Ce(n.POLYGON_OFFSET_FILL)}function oe(L){L?$e(n.SCISSOR_TEST):Ce(n.SCISSOR_TEST)}function re(L){L===void 0&&(L=n.TEXTURE0+Z-1),te!==L&&(n.activeTexture(L),te=L)}function ie(L,me,_e){_e===void 0&&(te===null?_e=n.TEXTURE0+Z-1:_e=te);let Oe=le[_e];Oe===void 0&&(Oe={type:void 0,texture:void 0},le[_e]=Oe),(Oe.type!==L||Oe.texture!==me)&&(te!==_e&&(n.activeTexture(_e),te=_e),n.bindTexture(L,me||ke[L]),Oe.type=L,Oe.texture=me)}function Te(){const L=le[te];L!==void 0&&L.type!==void 0&&(n.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function ge(){try{n.compressedTexImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Se(){try{n.compressedTexImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ue(){try{n.texSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Be(){try{n.texSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function se(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ot(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{n.texStorage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function He(){try{n.texStorage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function we(){try{n.texImage2D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{n.texImage3D.apply(n,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ye(L){xe.equals(L)===!1&&(n.scissor(L.x,L.y,L.z,L.w),xe.copy(L))}function at(L){Re.equals(L)===!1&&(n.viewport(L.x,L.y,L.z,L.w),Re.copy(L))}function yt(L,me){let _e=u.get(me);_e===void 0&&(_e=new WeakMap,u.set(me,_e));let Oe=_e.get(L);Oe===void 0&&(Oe=n.getUniformBlockIndex(me,L.name),_e.set(L,Oe))}function Je(L,me){const Oe=u.get(me).get(L);h.get(me)!==Oe&&(n.uniformBlockBinding(me,Oe,L.__bindingPointIndex),h.set(me,Oe))}function de(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},te=null,le={},p={},g=new WeakMap,_=[],m=null,f=!1,w=null,x=null,M=null,D=null,T=null,A=null,j=null,v=new rt(0,0,0),b=0,I=!1,F=null,Q=null,R=null,z=null,k=null,xe.set(0,0,n.canvas.width,n.canvas.height),Re.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:$e,disable:Ce,bindFramebuffer:Ve,drawBuffers:C,useProgram:fe,setBlending:J,setMaterial:Le,setFlipSided:ve,setCullFace:S,setLineWidth:y,setPolygonOffset:O,setScissorTest:oe,activeTexture:re,bindTexture:ie,unbindTexture:Te,compressedTexImage2D:ge,compressedTexImage3D:Se,texImage2D:we,texImage3D:Ee,updateUBOMapping:yt,uniformBlockBinding:Je,texStorage2D:Ae,texStorage3D:He,texSubImage2D:Ue,texSubImage3D:Be,compressedTexSubImage2D:se,compressedTexSubImage3D:ot,scissor:Ye,viewport:at,reset:de}}function Zg(n,e,t,i,r,s,a){const o=r.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(S,y){return p?new OffscreenCanvas(S,y):As("canvas")}function _(S,y,O,oe){let re=1;if((S.width>oe||S.height>oe)&&(re=oe/Math.max(S.width,S.height)),re<1||y===!0)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap){const ie=y?Ts:Math.floor,Te=ie(re*S.width),ge=ie(re*S.height);u===void 0&&(u=g(Te,ge));const Se=O?g(Te,ge):u;return Se.width=Te,Se.height=ge,Se.getContext("2d").drawImage(S,0,0,Te,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+S.width+"x"+S.height+") to ("+Te+"x"+ge+")."),Se}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+S.width+"x"+S.height+")."),S;return S}function m(S){return No(S.width)&&No(S.height)}function f(S){return o?!1:S.wrapS!==bn||S.wrapT!==bn||S.minFilter!==Qt&&S.minFilter!==mn}function w(S,y){return S.generateMipmaps&&y&&S.minFilter!==Qt&&S.minFilter!==mn}function x(S){n.generateMipmap(S)}function M(S,y,O,oe,re=!1){if(o===!1)return y;if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let ie=y;if(y===n.RED&&(O===n.FLOAT&&(ie=n.R32F),O===n.HALF_FLOAT&&(ie=n.R16F),O===n.UNSIGNED_BYTE&&(ie=n.R8)),y===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(ie=n.R8UI),O===n.UNSIGNED_SHORT&&(ie=n.R16UI),O===n.UNSIGNED_INT&&(ie=n.R32UI),O===n.BYTE&&(ie=n.R8I),O===n.SHORT&&(ie=n.R16I),O===n.INT&&(ie=n.R32I)),y===n.RG&&(O===n.FLOAT&&(ie=n.RG32F),O===n.HALF_FLOAT&&(ie=n.RG16F),O===n.UNSIGNED_BYTE&&(ie=n.RG8)),y===n.RGBA){const Te=re?Ss:dt.getTransfer(oe);O===n.FLOAT&&(ie=n.RGBA32F),O===n.HALF_FLOAT&&(ie=n.RGBA16F),O===n.UNSIGNED_BYTE&&(ie=Te===vt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT_4_4_4_4&&(ie=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(ie=n.RGB5_A1)}return(ie===n.R16F||ie===n.R32F||ie===n.RG16F||ie===n.RG32F||ie===n.RGBA16F||ie===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function D(S,y,O){return w(S,O)===!0||S.isFramebufferTexture&&S.minFilter!==Qt&&S.minFilter!==mn?Math.log2(Math.max(y.width,y.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?y.mipmaps.length:1}function T(S){return S===Qt||S===Ia||S===$s?n.NEAREST:n.LINEAR}function A(S){const y=S.target;y.removeEventListener("dispose",A),v(y),y.isVideoTexture&&h.delete(y)}function j(S){const y=S.target;y.removeEventListener("dispose",j),I(y)}function v(S){const y=i.get(S);if(y.__webglInit===void 0)return;const O=S.source,oe=d.get(O);if(oe){const re=oe[y.__cacheKey];re.usedTimes--,re.usedTimes===0&&b(S),Object.keys(oe).length===0&&d.delete(O)}i.remove(S)}function b(S){const y=i.get(S);n.deleteTexture(y.__webglTexture);const O=S.source,oe=d.get(O);delete oe[y.__cacheKey],a.memory.textures--}function I(S){const y=S.texture,O=i.get(S),oe=i.get(y);if(oe.__webglTexture!==void 0&&(n.deleteTexture(oe.__webglTexture),a.memory.textures--),S.depthTexture&&S.depthTexture.dispose(),S.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(O.__webglFramebuffer[re]))for(let ie=0;ie<O.__webglFramebuffer[re].length;ie++)n.deleteFramebuffer(O.__webglFramebuffer[re][ie]);else n.deleteFramebuffer(O.__webglFramebuffer[re]);O.__webglDepthbuffer&&n.deleteRenderbuffer(O.__webglDepthbuffer[re])}else{if(Array.isArray(O.__webglFramebuffer))for(let re=0;re<O.__webglFramebuffer.length;re++)n.deleteFramebuffer(O.__webglFramebuffer[re]);else n.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&n.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&n.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let re=0;re<O.__webglColorRenderbuffer.length;re++)O.__webglColorRenderbuffer[re]&&n.deleteRenderbuffer(O.__webglColorRenderbuffer[re]);O.__webglDepthRenderbuffer&&n.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(S.isWebGLMultipleRenderTargets)for(let re=0,ie=y.length;re<ie;re++){const Te=i.get(y[re]);Te.__webglTexture&&(n.deleteTexture(Te.__webglTexture),a.memory.textures--),i.remove(y[re])}i.remove(y),i.remove(S)}let F=0;function Q(){F=0}function R(){const S=F;return S>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+r.maxTextures),F+=1,S}function z(S){const y=[];return y.push(S.wrapS),y.push(S.wrapT),y.push(S.wrapR||0),y.push(S.magFilter),y.push(S.minFilter),y.push(S.anisotropy),y.push(S.internalFormat),y.push(S.format),y.push(S.type),y.push(S.generateMipmaps),y.push(S.premultiplyAlpha),y.push(S.flipY),y.push(S.unpackAlignment),y.push(S.colorSpace),y.join()}function k(S,y){const O=i.get(S);if(S.isVideoTexture&&Le(S),S.isRenderTargetTexture===!1&&S.version>0&&O.__version!==S.version){const oe=S.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{xe(O,S,y);return}}t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+y)}function Z(S,y){const O=i.get(S);if(S.version>0&&O.__version!==S.version){xe(O,S,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+y)}function q(S,y){const O=i.get(S);if(S.version>0&&O.__version!==S.version){xe(O,S,y);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+y)}function Y(S,y){const O=i.get(S);if(S.version>0&&O.__version!==S.version){Re(O,S,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+y)}const ee={[Pr]:n.REPEAT,[bn]:n.CLAMP_TO_EDGE,[Do]:n.MIRRORED_REPEAT},te={[Qt]:n.NEAREST,[Ia]:n.NEAREST_MIPMAP_NEAREST,[$s]:n.NEAREST_MIPMAP_LINEAR,[mn]:n.LINEAR,[xf]:n.LINEAR_MIPMAP_NEAREST,[Lr]:n.LINEAR_MIPMAP_LINEAR},le={[Pf]:n.NEVER,[zf]:n.ALWAYS,[Lf]:n.LESS,[Oc]:n.LEQUAL,[Df]:n.EQUAL,[Nf]:n.GEQUAL,[Uf]:n.GREATER,[If]:n.NOTEQUAL};function W(S,y,O){if(O?(n.texParameteri(S,n.TEXTURE_WRAP_S,ee[y.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,ee[y.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,ee[y.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,te[y.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,te[y.minFilter])):(n.texParameteri(S,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(S,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(y.wrapS!==bn||y.wrapT!==bn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(S,n.TEXTURE_MAG_FILTER,T(y.magFilter)),n.texParameteri(S,n.TEXTURE_MIN_FILTER,T(y.minFilter)),y.minFilter!==Qt&&y.minFilter!==mn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),y.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,le[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const oe=e.get("EXT_texture_filter_anisotropic");if(y.magFilter===Qt||y.minFilter!==$s&&y.minFilter!==Lr||y.type===Kn&&e.has("OES_texture_float_linear")===!1||o===!1&&y.type===Dr&&e.has("OES_texture_half_float_linear")===!1)return;(y.anisotropy>1||i.get(y).__currentAnisotropy)&&(n.texParameterf(S,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy)}}function ne(S,y){let O=!1;S.__webglInit===void 0&&(S.__webglInit=!0,y.addEventListener("dispose",A));const oe=y.source;let re=d.get(oe);re===void 0&&(re={},d.set(oe,re));const ie=z(y);if(ie!==S.__cacheKey){re[ie]===void 0&&(re[ie]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),re[ie].usedTimes++;const Te=re[S.__cacheKey];Te!==void 0&&(re[S.__cacheKey].usedTimes--,Te.usedTimes===0&&b(y)),S.__cacheKey=ie,S.__webglTexture=re[ie].texture}return O}function xe(S,y,O){let oe=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(oe=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(oe=n.TEXTURE_3D);const re=ne(S,y),ie=y.source;t.bindTexture(oe,S.__webglTexture,n.TEXTURE0+O);const Te=i.get(ie);if(ie.version!==Te.__version||re===!0){t.activeTexture(n.TEXTURE0+O);const ge=dt.getPrimaries(dt.workingColorSpace),Se=y.colorSpace===_n?null:dt.getPrimaries(y.colorSpace),Ue=y.colorSpace===_n||ge===Se?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const Be=f(y)&&m(y.image)===!1;let se=_(y.image,Be,!1,r.maxTextureSize);se=ve(y,se);const ot=m(se)||o,Ae=s.convert(y.format,y.colorSpace);let He=s.convert(y.type),we=M(y.internalFormat,Ae,He,y.colorSpace,y.isVideoTexture);W(oe,y,ot);let Ee;const Ye=y.mipmaps,at=o&&y.isVideoTexture!==!0&&we!==Ic,yt=Te.__version===void 0||re===!0,Je=D(y,se,ot);if(y.isDepthTexture)we=n.DEPTH_COMPONENT,o?y.type===Kn?we=n.DEPTH_COMPONENT32F:y.type===Jn?we=n.DEPTH_COMPONENT24:y.type===gi?we=n.DEPTH24_STENCIL8:we=n.DEPTH_COMPONENT16:y.type===Kn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),y.format===_i&&we===n.DEPTH_COMPONENT&&y.type!==Wo&&y.type!==Jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),y.type=Jn,He=s.convert(y.type)),y.format===sr&&we===n.DEPTH_COMPONENT&&(we=n.DEPTH_STENCIL,y.type!==gi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),y.type=gi,He=s.convert(y.type))),yt&&(at?t.texStorage2D(n.TEXTURE_2D,1,we,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,we,se.width,se.height,0,Ae,He,null));else if(y.isDataTexture)if(Ye.length>0&&ot){at&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,we,Ye[0].width,Ye[0].height);for(let de=0,L=Ye.length;de<L;de++)Ee=Ye[de],at?t.texSubImage2D(n.TEXTURE_2D,de,0,0,Ee.width,Ee.height,Ae,He,Ee.data):t.texImage2D(n.TEXTURE_2D,de,we,Ee.width,Ee.height,0,Ae,He,Ee.data);y.generateMipmaps=!1}else at?(yt&&t.texStorage2D(n.TEXTURE_2D,Je,we,se.width,se.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,se.width,se.height,Ae,He,se.data)):t.texImage2D(n.TEXTURE_2D,0,we,se.width,se.height,0,Ae,He,se.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){at&&yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,we,Ye[0].width,Ye[0].height,se.depth);for(let de=0,L=Ye.length;de<L;de++)Ee=Ye[de],y.format!==En?Ae!==null?at?t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Ee.width,Ee.height,se.depth,Ae,Ee.data,0,0):t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,de,we,Ee.width,Ee.height,se.depth,0,Ee.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?t.texSubImage3D(n.TEXTURE_2D_ARRAY,de,0,0,0,Ee.width,Ee.height,se.depth,Ae,He,Ee.data):t.texImage3D(n.TEXTURE_2D_ARRAY,de,we,Ee.width,Ee.height,se.depth,0,Ae,He,Ee.data)}else{at&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,we,Ye[0].width,Ye[0].height);for(let de=0,L=Ye.length;de<L;de++)Ee=Ye[de],y.format!==En?Ae!==null?at?t.compressedTexSubImage2D(n.TEXTURE_2D,de,0,0,Ee.width,Ee.height,Ae,Ee.data):t.compressedTexImage2D(n.TEXTURE_2D,de,we,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):at?t.texSubImage2D(n.TEXTURE_2D,de,0,0,Ee.width,Ee.height,Ae,He,Ee.data):t.texImage2D(n.TEXTURE_2D,de,we,Ee.width,Ee.height,0,Ae,He,Ee.data)}else if(y.isDataArrayTexture)at?(yt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Je,we,se.width,se.height,se.depth),t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,Ae,He,se.data)):t.texImage3D(n.TEXTURE_2D_ARRAY,0,we,se.width,se.height,se.depth,0,Ae,He,se.data);else if(y.isData3DTexture)at?(yt&&t.texStorage3D(n.TEXTURE_3D,Je,we,se.width,se.height,se.depth),t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,Ae,He,se.data)):t.texImage3D(n.TEXTURE_3D,0,we,se.width,se.height,se.depth,0,Ae,He,se.data);else if(y.isFramebufferTexture){if(yt)if(at)t.texStorage2D(n.TEXTURE_2D,Je,we,se.width,se.height);else{let de=se.width,L=se.height;for(let me=0;me<Je;me++)t.texImage2D(n.TEXTURE_2D,me,we,de,L,0,Ae,He,null),de>>=1,L>>=1}}else if(Ye.length>0&&ot){at&&yt&&t.texStorage2D(n.TEXTURE_2D,Je,we,Ye[0].width,Ye[0].height);for(let de=0,L=Ye.length;de<L;de++)Ee=Ye[de],at?t.texSubImage2D(n.TEXTURE_2D,de,0,0,Ae,He,Ee):t.texImage2D(n.TEXTURE_2D,de,we,Ae,He,Ee);y.generateMipmaps=!1}else at?(yt&&t.texStorage2D(n.TEXTURE_2D,Je,we,se.width,se.height),t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ae,He,se)):t.texImage2D(n.TEXTURE_2D,0,we,Ae,He,se);w(y,ot)&&x(oe),Te.__version=ie.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function Re(S,y,O){if(y.image.length!==6)return;const oe=ne(S,y),re=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+O);const ie=i.get(re);if(re.version!==ie.__version||oe===!0){t.activeTexture(n.TEXTURE0+O);const Te=dt.getPrimaries(dt.workingColorSpace),ge=y.colorSpace===_n?null:dt.getPrimaries(y.colorSpace),Se=y.colorSpace===_n||Te===ge?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Ue=y.isCompressedTexture||y.image[0].isCompressedTexture,Be=y.image[0]&&y.image[0].isDataTexture,se=[];for(let de=0;de<6;de++)!Ue&&!Be?se[de]=_(y.image[de],!1,!0,r.maxCubemapSize):se[de]=Be?y.image[de].image:y.image[de],se[de]=ve(y,se[de]);const ot=se[0],Ae=m(ot)||o,He=s.convert(y.format,y.colorSpace),we=s.convert(y.type),Ee=M(y.internalFormat,He,we,y.colorSpace),Ye=o&&y.isVideoTexture!==!0,at=ie.__version===void 0||oe===!0;let yt=D(y,ot,Ae);W(n.TEXTURE_CUBE_MAP,y,Ae);let Je;if(Ue){Ye&&at&&t.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Ee,ot.width,ot.height);for(let de=0;de<6;de++){Je=se[de].mipmaps;for(let L=0;L<Je.length;L++){const me=Je[L];y.format!==En?He!==null?Ye?t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L,0,0,me.width,me.height,He,me.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L,Ee,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L,0,0,me.width,me.height,He,we,me.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L,Ee,me.width,me.height,0,He,we,me.data)}}}else{Je=y.mipmaps,Ye&&at&&(Je.length>0&&yt++,t.texStorage2D(n.TEXTURE_CUBE_MAP,yt,Ee,se[0].width,se[0].height));for(let de=0;de<6;de++)if(Be){Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,se[de].width,se[de].height,He,we,se[de].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Ee,se[de].width,se[de].height,0,He,we,se[de].data);for(let L=0;L<Je.length;L++){const _e=Je[L].image[de].image;Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L+1,0,0,_e.width,_e.height,He,we,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L+1,Ee,_e.width,_e.height,0,He,we,_e.data)}}else{Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,0,0,He,we,se[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0,Ee,He,we,se[de]);for(let L=0;L<Je.length;L++){const me=Je[L];Ye?t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L+1,0,0,He,we,me.image[de]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+de,L+1,Ee,He,we,me.image[de])}}}w(y,Ae)&&x(n.TEXTURE_CUBE_MAP),ie.__version=re.version,y.onUpdate&&y.onUpdate(y)}S.__version=y.version}function be(S,y,O,oe,re,ie){const Te=s.convert(O.format,O.colorSpace),ge=s.convert(O.type),Se=M(O.internalFormat,Te,ge,O.colorSpace);if(!i.get(y).__hasExternalTextures){const Be=Math.max(1,y.width>>ie),se=Math.max(1,y.height>>ie);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,ie,Se,Be,se,y.depth,0,Te,ge,null):t.texImage2D(re,ie,Se,Be,se,0,Te,ge,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),J(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,oe,re,i.get(O).__webglTexture,0,ce(y)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,oe,re,i.get(O).__webglTexture,ie),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ke(S,y,O){if(n.bindRenderbuffer(n.RENDERBUFFER,S),y.depthBuffer&&!y.stencilBuffer){let oe=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(O||J(y)){const re=y.depthTexture;re&&re.isDepthTexture&&(re.type===Kn?oe=n.DEPTH_COMPONENT32F:re.type===Jn&&(oe=n.DEPTH_COMPONENT24));const ie=ce(y);J(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,oe,y.width,y.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,oe,y.width,y.height)}else n.renderbufferStorage(n.RENDERBUFFER,oe,y.width,y.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,S)}else if(y.depthBuffer&&y.stencilBuffer){const oe=ce(y);O&&J(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,oe,n.DEPTH24_STENCIL8,y.width,y.height):J(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,oe,n.DEPTH24_STENCIL8,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,S)}else{const oe=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let re=0;re<oe.length;re++){const ie=oe[re],Te=s.convert(ie.format,ie.colorSpace),ge=s.convert(ie.type),Se=M(ie.internalFormat,Te,ge,ie.colorSpace),Ue=ce(y);O&&J(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue,Se,y.width,y.height):J(y)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ue,Se,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Se,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function $e(S,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),k(y.depthTexture,0);const oe=i.get(y.depthTexture).__webglTexture,re=ce(y);if(y.depthTexture.format===_i)J(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,oe,0);else if(y.depthTexture.format===sr)J(y)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0,re):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function Ce(S){const y=i.get(S),O=S.isWebGLCubeRenderTarget===!0;if(S.depthTexture&&!y.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");$e(y.__webglFramebuffer,S)}else if(O){y.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[oe]),y.__webglDepthbuffer[oe]=n.createRenderbuffer(),ke(y.__webglDepthbuffer[oe],S,!1)}else t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=n.createRenderbuffer(),ke(y.__webglDepthbuffer,S,!1);t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ve(S,y,O){const oe=i.get(S);y!==void 0&&be(oe.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&Ce(S)}function C(S){const y=S.texture,O=i.get(S),oe=i.get(y);S.addEventListener("dispose",j),S.isWebGLMultipleRenderTargets!==!0&&(oe.__webglTexture===void 0&&(oe.__webglTexture=n.createTexture()),oe.__version=y.version,a.memory.textures++);const re=S.isWebGLCubeRenderTarget===!0,ie=S.isWebGLMultipleRenderTargets===!0,Te=m(S)||o;if(re){O.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(o&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer[ge]=[];for(let Se=0;Se<y.mipmaps.length;Se++)O.__webglFramebuffer[ge][Se]=n.createFramebuffer()}else O.__webglFramebuffer[ge]=n.createFramebuffer()}else{if(o&&y.mipmaps&&y.mipmaps.length>0){O.__webglFramebuffer=[];for(let ge=0;ge<y.mipmaps.length;ge++)O.__webglFramebuffer[ge]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(ie)if(r.drawBuffers){const ge=S.texture;for(let Se=0,Ue=ge.length;Se<Ue;Se++){const Be=i.get(ge[Se]);Be.__webglTexture===void 0&&(Be.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&S.samples>0&&J(S)===!1){const ge=ie?y:[y];O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Se=0;Se<ge.length;Se++){const Ue=ge[Se];O.__webglColorRenderbuffer[Se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[Se]);const Be=s.convert(Ue.format,Ue.colorSpace),se=s.convert(Ue.type),ot=M(Ue.internalFormat,Be,se,Ue.colorSpace,S.isXRRenderTarget===!0),Ae=ce(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ae,ot,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Se,n.RENDERBUFFER,O.__webglColorRenderbuffer[Se])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),ke(O.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(re){t.bindTexture(n.TEXTURE_CUBE_MAP,oe.__webglTexture),W(n.TEXTURE_CUBE_MAP,y,Te);for(let ge=0;ge<6;ge++)if(o&&y.mipmaps&&y.mipmaps.length>0)for(let Se=0;Se<y.mipmaps.length;Se++)be(O.__webglFramebuffer[ge][Se],S,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Se);else be(O.__webglFramebuffer[ge],S,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);w(y,Te)&&x(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const ge=S.texture;for(let Se=0,Ue=ge.length;Se<Ue;Se++){const Be=ge[Se],se=i.get(Be);t.bindTexture(n.TEXTURE_2D,se.__webglTexture),W(n.TEXTURE_2D,Be,Te),be(O.__webglFramebuffer,S,Be,n.COLOR_ATTACHMENT0+Se,n.TEXTURE_2D,0),w(Be,Te)&&x(n.TEXTURE_2D)}t.unbindTexture()}else{let ge=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(o?ge=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,oe.__webglTexture),W(ge,y,Te),o&&y.mipmaps&&y.mipmaps.length>0)for(let Se=0;Se<y.mipmaps.length;Se++)be(O.__webglFramebuffer[Se],S,y,n.COLOR_ATTACHMENT0,ge,Se);else be(O.__webglFramebuffer,S,y,n.COLOR_ATTACHMENT0,ge,0);w(y,Te)&&x(ge),t.unbindTexture()}S.depthBuffer&&Ce(S)}function fe(S){const y=m(S)||o,O=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let oe=0,re=O.length;oe<re;oe++){const ie=O[oe];if(w(ie,y)){const Te=S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,ge=i.get(ie).__webglTexture;t.bindTexture(Te,ge),x(Te),t.unbindTexture()}}}function V(S){if(o&&S.samples>0&&J(S)===!1){const y=S.isWebGLMultipleRenderTargets?S.texture:[S.texture],O=S.width,oe=S.height;let re=n.COLOR_BUFFER_BIT;const ie=[],Te=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ge=i.get(S),Se=S.isWebGLMultipleRenderTargets===!0;if(Se)for(let Ue=0;Ue<y.length;Ue++)t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Ue=0;Ue<y.length;Ue++){ie.push(n.COLOR_ATTACHMENT0+Ue),S.depthBuffer&&ie.push(Te);const Be=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(Be===!1&&(S.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),Se&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Ue]),Be===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Te]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Te])),Se){const se=i.get(y[Ue]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,O,oe,0,0,O,oe,re,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Se)for(let Ue=0;Ue<y.length;Ue++){t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.RENDERBUFFER,ge.__webglColorRenderbuffer[Ue]);const Be=i.get(y[Ue]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ge.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ue,n.TEXTURE_2D,Be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function ce(S){return Math.min(r.maxSamples,S.samples)}function J(S){const y=i.get(S);return o&&S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Le(S){const y=a.render.frame;h.get(S)!==y&&(h.set(S,y),S.update())}function ve(S,y){const O=S.colorSpace,oe=S.format,re=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||S.format===Io||O!==Wn&&O!==_n&&(dt.getTransfer(O)===vt?o===!1?e.has("EXT_sRGB")===!0&&oe===En?(S.format=Io,S.minFilter=mn,S.generateMipmaps=!1):y=kc.sRGBToLinear(y):(oe!==En||re!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),y}this.allocateTextureUnit=R,this.resetTextureUnits=Q,this.setTexture2D=k,this.setTexture2DArray=Z,this.setTexture3D=q,this.setTextureCube=Y,this.rebindTextures=Ve,this.setupRenderTarget=C,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=V,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=be,this.useMultisampledRTT=J}function Jg(n,e,t){const i=t.isWebGL2;function r(s,a=_n){let o;const l=dt.getTransfer(a);if(s===ti)return n.UNSIGNED_BYTE;if(s===Cc)return n.UNSIGNED_SHORT_4_4_4_4;if(s===Pc)return n.UNSIGNED_SHORT_5_5_5_1;if(s===vf)return n.BYTE;if(s===yf)return n.SHORT;if(s===Wo)return n.UNSIGNED_SHORT;if(s===Rc)return n.INT;if(s===Jn)return n.UNSIGNED_INT;if(s===Kn)return n.FLOAT;if(s===Dr)return i?n.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Mf)return n.ALPHA;if(s===En)return n.RGBA;if(s===Sf)return n.LUMINANCE;if(s===bf)return n.LUMINANCE_ALPHA;if(s===_i)return n.DEPTH_COMPONENT;if(s===sr)return n.DEPTH_STENCIL;if(s===Io)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Ef)return n.RED;if(s===Lc)return n.RED_INTEGER;if(s===wf)return n.RG;if(s===Dc)return n.RG_INTEGER;if(s===Uc)return n.RGBA_INTEGER;if(s===Ys||s===js||s===Zs||s===Js)if(l===vt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Ys)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===js)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Zs)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Js)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Ys)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===js)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Zs)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Js)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Na||s===za||s===Oa||s===Fa)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Na)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===za)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Oa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Fa)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ic)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===ka||s===Ba)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===ka)return l===vt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Ba)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ha||s===Ga||s===Va||s===Wa||s===Xa||s===qa||s===$a||s===Ya||s===ja||s===Za||s===Ja||s===Ka||s===Qa||s===el)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Ha)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Ga)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Va)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Wa)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Xa)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===qa)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===$a)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ya)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===ja)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Za)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Ja)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Ka)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Qa)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===el)return l===vt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Ks||s===tl||s===nl)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Ks)return l===vt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===tl)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===nl)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Tf||s===il||s===rl||s===sl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Ks)return o.COMPRESSED_RED_RGTC1_EXT;if(s===il)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===rl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===sl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===gi?i?n.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[s]!==void 0?n[s]:null}return{convert:r}}class Kg extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qt extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class So{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,i),f=this._getHandJoint(c,_);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new qt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class e_ extends ar{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null;const _=t.getContextAttributes();let m=null,f=null;const w=[],x=[],M=new he;let D=null;const T=new an;T.layers.enable(1),T.viewport=new kt;const A=new an;A.layers.enable(2),A.viewport=new kt;const j=[T,A],v=new Kg;v.layers.enable(1),v.layers.enable(2);let b=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ne=w[W];return ne===void 0&&(ne=new So,w[W]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(W){let ne=w[W];return ne===void 0&&(ne=new So,w[W]=ne),ne.getGripSpace()},this.getHand=function(W){let ne=w[W];return ne===void 0&&(ne=new So,w[W]=ne),ne.getHandSpace()};function F(W){const ne=x.indexOf(W.inputSource);if(ne===-1)return;const xe=w[ne];xe!==void 0&&(xe.update(W.inputSource,W.frame,c||a),xe.dispatchEvent({type:W.type,data:W.inputSource}))}function Q(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",R);for(let W=0;W<w.length;W++){const ne=x[W];ne!==null&&(x[W]=null,w[W].disconnect(ne))}b=null,I=null,e.setRenderTarget(m),p=null,d=null,u=null,r=null,f=null,le.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(m=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",R),_.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(M),r.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ne={antialias:r.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new vi(p.framebufferWidth,p.framebufferHeight,{format:En,type:ti,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ne=null,xe=null,Re=null;_.depth&&(Re=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=_.stencil?sr:_i,xe=_.stencil?gi:Jn);const be={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:s};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(be),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new vi(d.textureWidth,d.textureHeight,{format:En,type:ti,depthTexture:new Jc(d.textureWidth,d.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const ke=e.properties.get(f);ke.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function R(W){for(let ne=0;ne<W.removed.length;ne++){const xe=W.removed[ne],Re=x.indexOf(xe);Re>=0&&(x[Re]=null,w[Re].disconnect(xe))}for(let ne=0;ne<W.added.length;ne++){const xe=W.added[ne];let Re=x.indexOf(xe);if(Re===-1){for(let ke=0;ke<w.length;ke++)if(ke>=x.length){x.push(xe),Re=ke;break}else if(x[ke]===null){x[ke]=xe,Re=ke;break}if(Re===-1)break}const be=w[Re];be&&be.connect(xe)}}const z=new U,k=new U;function Z(W,ne,xe){z.setFromMatrixPosition(ne.matrixWorld),k.setFromMatrixPosition(xe.matrixWorld);const Re=z.distanceTo(k),be=ne.projectionMatrix.elements,ke=xe.projectionMatrix.elements,$e=be[14]/(be[10]-1),Ce=be[14]/(be[10]+1),Ve=(be[9]+1)/be[5],C=(be[9]-1)/be[5],fe=(be[8]-1)/be[0],V=(ke[8]+1)/ke[0],ce=$e*fe,J=$e*V,Le=Re/(-fe+V),ve=Le*-fe;ne.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(ve),W.translateZ(Le),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const S=$e+Le,y=Ce+Le,O=ce-ve,oe=J+(Re-ve),re=Ve*Ce/y*S,ie=C*Ce/y*S;W.projectionMatrix.makePerspective(O,oe,re,ie,S,y),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function q(W,ne){ne===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ne.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;v.near=A.near=T.near=W.near,v.far=A.far=T.far=W.far,(b!==v.near||I!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),b=v.near,I=v.far);const ne=W.parent,xe=v.cameras;q(v,ne);for(let Re=0;Re<xe.length;Re++)q(xe[Re],ne);xe.length===2?Z(v,T,A):v.projectionMatrix.copy(T.projectionMatrix),Y(W,v,ne)};function Y(W,ne,xe){xe===null?W.matrix.copy(ne.matrixWorld):(W.matrix.copy(xe.matrixWorld),W.matrix.invert(),W.matrix.multiply(ne.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ne.projectionMatrix),W.projectionMatrixInverse.copy(ne.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ur*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)};let ee=null;function te(W,ne){if(h=ne.getViewerPose(c||a),g=ne,h!==null){const xe=h.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let Re=!1;xe.length!==v.cameras.length&&(v.cameras.length=0,Re=!0);for(let be=0;be<xe.length;be++){const ke=xe[be];let $e=null;if(p!==null)$e=p.getViewport(ke);else{const Ve=u.getViewSubImage(d,ke);$e=Ve.viewport,be===0&&(e.setRenderTargetTextures(f,Ve.colorTexture,d.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(f))}let Ce=j[be];Ce===void 0&&(Ce=new an,Ce.layers.enable(be),Ce.viewport=new kt,j[be]=Ce),Ce.matrix.fromArray(ke.transform.matrix),Ce.matrix.decompose(Ce.position,Ce.quaternion,Ce.scale),Ce.projectionMatrix.fromArray(ke.projectionMatrix),Ce.projectionMatrixInverse.copy(Ce.projectionMatrix).invert(),Ce.viewport.set($e.x,$e.y,$e.width,$e.height),be===0&&(v.matrix.copy(Ce.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),Re===!0&&v.cameras.push(Ce)}}for(let xe=0;xe<w.length;xe++){const Re=x[xe],be=w[xe];Re!==null&&be!==void 0&&be.update(Re,ne,c||a)}ee&&ee(W,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}const le=new jc;le.setAnimationLoop(te),this.setAnimationLoop=function(W){ee=W},this.dispose=function(){}}}function t_(n,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,qc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,w,x,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(m,f):f.isMeshToonMaterial?(s(m,f),u(m,f)):f.isMeshPhongMaterial?(s(m,f),h(m,f)):f.isMeshStandardMaterial?(s(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),_(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,w,x):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===jt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===jt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const w=e.get(f).envMap;if(w&&(m.envMap.value=w,m.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const x=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*x,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,w,x){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*w,m.scale.value=x*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,w){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===jt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=w.texture,m.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function _(m,f){const w=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(w.matrixWorld),m.nearDistance.value=w.shadow.camera.near,m.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function n_(n,e,t,i){let r={},s={},a=[];const o=t.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(w,x){const M=x.program;i.uniformBlockBinding(w,M)}function c(w,x){let M=r[w.id];M===void 0&&(g(w),M=h(w),r[w.id]=M,w.addEventListener("dispose",m));const D=x.program;i.updateUBOMapping(w,D);const T=e.render.frame;s[w.id]!==T&&(d(w),s[w.id]=T)}function h(w){const x=u();w.__bindingPointIndex=x;const M=n.createBuffer(),D=w.__size,T=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,D,T),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,M),M}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const x=r[w.id],M=w.uniforms,D=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let T=0,A=M.length;T<A;T++){const j=Array.isArray(M[T])?M[T]:[M[T]];for(let v=0,b=j.length;v<b;v++){const I=j[v];if(p(I,T,v,D)===!0){const F=I.__offset,Q=Array.isArray(I.value)?I.value:[I.value];let R=0;for(let z=0;z<Q.length;z++){const k=Q[z],Z=_(k);typeof k=="number"||typeof k=="boolean"?(I.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,F+R,I.__data)):k.isMatrix3?(I.__data[0]=k.elements[0],I.__data[1]=k.elements[1],I.__data[2]=k.elements[2],I.__data[3]=0,I.__data[4]=k.elements[3],I.__data[5]=k.elements[4],I.__data[6]=k.elements[5],I.__data[7]=0,I.__data[8]=k.elements[6],I.__data[9]=k.elements[7],I.__data[10]=k.elements[8],I.__data[11]=0):(k.toArray(I.__data,R),R+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(w,x,M,D){const T=w.value,A=x+"_"+M;if(D[A]===void 0)return typeof T=="number"||typeof T=="boolean"?D[A]=T:D[A]=T.clone(),!0;{const j=D[A];if(typeof T=="number"||typeof T=="boolean"){if(j!==T)return D[A]=T,!0}else if(j.equals(T)===!1)return j.copy(T),!0}return!1}function g(w){const x=w.uniforms;let M=0;const D=16;for(let A=0,j=x.length;A<j;A++){const v=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,I=v.length;b<I;b++){const F=v[b],Q=Array.isArray(F.value)?F.value:[F.value];for(let R=0,z=Q.length;R<z;R++){const k=Q[R],Z=_(k),q=M%D;q!==0&&D-q<Z.boundary&&(M+=D-q),F.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=Z.storage}}}const T=M%D;return T>0&&(M+=D-T),w.__size=M,w.__cache={},this}function _(w){const x={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(x.boundary=4,x.storage=4):w.isVector2?(x.boundary=8,x.storage=8):w.isVector3||w.isColor?(x.boundary=16,x.storage=12):w.isVector4?(x.boundary=16,x.storage=16):w.isMatrix3?(x.boundary=48,x.storage=48):w.isMatrix4?(x.boundary=64,x.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),x}function m(w){const x=w.target;x.removeEventListener("dispose",m);const M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(r[x.id]),delete r[x.id],delete s[x.id]}function f(){for(const w in r)n.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:l,update:c,dispose:f}}class Jo{constructor(e={}){const{canvas:t=Kf(),context:i=null,depth:r=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const f=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ht,this._useLegacyLights=!1,this.toneMapping=ei,this.toneMappingExposure=1;const x=this;let M=!1,D=0,T=0,A=null,j=-1,v=null;const b=new kt,I=new kt;let F=null;const Q=new rt(0);let R=0,z=t.width,k=t.height,Z=1,q=null,Y=null;const ee=new kt(0,0,z,k),te=new kt(0,0,z,k);let le=!1;const W=new jo;let ne=!1,xe=!1,Re=null;const be=new Rt,ke=new he,$e=new U,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return A===null?Z:1}let C=i;function fe(E,N){for(let G=0;G<E.length;G++){const X=E[G],H=t.getContext(X,N);if(H!==null)return H}return null}try{const E={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Vo}`),t.addEventListener("webglcontextlost",de,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",me,!1),C===null){const N=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&N.shift(),C=fe(N,E),C===null)throw fe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&C instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),C.getShaderPrecisionFormat===void 0&&(C.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let V,ce,J,Le,ve,S,y,O,oe,re,ie,Te,ge,Se,Ue,Be,se,ot,Ae,He,we,Ee,Ye,at;function yt(){V=new f0(C),ce=new o0(C,V,e),V.init(ce),Ee=new Jg(C,V,ce),J=new jg(C,V,ce),Le=new m0(C),ve=new Ng,S=new Zg(C,V,J,ve,ce,Ee,Le),y=new l0(x),O=new u0(x),oe=new bd(C,ce),Ye=new r0(C,V,oe,ce),re=new d0(C,oe,Le,Ye),ie=new v0(C,re,oe,Le),Ae=new x0(C,ce,S),Be=new a0(ve),Te=new Ig(x,y,O,V,ce,Ye,Be),ge=new t_(x,ve),Se=new Og,Ue=new Vg(V,ce),ot=new i0(x,y,O,J,ie,d,l),se=new Yg(x,ie,ce),at=new n_(C,Le,ce,J),He=new s0(C,V,Le,ce),we=new p0(C,V,Le,ce),Le.programs=Te.programs,x.capabilities=ce,x.extensions=V,x.properties=ve,x.renderLists=Se,x.shadowMap=se,x.state=J,x.info=Le}yt();const Je=new e_(x,C);this.xr=Je,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const E=V.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=V.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(E){E!==void 0&&(Z=E,this.setSize(z,k,!1))},this.getSize=function(E){return E.set(z,k)},this.setSize=function(E,N,G=!0){if(Je.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=E,k=N,t.width=Math.floor(E*Z),t.height=Math.floor(N*Z),G===!0&&(t.style.width=E+"px",t.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(z*Z,k*Z).floor()},this.setDrawingBufferSize=function(E,N,G){z=E,k=N,Z=G,t.width=Math.floor(E*G),t.height=Math.floor(N*G),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(b)},this.getViewport=function(E){return E.copy(ee)},this.setViewport=function(E,N,G,X){E.isVector4?ee.set(E.x,E.y,E.z,E.w):ee.set(E,N,G,X),J.viewport(b.copy(ee).multiplyScalar(Z).floor())},this.getScissor=function(E){return E.copy(te)},this.setScissor=function(E,N,G,X){E.isVector4?te.set(E.x,E.y,E.z,E.w):te.set(E,N,G,X),J.scissor(I.copy(te).multiplyScalar(Z).floor())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){J.setScissorTest(le=E)},this.setOpaqueSort=function(E){q=E},this.setTransparentSort=function(E){Y=E},this.getClearColor=function(E){return E.copy(ot.getClearColor())},this.setClearColor=function(){ot.setClearColor.apply(ot,arguments)},this.getClearAlpha=function(){return ot.getClearAlpha()},this.setClearAlpha=function(){ot.setClearAlpha.apply(ot,arguments)},this.clear=function(E=!0,N=!0,G=!0){let X=0;if(E){let H=!1;if(A!==null){const ye=A.texture.format;H=ye===Uc||ye===Dc||ye===Lc}if(H){const ye=A.texture.type,Pe=ye===ti||ye===Jn||ye===Wo||ye===gi||ye===Cc||ye===Pc,Fe=ot.getClearColor(),ze=ot.getClearAlpha(),Ke=Fe.r,Ge=Fe.g,Xe=Fe.b;Pe?(p[0]=Ke,p[1]=Ge,p[2]=Xe,p[3]=ze,C.clearBufferuiv(C.COLOR,0,p)):(g[0]=Ke,g[1]=Ge,g[2]=Xe,g[3]=ze,C.clearBufferiv(C.COLOR,0,g))}else X|=C.COLOR_BUFFER_BIT}N&&(X|=C.DEPTH_BUFFER_BIT),G&&(X|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",de,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",me,!1),Se.dispose(),Ue.dispose(),ve.dispose(),y.dispose(),O.dispose(),ie.dispose(),Ye.dispose(),at.dispose(),Te.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",Mt),Je.removeEventListener("sessionend",ct),Re&&(Re.dispose(),Re=null),St.stop()};function de(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=Le.autoReset,N=se.enabled,G=se.autoUpdate,X=se.needsUpdate,H=se.type;yt(),Le.autoReset=E,se.enabled=N,se.autoUpdate=G,se.needsUpdate=X,se.type=H}function me(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function _e(E){const N=E.target;N.removeEventListener("dispose",_e),Oe(N)}function Oe(E){Ne(E),ve.remove(E)}function Ne(E){const N=ve.get(E).programs;N!==void 0&&(N.forEach(function(G){Te.releaseProgram(G)}),E.isShaderMaterial&&Te.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,G,X,H,ye){N===null&&(N=Ce);const Pe=H.isMesh&&H.matrixWorld.determinant()<0,Fe=Tn(E,N,G,X,H);J.setMaterial(X,Pe);let ze=G.index,Ke=1;if(X.wireframe===!0){if(ze=re.getWireframeAttribute(G),ze===void 0)return;Ke=2}const Ge=G.drawRange,Xe=G.attributes.position;let bt=Ge.start*Ke,Gt=(Ge.start+Ge.count)*Ke;ye!==null&&(bt=Math.max(bt,ye.start*Ke),Gt=Math.min(Gt,(ye.start+ye.count)*Ke)),ze!==null?(bt=Math.max(bt,0),Gt=Math.min(Gt,ze.count)):Xe!=null&&(bt=Math.max(bt,0),Gt=Math.min(Gt,Xe.count));const xt=Gt-bt;if(xt<0||xt===1/0)return;Ye.setup(H,X,Fe,G,ze);let cn,_t=He;if(ze!==null&&(cn=oe.get(ze),_t=we,_t.setIndex(cn)),H.isMesh)X.wireframe===!0?(J.setLineWidth(X.wireframeLinewidth*Ve()),_t.setMode(C.LINES)):_t.setMode(C.TRIANGLES);else if(H.isLine){let qe=X.linewidth;qe===void 0&&(qe=1),J.setLineWidth(qe*Ve()),H.isLineSegments?_t.setMode(C.LINES):H.isLineLoop?_t.setMode(C.LINE_LOOP):_t.setMode(C.LINE_STRIP)}else H.isPoints?_t.setMode(C.POINTS):H.isSprite&&_t.setMode(C.TRIANGLES);if(H.isBatchedMesh)_t.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else if(H.isInstancedMesh)_t.renderInstances(bt,xt,H.count);else if(G.isInstancedBufferGeometry){const qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,hr=Math.min(G.instanceCount,qe);_t.renderInstances(bt,xt,hr)}else _t.render(bt,xt)};function ut(E,N,G){E.transparent===!0&&E.side===Yt&&E.forceSinglePass===!1?(E.side=jt,E.needsUpdate=!0,ii(E,N,G),E.side=ni,E.needsUpdate=!0,ii(E,N,G),E.side=Yt):ii(E,N,G)}this.compile=function(E,N,G=null){G===null&&(G=E),m=Ue.get(G),m.init(),w.push(m),G.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),E!==G&&E.traverseVisible(function(H){H.isLight&&H.layers.test(N.layers)&&(m.pushLight(H),H.castShadow&&m.pushShadow(H))}),m.setupLights(x._useLegacyLights);const X=new Set;return E.traverse(function(H){const ye=H.material;if(ye)if(Array.isArray(ye))for(let Pe=0;Pe<ye.length;Pe++){const Fe=ye[Pe];ut(Fe,G,H),X.add(Fe)}else ut(ye,G,H),X.add(ye)}),w.pop(),m=null,X},this.compileAsync=function(E,N,G=null){const X=this.compile(E,N,G);return new Promise(H=>{function ye(){if(X.forEach(function(Pe){ve.get(Pe).currentProgram.isReady()&&X.delete(Pe)}),X.size===0){H(E);return}setTimeout(ye,10)}V.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let lt=null;function At(E){lt&&lt(E)}function Mt(){St.stop()}function ct(){St.start()}const St=new jc;St.setAnimationLoop(At),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(E){lt=E,Je.setAnimationLoop(E),E===null?St.stop():St.start()},Je.addEventListener("sessionstart",Mt),Je.addEventListener("sessionend",ct),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(N),N=Je.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,A),m=Ue.get(E,w.length),m.init(),w.push(m),be.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),W.setFromProjectionMatrix(be),xe=this.localClippingEnabled,ne=Be.init(this.clippingPlanes,xe),_=Se.get(E,f.length),_.init(),f.push(_),Ut(E,N,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(q,Y),this.info.render.frame++,ne===!0&&Be.beginShadows();const G=m.state.shadowsArray;if(se.render(G,E,N),ne===!0&&Be.endShadows(),this.info.autoReset===!0&&this.info.reset(),ot.render(_,E),m.setupLights(x._useLegacyLights),N.isArrayCamera){const X=N.cameras;for(let H=0,ye=X.length;H<ye;H++){const Pe=X[H];ln(_,E,Pe,Pe.viewport)}}else ln(_,E,N);A!==null&&(S.updateMultisampleRenderTarget(A),S.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(x,E,N),Ye.resetDefaultState(),j=-1,v=null,w.pop(),w.length>0?m=w[w.length-1]:m=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Ut(E,N,G,X){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)G=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||W.intersectsSprite(E)){X&&$e.setFromMatrixPosition(E.matrixWorld).applyMatrix4(be);const Pe=ie.update(E),Fe=E.material;Fe.visible&&_.push(E,Pe,Fe,G,$e.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||W.intersectsObject(E))){const Pe=ie.update(E),Fe=E.material;if(X&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),$e.copy(E.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),$e.copy(Pe.boundingSphere.center)),$e.applyMatrix4(E.matrixWorld).applyMatrix4(be)),Array.isArray(Fe)){const ze=Pe.groups;for(let Ke=0,Ge=ze.length;Ke<Ge;Ke++){const Xe=ze[Ke],bt=Fe[Xe.materialIndex];bt&&bt.visible&&_.push(E,Pe,bt,G,$e.z,Xe)}}else Fe.visible&&_.push(E,Pe,Fe,G,$e.z,null)}}const ye=E.children;for(let Pe=0,Fe=ye.length;Pe<Fe;Pe++)Ut(ye[Pe],N,G,X)}function ln(E,N,G,X){const H=E.opaque,ye=E.transmissive,Pe=E.transparent;m.setupLightsView(G),ne===!0&&Be.setGlobalState(x.clippingPlanes,G),ye.length>0&&xn(H,ye,N,G),X&&J.viewport(b.copy(X)),H.length>0&&Si(H,N,G),ye.length>0&&Si(ye,N,G),Pe.length>0&&Si(Pe,N,G),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function xn(E,N,G,X){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const ye=ce.isWebGL2;Re===null&&(Re=new vi(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")?Dr:ti,minFilter:Lr,samples:ye?4:0})),x.getDrawingBufferSize(ke),ye?Re.setSize(ke.x,ke.y):Re.setSize(Ts(ke.x),Ts(ke.y));const Pe=x.getRenderTarget();x.setRenderTarget(Re),x.getClearColor(Q),R=x.getClearAlpha(),R<1&&x.setClearColor(16777215,.5),x.clear();const Fe=x.toneMapping;x.toneMapping=ei,Si(E,G,X),S.updateMultisampleRenderTarget(Re),S.updateRenderTargetMipmap(Re);let ze=!1;for(let Ke=0,Ge=N.length;Ke<Ge;Ke++){const Xe=N[Ke],bt=Xe.object,Gt=Xe.geometry,xt=Xe.material,cn=Xe.group;if(xt.side===Yt&&bt.layers.test(X.layers)){const _t=xt.side;xt.side=jt,xt.needsUpdate=!0,bi(bt,G,X,Gt,xt,cn),xt.side=_t,xt.needsUpdate=!0,ze=!0}}ze===!0&&(S.updateMultisampleRenderTarget(Re),S.updateRenderTargetMipmap(Re)),x.setRenderTarget(Pe),x.setClearColor(Q,R),x.toneMapping=Fe}function Si(E,N,G){const X=N.isScene===!0?N.overrideMaterial:null;for(let H=0,ye=E.length;H<ye;H++){const Pe=E[H],Fe=Pe.object,ze=Pe.geometry,Ke=X===null?Pe.material:X,Ge=Pe.group;Fe.layers.test(G.layers)&&bi(Fe,N,G,ze,Ke,Ge)}}function bi(E,N,G,X,H,ye){E.onBeforeRender(x,N,G,X,H,ye),E.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),H.onBeforeRender(x,N,G,X,E,ye),H.transparent===!0&&H.side===Yt&&H.forceSinglePass===!1?(H.side=jt,H.needsUpdate=!0,x.renderBufferDirect(G,N,X,H,E,ye),H.side=ni,H.needsUpdate=!0,x.renderBufferDirect(G,N,X,H,E,ye),H.side=Yt):x.renderBufferDirect(G,N,X,H,E,ye),E.onAfterRender(x,N,G,X,H,ye)}function ii(E,N,G){N.isScene!==!0&&(N=Ce);const X=ve.get(E),H=m.state.lights,ye=m.state.shadowsArray,Pe=H.state.version,Fe=Te.getParameters(E,H.state,ye,N,G),ze=Te.getProgramCacheKey(Fe);let Ke=X.programs;X.environment=E.isMeshStandardMaterial?N.environment:null,X.fog=N.fog,X.envMap=(E.isMeshStandardMaterial?O:y).get(E.envMap||X.environment),Ke===void 0&&(E.addEventListener("dispose",_e),Ke=new Map,X.programs=Ke);let Ge=Ke.get(ze);if(Ge!==void 0){if(X.currentProgram===Ge&&X.lightsStateVersion===Pe)return wi(E,Fe),Ge}else Fe.uniforms=Te.getUniforms(E),E.onBuild(G,Fe,x),E.onBeforeCompile(Fe,x),Ge=Te.acquireProgram(Fe,ze),Ke.set(ze,Ge),X.uniforms=Fe.uniforms;const Xe=X.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Xe.clippingPlanes=Be.uniform),wi(E,Fe),X.needsLights=zs(E),X.lightsStateVersion=Pe,X.needsLights&&(Xe.ambientLightColor.value=H.state.ambient,Xe.lightProbe.value=H.state.probe,Xe.directionalLights.value=H.state.directional,Xe.directionalLightShadows.value=H.state.directionalShadow,Xe.spotLights.value=H.state.spot,Xe.spotLightShadows.value=H.state.spotShadow,Xe.rectAreaLights.value=H.state.rectArea,Xe.ltc_1.value=H.state.rectAreaLTC1,Xe.ltc_2.value=H.state.rectAreaLTC2,Xe.pointLights.value=H.state.point,Xe.pointLightShadows.value=H.state.pointShadow,Xe.hemisphereLights.value=H.state.hemi,Xe.directionalShadowMap.value=H.state.directionalShadowMap,Xe.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Xe.spotShadowMap.value=H.state.spotShadowMap,Xe.spotLightMatrix.value=H.state.spotLightMatrix,Xe.spotLightMap.value=H.state.spotLightMap,Xe.pointShadowMap.value=H.state.pointShadowMap,Xe.pointShadowMatrix.value=H.state.pointShadowMatrix),X.currentProgram=Ge,X.uniformsList=null,Ge}function Ei(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=ys.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function wi(E,N){const G=ve.get(E);G.outputColorSpace=N.outputColorSpace,G.batching=N.batching,G.instancing=N.instancing,G.instancingColor=N.instancingColor,G.skinning=N.skinning,G.morphTargets=N.morphTargets,G.morphNormals=N.morphNormals,G.morphColors=N.morphColors,G.morphTargetsCount=N.morphTargetsCount,G.numClippingPlanes=N.numClippingPlanes,G.numIntersection=N.numClipIntersection,G.vertexAlphas=N.vertexAlphas,G.vertexTangents=N.vertexTangents,G.toneMapping=N.toneMapping}function Tn(E,N,G,X,H){N.isScene!==!0&&(N=Ce),S.resetTextureUnits();const ye=N.fog,Pe=X.isMeshStandardMaterial?N.environment:null,Fe=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Wn,ze=(X.isMeshStandardMaterial?O:y).get(X.envMap||Pe),Ke=X.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ge=!!G.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Xe=!!G.morphAttributes.position,bt=!!G.morphAttributes.normal,Gt=!!G.morphAttributes.color;let xt=ei;X.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(xt=x.toneMapping);const cn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,_t=cn!==void 0?cn.length:0,qe=ve.get(X),hr=m.state.lights;if(ne===!0&&(xe===!0||E!==v)){const Vt=E===v&&X.id===j;Be.setState(X,E,Vt)}let pt=!1;X.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==hr.state.version||qe.outputColorSpace!==Fe||H.isBatchedMesh&&qe.batching===!1||!H.isBatchedMesh&&qe.batching===!0||H.isInstancedMesh&&qe.instancing===!1||!H.isInstancedMesh&&qe.instancing===!0||H.isSkinnedMesh&&qe.skinning===!1||!H.isSkinnedMesh&&qe.skinning===!0||H.isInstancedMesh&&qe.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&qe.instancingColor===!1&&H.instanceColor!==null||qe.envMap!==ze||X.fog===!0&&qe.fog!==ye||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Be.numPlanes||qe.numIntersection!==Be.numIntersection)||qe.vertexAlphas!==Ke||qe.vertexTangents!==Ge||qe.morphTargets!==Xe||qe.morphNormals!==bt||qe.morphColors!==Gt||qe.toneMapping!==xt||ce.isWebGL2===!0&&qe.morphTargetsCount!==_t)&&(pt=!0):(pt=!0,qe.__version=X.version);let An=qe.currentProgram;pt===!0&&(An=ii(X,N,H));let ur=!1,hn=!1,fr=!1;const Ct=An.getUniforms(),Rn=qe.uniforms;if(J.useProgram(An.program)&&(ur=!0,hn=!0,fr=!0),X.id!==j&&(j=X.id,hn=!0),ur||v!==E){Ct.setValue(C,"projectionMatrix",E.projectionMatrix),Ct.setValue(C,"viewMatrix",E.matrixWorldInverse);const Vt=Ct.map.cameraPosition;Vt!==void 0&&Vt.setValue(C,$e.setFromMatrixPosition(E.matrixWorld)),ce.logarithmicDepthBuffer&&Ct.setValue(C,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&Ct.setValue(C,"isOrthographic",E.isOrthographicCamera===!0),v!==E&&(v=E,hn=!0,fr=!0)}if(H.isSkinnedMesh){Ct.setOptional(C,H,"bindMatrix"),Ct.setOptional(C,H,"bindMatrixInverse");const Vt=H.skeleton;Vt&&(ce.floatVertexTextures?(Vt.boneTexture===null&&Vt.computeBoneTexture(),Ct.setValue(C,"boneTexture",Vt.boneTexture,S)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}H.isBatchedMesh&&(Ct.setOptional(C,H,"batchingTexture"),Ct.setValue(C,"batchingTexture",H._matricesTexture,S));const ri=G.morphAttributes;if((ri.position!==void 0||ri.normal!==void 0||ri.color!==void 0&&ce.isWebGL2===!0)&&Ae.update(H,G,An),(hn||qe.receiveShadow!==H.receiveShadow)&&(qe.receiveShadow=H.receiveShadow,Ct.setValue(C,"receiveShadow",H.receiveShadow)),X.isMeshGouraudMaterial&&X.envMap!==null&&(Rn.envMap.value=ze,Rn.flipEnvMap.value=ze.isCubeTexture&&ze.isRenderTargetTexture===!1?-1:1),hn&&(Ct.setValue(C,"toneMappingExposure",x.toneMappingExposure),qe.needsLights&&kr(Rn,fr),ye&&X.fog===!0&&ge.refreshFogUniforms(Rn,ye),ge.refreshMaterialUniforms(Rn,X,Z,k,Re),ys.upload(C,Ei(qe),Rn,S)),X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(ys.upload(C,Ei(qe),Rn,S),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&Ct.setValue(C,"center",H.center),Ct.setValue(C,"modelViewMatrix",H.modelViewMatrix),Ct.setValue(C,"normalMatrix",H.normalMatrix),Ct.setValue(C,"modelMatrix",H.matrixWorld),X.isShaderMaterial||X.isRawShaderMaterial){const Vt=X.uniformsGroups;for(let un=0,Br=Vt.length;un<Br;un++)if(ce.isWebGL2){const Hr=Vt[un];at.update(Hr,An),at.bind(Hr,An)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return An}function kr(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function zs(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,N,G){ve.get(E.texture).__webglTexture=N,ve.get(E.depthTexture).__webglTexture=G;const X=ve.get(E);X.__hasExternalTextures=!0,X.__hasExternalTextures&&(X.__autoAllocateDepthBuffer=G===void 0,X.__autoAllocateDepthBuffer||V.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),X.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,N){const G=ve.get(E);G.__webglFramebuffer=N,G.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(E,N=0,G=0){A=E,D=N,T=G;let X=!0,H=null,ye=!1,Pe=!1;if(E){const ze=ve.get(E);ze.__useDefaultFramebuffer!==void 0?(J.bindFramebuffer(C.FRAMEBUFFER,null),X=!1):ze.__webglFramebuffer===void 0?S.setupRenderTarget(E):ze.__hasExternalTextures&&S.rebindTextures(E,ve.get(E.texture).__webglTexture,ve.get(E.depthTexture).__webglTexture);const Ke=E.texture;(Ke.isData3DTexture||Ke.isDataArrayTexture||Ke.isCompressedArrayTexture)&&(Pe=!0);const Ge=ve.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ge[N])?H=Ge[N][G]:H=Ge[N],ye=!0):ce.isWebGL2&&E.samples>0&&S.useMultisampledRTT(E)===!1?H=ve.get(E).__webglMultisampledFramebuffer:Array.isArray(Ge)?H=Ge[G]:H=Ge,b.copy(E.viewport),I.copy(E.scissor),F=E.scissorTest}else b.copy(ee).multiplyScalar(Z).floor(),I.copy(te).multiplyScalar(Z).floor(),F=le;if(J.bindFramebuffer(C.FRAMEBUFFER,H)&&ce.drawBuffers&&X&&J.drawBuffers(E,H),J.viewport(b),J.scissor(I),J.setScissorTest(F),ye){const ze=ve.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,ze.__webglTexture,G)}else if(Pe){const ze=ve.get(E.texture),Ke=N||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,ze.__webglTexture,G||0,Ke)}j=-1},this.readRenderTargetPixels=function(E,N,G,X,H,ye,Pe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Fe=ve.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Fe=Fe[Pe]),Fe){J.bindFramebuffer(C.FRAMEBUFFER,Fe);try{const ze=E.texture,Ke=ze.format,Ge=ze.type;if(Ke!==En&&Ee.convert(Ke)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Xe=Ge===Dr&&(V.has("EXT_color_buffer_half_float")||ce.isWebGL2&&V.has("EXT_color_buffer_float"));if(Ge!==ti&&Ee.convert(Ge)!==C.getParameter(C.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===Kn&&(ce.isWebGL2||V.has("OES_texture_float")||V.has("WEBGL_color_buffer_float")))&&!Xe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-X&&G>=0&&G<=E.height-H&&C.readPixels(N,G,X,H,Ee.convert(Ke),Ee.convert(Ge),ye)}finally{const ze=A!==null?ve.get(A).__webglFramebuffer:null;J.bindFramebuffer(C.FRAMEBUFFER,ze)}}},this.copyFramebufferToTexture=function(E,N,G=0){const X=Math.pow(2,-G),H=Math.floor(N.image.width*X),ye=Math.floor(N.image.height*X);S.setTexture2D(N,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,E.x,E.y,H,ye),J.unbindTexture()},this.copyTextureToTexture=function(E,N,G,X=0){const H=N.image.width,ye=N.image.height,Pe=Ee.convert(G.format),Fe=Ee.convert(G.type);S.setTexture2D(G,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,G.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,G.unpackAlignment),N.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,X,E.x,E.y,H,ye,Pe,Fe,N.image.data):N.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,X,E.x,E.y,N.mipmaps[0].width,N.mipmaps[0].height,Pe,N.mipmaps[0].data):C.texSubImage2D(C.TEXTURE_2D,X,E.x,E.y,Pe,Fe,N.image),X===0&&G.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),J.unbindTexture()},this.copyTextureToTexture3D=function(E,N,G,X,H=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=E.max.x-E.min.x+1,Pe=E.max.y-E.min.y+1,Fe=E.max.z-E.min.z+1,ze=Ee.convert(X.format),Ke=Ee.convert(X.type);let Ge;if(X.isData3DTexture)S.setTexture3D(X,0),Ge=C.TEXTURE_3D;else if(X.isDataArrayTexture||X.isCompressedArrayTexture)S.setTexture2DArray(X,0),Ge=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,X.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,X.unpackAlignment);const Xe=C.getParameter(C.UNPACK_ROW_LENGTH),bt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Gt=C.getParameter(C.UNPACK_SKIP_PIXELS),xt=C.getParameter(C.UNPACK_SKIP_ROWS),cn=C.getParameter(C.UNPACK_SKIP_IMAGES),_t=G.isCompressedTexture?G.mipmaps[H]:G.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,_t.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,_t.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,E.min.x),C.pixelStorei(C.UNPACK_SKIP_ROWS,E.min.y),C.pixelStorei(C.UNPACK_SKIP_IMAGES,E.min.z),G.isDataTexture||G.isData3DTexture?C.texSubImage3D(Ge,H,N.x,N.y,N.z,ye,Pe,Fe,ze,Ke,_t.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),C.compressedTexSubImage3D(Ge,H,N.x,N.y,N.z,ye,Pe,Fe,ze,_t.data)):C.texSubImage3D(Ge,H,N.x,N.y,N.z,ye,Pe,Fe,ze,Ke,_t),C.pixelStorei(C.UNPACK_ROW_LENGTH,Xe),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,bt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,xt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,cn),H===0&&X.generateMipmaps&&C.generateMipmap(Ge),J.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?S.setTextureCube(E,0):E.isData3DTexture?S.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?S.setTexture2DArray(E,0):S.setTexture2D(E,0),J.unbindTexture()},this.resetState=function(){D=0,T=0,A=null,J.reset(),Ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Xo?"display-p3":"srgb",t.unpackColorSpace=dt.workingColorSpace===Ls?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ht?xi:Nc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===xi?ht:Wn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class i_ extends Jo{}i_.prototype.isWebGL1Renderer=!0;class Ko{constructor(e,t=1,i=1e3){this.isFog=!0,this.name="",this.color=new rt(e),this.near=t,this.far=i}clone(){return new Ko(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ih extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class r_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Uo,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=Un()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Un()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Jt=new U;class Rs{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyMatrix4(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.applyNormalMatrix(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Jt.fromBufferAttribute(this,t),Jt.transformDirection(e),this.setXYZ(t,Jt.x,Jt.y,Jt.z);return this}setX(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ft(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),r=ft(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ft(t,this.array),i=ft(i,this.array),r=ft(r,this.array),s=ft(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new wn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Rs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Fo extends lr{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let $i;const xr=new U,Yi=new U,ji=new U,Zi=new he,vr=new he,rh=new Rt,ps=new U,yr=new U,ms=new U,ql=new he,bo=new he,$l=new he;class Yl extends Bt{constructor(e=new Fo){if(super(),this.isSprite=!0,this.type="Sprite",$i===void 0){$i=new en;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new r_(t,5);$i.setIndex([0,1,2,0,2,3]),$i.setAttribute("position",new Rs(i,3,0,!1)),$i.setAttribute("uv",new Rs(i,2,3,!1))}this.geometry=$i,this.material=e,this.center=new he(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Yi.setFromMatrixScale(this.matrixWorld),rh.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ji.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Yi.multiplyScalar(-ji.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const a=this.center;gs(ps.set(-.5,-.5,0),ji,a,Yi,r,s),gs(yr.set(.5,-.5,0),ji,a,Yi,r,s),gs(ms.set(.5,.5,0),ji,a,Yi,r,s),ql.set(0,0),bo.set(1,0),$l.set(1,1);let o=e.ray.intersectTriangle(ps,yr,ms,!1,xr);if(o===null&&(gs(yr.set(-.5,.5,0),ji,a,Yi,r,s),bo.set(0,1),o=e.ray.intersectTriangle(ps,ms,yr,!1,xr),o===null))return;const l=e.ray.origin.distanceTo(xr);l<e.near||l>e.far||t.push({distance:l,point:xr.clone(),uv:gn.getInterpolation(xr,ps,yr,ms,ql,bo,$l,new he),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function gs(n,e,t,i,r,s){Zi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(vr.x=s*Zi.x-r*Zi.y,vr.y=r*Zi.x+s*Zi.y):vr.copy(Zi),n.copy(e),n.x+=vr.x,n.y+=vr.y,n.applyMatrix4(rh)}class dn extends nn{constructor(e,t,i,r,s,a,o,l,c){super(e,t,i,r,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class In{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,r=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const i=this.getLengths();let r=0;const s=i.length;let a;t?a=t:a=e*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(r=Math.floor(o+(l-o)/2),c=i[r]-a,c<0)o=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===a)return r/(s-1);const h=i[r],d=i[r+1]-h,p=(a-h)/d;return(r+p)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),l=t||(a.isVector2?new he:new U);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t){const i=new U,r=[],s=[],a=[],o=new U,l=new Rt;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new U)}s[0]=new U,a[0]=new U;let c=Number.MAX_VALUE;const h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(r[p-1],r[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ft(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(r[p],s[p])}if(t===!0){let p=Math.acos(Ft(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Qo extends In{constructor(e=0,t=0,i=1,r=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t){const i=t||new he,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(a?s=0:s=r),this.aClockwise===!0&&!a&&(s===r?s=-r:s=s-r);const o=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class s_ extends Qo{constructor(e,t,i,r,s,a){super(e,t,i,i,r,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function ea(){let n=0,e=0,t=0,i=0;function r(s,a,o,l){n=s,e=o,t=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){r(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,r(a,o,d,p)},calc:function(s){const a=s*s,o=a*s;return n+e*s+t*a+i*o}}}const _s=new U,Eo=new ea,wo=new ea,To=new ea;class sh extends In{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new U){const i=t,r=this.points,s=r.length,a=(s-(this.closed?0:1))*e;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=r[(o-1)%s]:(_s.subVectors(r[0],r[1]).add(r[0]),c=_s);const u=r[o%s],d=r[(o+1)%s];if(this.closed||o+2<s?h=r[(o+2)%s]:(_s.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=_s),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),p),_=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Eo.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,m),wo.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,m),To.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Eo.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),wo.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),To.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Eo.calc(l),wo.calc(l),To.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new U().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function jl(n,e,t,i,r){const s=(i-e)*.5,a=(r-t)*.5,o=n*n,l=n*o;return(2*t-2*i+s+a)*l+(-3*t+3*i-2*s-a)*o+s*n+t}function o_(n,e){const t=1-n;return t*t*e}function a_(n,e){return 2*(1-n)*n*e}function l_(n,e){return n*n*e}function wr(n,e,t,i){return o_(n,e)+a_(n,t)+l_(n,i)}function c_(n,e){const t=1-n;return t*t*t*e}function h_(n,e){const t=1-n;return 3*t*t*n*e}function u_(n,e){return 3*(1-n)*n*n*e}function f_(n,e){return n*n*n*e}function Tr(n,e,t,i,r){return c_(n,e)+h_(n,t)+u_(n,i)+f_(n,r)}class oh extends In{constructor(e=new he,t=new he,i=new he,r=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new he){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Tr(e,r.x,s.x,a.x,o.x),Tr(e,r.y,s.y,a.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class d_ extends In{constructor(e=new U,t=new U,i=new U,r=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new U){const i=t,r=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(Tr(e,r.x,s.x,a.x,o.x),Tr(e,r.y,s.y,a.y,o.y),Tr(e,r.z,s.z,a.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class ah extends In{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class p_ extends In{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class lh extends In{constructor(e=new he,t=new he,i=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new he){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(wr(e,r.x,s.x,a.x),wr(e,r.y,s.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ch extends In{constructor(e=new U,t=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new U){const i=t,r=this.v0,s=this.v1,a=this.v2;return i.set(wr(e,r.x,s.x,a.x),wr(e,r.y,s.y,a.y),wr(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class hh extends In{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const i=t,r=this.points,s=(r.length-1)*e,a=Math.floor(s),o=s-a,l=r[a===0?a:a-1],c=r[a],h=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return i.set(jl(o,l.x,c.x,h.x,u.x),jl(o,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const r=e.points[t];this.points.push(new he().fromArray(r))}return this}}var Cs=Object.freeze({__proto__:null,ArcCurve:s_,CatmullRomCurve3:sh,CubicBezierCurve:oh,CubicBezierCurve3:d_,EllipseCurve:Qo,LineCurve:ah,LineCurve3:p_,QuadraticBezierCurve:lh,QuadraticBezierCurve3:ch,SplineCurve:hh});class m_ extends In{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Cs[i](t,e))}return this}getPoint(e,t){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const a=r[s]-i,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const a=s[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){const r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){const r=e.curves[t];this.curves.push(new Cs[r.type]().fromJSON(r))}return this}}class Zl extends m_{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const i=new ah(this.currentPoint.clone(),new he(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){const s=new lh(this.currentPoint.clone(),new he(e,t),new he(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,a){const o=new oh(this.currentPoint.clone(),new he(e,t),new he(i,r),new he(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),i=new hh(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,i,r,s,a),this}absarc(e,t,i,r,s,a){return this.absellipse(e,t,i,i,r,s,a),this}ellipse(e,t,i,r,s,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,s,a,o,l),this}absellipse(e,t,i,r,s,a,o,l){const c=new Qo(e,t,i,r,s,a,o,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class Is extends en{constructor(e=[new he(0,-.5),new he(.5,0),new he(0,.5)],t=12,i=0,r=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:r},t=Math.floor(t),r=Ft(r,0,Math.PI*2);const s=[],a=[],o=[],l=[],c=[],h=1/t,u=new U,d=new he,p=new U,g=new U,_=new U;let m=0,f=0;for(let w=0;w<=e.length-1;w++)switch(w){case 0:m=e[w+1].x-e[w].x,f=e[w+1].y-e[w].y,p.x=f*1,p.y=-m,p.z=f*0,_.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:m=e[w+1].x-e[w].x,f=e[w+1].y-e[w].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.x+=_.x,p.y+=_.y,p.z+=_.z,p.normalize(),l.push(p.x,p.y,p.z),_.copy(g)}for(let w=0;w<=t;w++){const x=i+w*h*r,M=Math.sin(x),D=Math.cos(x);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*M,u.y=e[T].y,u.z=e[T].x*D,a.push(u.x,u.y,u.z),d.x=w/t,d.y=T/(e.length-1),o.push(d.x,d.y);const A=l[3*T+0]*M,j=l[3*T+1],v=l[3*T+0]*D;c.push(A,j,v)}}for(let w=0;w<t;w++)for(let x=0;x<e.length-1;x++){const M=x+w*e.length,D=M,T=M+e.length,A=M+e.length+1,j=M+1;s.push(D,T,j),s.push(A,j,T)}this.setIndex(s),this.setAttribute("position",new gt(a,3)),this.setAttribute("uv",new gt(o,2)),this.setAttribute("normal",new gt(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.points,e.segments,e.phiStart,e.phiLength)}}class nr extends en{constructor(e=1,t=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],l=[],c=new U,h=new he;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const p=i+u/t*r;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(o,3)),this.setAttribute("uv",new gt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new nr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Et extends en{constructor(e=1,t=1,i=1,r=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],d=[],p=[];let g=0;const _=[],m=i/2;let f=0;w(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(p,2));function w(){const M=new U,D=new U;let T=0;const A=(t-e)/i;for(let j=0;j<=s;j++){const v=[],b=j/s,I=b*(t-e)+e;for(let F=0;F<=r;F++){const Q=F/r,R=Q*l+o,z=Math.sin(R),k=Math.cos(R);D.x=I*z,D.y=-b*i+m,D.z=I*k,u.push(D.x,D.y,D.z),M.set(z,A,k).normalize(),d.push(M.x,M.y,M.z),p.push(Q,1-b),v.push(g++)}_.push(v)}for(let j=0;j<r;j++)for(let v=0;v<s;v++){const b=_[v][j],I=_[v+1][j],F=_[v+1][j+1],Q=_[v][j+1];h.push(b,I,Q),h.push(I,F,Q),T+=6}c.addGroup(f,T,0),f+=T}function x(M){const D=g,T=new he,A=new U;let j=0;const v=M===!0?e:t,b=M===!0?1:-1;for(let F=1;F<=r;F++)u.push(0,m*b,0),d.push(0,b,0),p.push(.5,.5),g++;const I=g;for(let F=0;F<=r;F++){const R=F/r*l+o,z=Math.cos(R),k=Math.sin(R);A.x=v*k,A.y=m*b,A.z=v*z,u.push(A.x,A.y,A.z),d.push(0,b,0),T.x=z*.5+.5,T.y=k*.5*b+.5,p.push(T.x,T.y),g++}for(let F=0;F<r;F++){const Q=D+F,R=I+F;M===!0?h.push(R,R+1,Q):h.push(R+1,R,Q),j+=3}c.addGroup(f,j,M===!0?1:2),f+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mi extends Et{constructor(e=1,t=1,i=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,i,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new mi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class uh extends Zl{constructor(e){super(e),this.uuid=Un(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){const r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){const r=e.holes[t];this.holes.push(new Zl().fromJSON(r))}return this}}const g_={triangulate:function(n,e,t=2){const i=e&&e.length,r=i?e[0]*t:n.length;let s=fh(n,0,r,t,!0);const a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,p;if(i&&(s=M_(n,e,s,t)),n.length>80*t){o=c=n[0],l=h=n[1];for(let g=t;g<r;g+=t)u=n[g],d=n[g+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return Ir(s,a,t,o,l,p,0),a}};function fh(n,e,t,i,r){let s,a;if(r===D_(n,e,t,i)>0)for(s=e;s<t;s+=i)a=Jl(s,n[s],n[s+1],a);else for(s=t-i;s>=e;s-=i)a=Jl(s,n[s],n[s+1],a);return a&&Ns(a,a.next)&&(zr(a),a=a.next),a}function Mi(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(Ns(t,t.next)||Tt(t.prev,t,t.next)===0)){if(zr(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Ir(n,e,t,i,r,s,a){if(!n)return;!a&&s&&T_(n,i,r,s);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,s?x_(n,i,r,s):__(n)){e.push(l.i/t|0),e.push(n.i/t|0),e.push(c.i/t|0),zr(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=v_(Mi(n),e,t),Ir(n,e,t,i,r,s,2)):a===2&&y_(n,e,t,i,r,s):Ir(Mi(n),e,t,i,r,s,1);break}}}function __(n){const e=n.prev,t=n,i=n.next;if(Tt(e,t,i)>=0)return!1;const r=e.x,s=t.x,a=i.x,o=e.y,l=t.y,c=i.y,h=r<s?r<a?r:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=r>s?r>a?r:a:s>a?s:a,p=o>l?o>c?o:c:l>c?l:c;let g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=p&&Qi(r,o,s,l,a,c,g.x,g.y)&&Tt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function x_(n,e,t,i){const r=n.prev,s=n,a=n.next;if(Tt(r,s,a)>=0)return!1;const o=r.x,l=s.x,c=a.x,h=r.y,u=s.y,d=a.y,p=o<l?o<c?o:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,f=ko(p,g,e,t,i),w=ko(_,m,e,t,i);let x=n.prevZ,M=n.nextZ;for(;x&&x.z>=f&&M&&M.z<=w;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&Qi(o,h,l,u,c,d,x.x,x.y)&&Tt(x.prev,x,x.next)>=0||(x=x.prevZ,M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&Qi(o,h,l,u,c,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;x&&x.z>=f;){if(x.x>=p&&x.x<=_&&x.y>=g&&x.y<=m&&x!==r&&x!==a&&Qi(o,h,l,u,c,d,x.x,x.y)&&Tt(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;M&&M.z<=w;){if(M.x>=p&&M.x<=_&&M.y>=g&&M.y<=m&&M!==r&&M!==a&&Qi(o,h,l,u,c,d,M.x,M.y)&&Tt(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function v_(n,e,t){let i=n;do{const r=i.prev,s=i.next.next;!Ns(r,s)&&dh(r,i,i.next,s)&&Nr(r,s)&&Nr(s,r)&&(e.push(r.i/t|0),e.push(i.i/t|0),e.push(s.i/t|0),zr(i),zr(i.next),i=n=s),i=i.next}while(i!==n);return Mi(i)}function y_(n,e,t,i,r,s){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&C_(a,o)){let l=ph(a,o);a=Mi(a,a.next),l=Mi(l,l.next),Ir(a,e,t,i,r,s,0),Ir(l,e,t,i,r,s,0);return}o=o.next}a=a.next}while(a!==n)}function M_(n,e,t,i){const r=[];let s,a,o,l,c;for(s=0,a=e.length;s<a;s++)o=e[s]*i,l=s<a-1?e[s+1]*i:n.length,c=fh(n,o,l,i,!1),c===c.next&&(c.steiner=!0),r.push(R_(c));for(r.sort(S_),s=0;s<r.length;s++)t=b_(r[s],t);return t}function S_(n,e){return n.x-e.x}function b_(n,e){const t=E_(n,e);if(!t)return e;const i=ph(t,n);return Mi(i,i.next),Mi(t,t.next)}function E_(n,e){let t=e,i=-1/0,r;const s=n.x,a=n.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=s&&d>i&&(i=d,r=t.x<t.next.x?t:t.next,d===s))return r}t=t.next}while(t!==e);if(!r)return null;const o=r,l=r.x,c=r.y;let h=1/0,u;t=r;do s>=t.x&&t.x>=l&&s!==t.x&&Qi(a<c?s:i,a,l,c,a<c?i:s,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(s-t.x),Nr(t,n)&&(u<h||u===h&&(t.x>r.x||t.x===r.x&&w_(r,t)))&&(r=t,h=u)),t=t.next;while(t!==o);return r}function w_(n,e){return Tt(n.prev,n,e.prev)<0&&Tt(e.next,n,n.next)<0}function T_(n,e,t,i){let r=n;do r.z===0&&(r.z=ko(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,A_(r)}function A_(n){let e,t,i,r,s,a,o,l,c=1;do{for(t=n,n=null,s=null,a=0;t;){for(a++,i=t,o=0,e=0;e<c&&(o++,i=i.nextZ,!!i);e++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||t.z<=i.z)?(r=t,t=t.nextZ,o--):(r=i,i=i.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;t=i}s.nextZ=null,c*=2}while(a>1);return n}function ko(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function R_(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Qi(n,e,t,i,r,s,a,o){return(r-a)*(e-o)>=(n-a)*(s-o)&&(n-a)*(i-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(r-a)*(i-o)}function C_(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!P_(n,e)&&(Nr(n,e)&&Nr(e,n)&&L_(n,e)&&(Tt(n.prev,n,e.prev)||Tt(n,e.prev,e))||Ns(n,e)&&Tt(n.prev,n,n.next)>0&&Tt(e.prev,e,e.next)>0)}function Tt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function Ns(n,e){return n.x===e.x&&n.y===e.y}function dh(n,e,t,i){const r=vs(Tt(n,e,t)),s=vs(Tt(n,e,i)),a=vs(Tt(t,i,n)),o=vs(Tt(t,i,e));return!!(r!==s&&a!==o||r===0&&xs(n,t,e)||s===0&&xs(n,i,e)||a===0&&xs(t,n,i)||o===0&&xs(t,e,i))}function xs(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function vs(n){return n>0?1:n<0?-1:0}function P_(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&dh(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Nr(n,e){return Tt(n.prev,n,n.next)<0?Tt(n,e,n.next)>=0&&Tt(n,n.prev,e)>=0:Tt(n,e,n.prev)<0||Tt(n,n.next,e)<0}function L_(n,e){let t=n,i=!1;const r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function ph(n,e){const t=new Bo(n.i,n.x,n.y),i=new Bo(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function Jl(n,e,t,i){const r=new Bo(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function zr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Bo(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function D_(n,e,t,i){let r=0;for(let s=e,a=t-i;s<t;s+=i)r+=(n[a]-n[s])*(n[s+1]+n[a+1]),a=s;return r}class Ar{static area(e){const t=e.length;let i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return Ar.area(e)<0}static triangulateShape(e,t){const i=[],r=[],s=[];Kl(e),Ql(i,e);let a=e.length;t.forEach(Kl);for(let l=0;l<t.length;l++)r.push(a),a+=t[l].length,Ql(i,t[l]);const o=g_.triangulate(i,r);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}}function Kl(n){const e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function Ql(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}class ta extends en{constructor(e=new uh([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let o=0,l=e.length;o<l;o++){const c=e[o];a(c)}this.setAttribute("position",new gt(r,3)),this.setAttribute("uv",new gt(s,2)),this.computeVertexNormals();function a(o){const l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,p=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:p-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const f=t.extrudePath,w=t.UVGenerator!==void 0?t.UVGenerator:U_;let x,M=!1,D,T,A,j;f&&(x=f.getSpacedPoints(h),M=!0,d=!1,D=f.computeFrenetFrames(h,!1),T=new U,A=new U,j=new U),d||(m=0,p=0,g=0,_=0);const v=o.extractPoints(c);let b=v.shape;const I=v.holes;if(!Ar.isClockWise(b)){b=b.reverse();for(let C=0,fe=I.length;C<fe;C++){const V=I[C];Ar.isClockWise(V)&&(I[C]=V.reverse())}}const Q=Ar.triangulateShape(b,I),R=b;for(let C=0,fe=I.length;C<fe;C++){const V=I[C];b=b.concat(V)}function z(C,fe,V){return fe||console.error("THREE.ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(fe,V)}const k=b.length,Z=Q.length;function q(C,fe,V){let ce,J,Le;const ve=C.x-fe.x,S=C.y-fe.y,y=V.x-C.x,O=V.y-C.y,oe=ve*ve+S*S,re=ve*O-S*y;if(Math.abs(re)>Number.EPSILON){const ie=Math.sqrt(oe),Te=Math.sqrt(y*y+O*O),ge=fe.x-S/ie,Se=fe.y+ve/ie,Ue=V.x-O/Te,Be=V.y+y/Te,se=((Ue-ge)*O-(Be-Se)*y)/(ve*O-S*y);ce=ge+ve*se-C.x,J=Se+S*se-C.y;const ot=ce*ce+J*J;if(ot<=2)return new he(ce,J);Le=Math.sqrt(ot/2)}else{let ie=!1;ve>Number.EPSILON?y>Number.EPSILON&&(ie=!0):ve<-Number.EPSILON?y<-Number.EPSILON&&(ie=!0):Math.sign(S)===Math.sign(O)&&(ie=!0),ie?(ce=-S,J=ve,Le=Math.sqrt(oe)):(ce=ve,J=S,Le=Math.sqrt(oe/2))}return new he(ce/Le,J/Le)}const Y=[];for(let C=0,fe=R.length,V=fe-1,ce=C+1;C<fe;C++,V++,ce++)V===fe&&(V=0),ce===fe&&(ce=0),Y[C]=q(R[C],R[V],R[ce]);const ee=[];let te,le=Y.concat();for(let C=0,fe=I.length;C<fe;C++){const V=I[C];te=[];for(let ce=0,J=V.length,Le=J-1,ve=ce+1;ce<J;ce++,Le++,ve++)Le===J&&(Le=0),ve===J&&(ve=0),te[ce]=q(V[ce],V[Le],V[ve]);ee.push(te),le=le.concat(te)}for(let C=0;C<m;C++){const fe=C/m,V=p*Math.cos(fe*Math.PI/2),ce=g*Math.sin(fe*Math.PI/2)+_;for(let J=0,Le=R.length;J<Le;J++){const ve=z(R[J],Y[J],ce);be(ve.x,ve.y,-V)}for(let J=0,Le=I.length;J<Le;J++){const ve=I[J];te=ee[J];for(let S=0,y=ve.length;S<y;S++){const O=z(ve[S],te[S],ce);be(O.x,O.y,-V)}}}const W=g+_;for(let C=0;C<k;C++){const fe=d?z(b[C],le[C],W):b[C];M?(A.copy(D.normals[0]).multiplyScalar(fe.x),T.copy(D.binormals[0]).multiplyScalar(fe.y),j.copy(x[0]).add(A).add(T),be(j.x,j.y,j.z)):be(fe.x,fe.y,0)}for(let C=1;C<=h;C++)for(let fe=0;fe<k;fe++){const V=d?z(b[fe],le[fe],W):b[fe];M?(A.copy(D.normals[C]).multiplyScalar(V.x),T.copy(D.binormals[C]).multiplyScalar(V.y),j.copy(x[C]).add(A).add(T),be(j.x,j.y,j.z)):be(V.x,V.y,u/h*C)}for(let C=m-1;C>=0;C--){const fe=C/m,V=p*Math.cos(fe*Math.PI/2),ce=g*Math.sin(fe*Math.PI/2)+_;for(let J=0,Le=R.length;J<Le;J++){const ve=z(R[J],Y[J],ce);be(ve.x,ve.y,u+V)}for(let J=0,Le=I.length;J<Le;J++){const ve=I[J];te=ee[J];for(let S=0,y=ve.length;S<y;S++){const O=z(ve[S],te[S],ce);M?be(O.x,O.y+x[h-1].y,x[h-1].x+V):be(O.x,O.y,u+V)}}}ne(),xe();function ne(){const C=r.length/3;if(d){let fe=0,V=k*fe;for(let ce=0;ce<Z;ce++){const J=Q[ce];ke(J[2]+V,J[1]+V,J[0]+V)}fe=h+m*2,V=k*fe;for(let ce=0;ce<Z;ce++){const J=Q[ce];ke(J[0]+V,J[1]+V,J[2]+V)}}else{for(let fe=0;fe<Z;fe++){const V=Q[fe];ke(V[2],V[1],V[0])}for(let fe=0;fe<Z;fe++){const V=Q[fe];ke(V[0]+k*h,V[1]+k*h,V[2]+k*h)}}i.addGroup(C,r.length/3-C,0)}function xe(){const C=r.length/3;let fe=0;Re(R,fe),fe+=R.length;for(let V=0,ce=I.length;V<ce;V++){const J=I[V];Re(J,fe),fe+=J.length}i.addGroup(C,r.length/3-C,1)}function Re(C,fe){let V=C.length;for(;--V>=0;){const ce=V;let J=V-1;J<0&&(J=C.length-1);for(let Le=0,ve=h+m*2;Le<ve;Le++){const S=k*Le,y=k*(Le+1),O=fe+ce+S,oe=fe+J+S,re=fe+J+y,ie=fe+ce+y;$e(O,oe,re,ie)}}}function be(C,fe,V){l.push(C),l.push(fe),l.push(V)}function ke(C,fe,V){Ce(C),Ce(fe),Ce(V);const ce=r.length/3,J=w.generateTopUV(i,r,ce-3,ce-2,ce-1);Ve(J[0]),Ve(J[1]),Ve(J[2])}function $e(C,fe,V,ce){Ce(C),Ce(fe),Ce(ce),Ce(fe),Ce(V),Ce(ce);const J=r.length/3,Le=w.generateSideWallUV(i,r,J-6,J-3,J-2,J-1);Ve(Le[0]),Ve(Le[1]),Ve(Le[3]),Ve(Le[1]),Ve(Le[2]),Ve(Le[3])}function Ce(C){r.push(l[C*3+0]),r.push(l[C*3+1]),r.push(l[C*3+2])}function Ve(C){s.push(C.x),s.push(C.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return I_(t,i,e)}static fromJSON(e,t){const i=[];for(let s=0,a=e.shapes.length;s<a;s++){const o=t[e.shapes[s]];i.push(o)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new Cs[r.type]().fromJSON(r)),new ta(i,e.options)}}const U_={generateTopUV:function(n,e,t,i,r){const s=e[t*3],a=e[t*3+1],o=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new he(s,a),new he(o,l),new he(c,h)]},generateSideWallUV:function(n,e,t,i,r,s){const a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[r*3],p=e[r*3+1],g=e[r*3+2],_=e[s*3],m=e[s*3+1],f=e[s*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new he(a,1-l),new he(c,1-u),new he(d,1-g),new he(_,1-f)]:[new he(o,1-l),new he(h,1-u),new he(p,1-g),new he(m,1-f)]}};function I_(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){const s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class na extends en{constructor(e=.5,t=1,i=32,r=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:a},i=Math.max(3,i),r=Math.max(1,r);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/r,p=new U,g=new he;for(let _=0;_<=r;_++){for(let m=0;m<=i;m++){const f=s+m/i*a;p.x=u*Math.cos(f),p.y=u*Math.sin(f),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/t+1)/2,g.y=(p.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<r;_++){const m=_*(i+1);for(let f=0;f<i;f++){const w=f+m,x=w,M=w+i+1,D=w+i+2,T=w+1;o.push(x,M,T),o.push(M,D,T)}}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(c,3)),this.setAttribute("uv",new gt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new na(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vn extends en{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new U,d=new U,p=[],g=[],_=[],m=[];for(let f=0;f<=i;f++){const w=[],x=f/i;let M=0;f===0&&a===0?M=.5/t:f===i&&l===Math.PI&&(M=-.5/t);for(let D=0;D<=t;D++){const T=D/t;u.x=-e*Math.cos(r+T*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(r+T*s)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(T+M,1-x),w.push(c++)}h.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const x=h[f][w+1],M=h[f][w],D=h[f+1][w],T=h[f+1][w+1];(f!==0||a>0)&&p.push(x,M,T),(f!==i-1||l<Math.PI)&&p.push(M,D,T)}this.setIndex(p),this.setAttribute("position",new gt(g,3)),this.setAttribute("normal",new gt(_,3)),this.setAttribute("uv",new gt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ia extends en{constructor(e=new ch(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,i=1,r=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:r,closed:s};const a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new U,l=new U,c=new he;let h=new U;const u=[],d=[],p=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new gt(u,3)),this.setAttribute("normal",new gt(d,3)),this.setAttribute("uv",new gt(p,2));function _(){for(let x=0;x<t;x++)m(x);m(s===!1?t:0),w(),f()}function m(x){h=e.getPointAt(x/t,h);const M=a.normals[x],D=a.binormals[x];for(let T=0;T<=r;T++){const A=T/r*Math.PI*2,j=Math.sin(A),v=-Math.cos(A);l.x=v*M.x+j*D.x,l.y=v*M.y+j*D.y,l.z=v*M.z+j*D.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function f(){for(let x=1;x<=t;x++)for(let M=1;M<=r;M++){const D=(r+1)*(x-1)+(M-1),T=(r+1)*x+(M-1),A=(r+1)*x+M,j=(r+1)*(x-1)+M;g.push(D,T,j),g.push(T,A,j)}}function w(){for(let x=0;x<=t;x++)for(let M=0;M<=r;M++)c.x=x/t,c.y=M/r,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ia(new Cs[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class wt extends lr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new rt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class mh extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class gh extends mh{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new rt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ao=new Rt,ec=new U,tc=new U;class N_{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new jo,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new kt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(ec),tc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(tc),t.updateMatrixWorld(),Ao.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ao),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class z_ extends N_{constructor(){super(new Zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _h extends mh{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new z_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class O_{constructor(e,t,i=0,r=1/0){this.ray=new Gc(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,i=[]){return Ho(e,this,i,t),i.sort(nc),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Ho(e[r],this,i,t);return i.sort(nc),i}}function nc(n,e){return n.distance-e.distance}function Ho(n,e,t,i){if(n.layers.test(e.layers)&&n.raycast(e,t),i===!0){const r=n.children;for(let s=0,a=r.length;s<a;s++)Ho(r[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vo);function xh(n){const e=n.clientWidth||1,t=n.clientHeight||1,i=new Jo({antialias:!0});i.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),i.setSize(e,t),i.toneMapping=Tc,i.toneMappingExposure=.98,n.appendChild(i.domElement),n.style.position||(n.style.position="relative");const r=document.createElement("div");r.style.cssText='position:absolute;top:14px;left:50%;transform:translateX(-50%);padding:7px 18px;border-radius:22px;background:rgba(18,26,36,0.82);color:#eafaff;font:600 16px/1.3 "PingFang SC","Microsoft YaHei",sans-serif;letter-spacing:.5px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .35s;z-index:6;box-shadow:0 2px 10px rgba(0,0,0,.35)',n.appendChild(r);function s(P){r.textContent=P,r.style.opacity="1"}function a(){r.style.opacity="0"}const o=new ih,l=new Ko(new rt(13605470),60,380);o.fog=l;const c=new an(43,e/t,.1,3e3);c.position.set(5.4,1.1,12.5),c.lookAt(0,4.2,0);const h=[],u=new U(.62,.2,-.28).normalize();function d(){const K=document.createElement("canvas");K.width=1024,K.height=512;const $=K.getContext("2d"),ue=$.createLinearGradient(0,0,0,512);ue.addColorStop(0,"#33356a"),ue.addColorStop(.34,"#7a5570"),ue.addColorStop(.54,"#bf7148"),ue.addColorStop(.72,"#e59a4a"),ue.addColorStop(.88,"#f6c266"),ue.addColorStop(1,"#fce3a6"),$.fillStyle=ue,$.fillRect(0,0,1024,512);const De=.5+Math.atan2(u.x,u.z)/(2*Math.PI),We=.5-Math.asin(Jf.clamp(u.y,-1,1))/Math.PI,je=De*1024,et=We*512,Ze=$.createRadialGradient(je,et,0,je,et,260);Ze.addColorStop(0,"rgba(255,244,214,0.98)"),Ze.addColorStop(.14,"rgba(255,226,168,0.7)"),Ze.addColorStop(.42,"rgba(255,196,120,0.22)"),Ze.addColorStop(1,"rgba(255,196,120,0)"),$.fillStyle=Ze,$.beginPath(),$.arc(je,et,260,0,7),$.fill(),$.fillStyle="rgba(255,250,235,1)",$.beginPath(),$.arc(je,et,34,0,7),$.fill();const st=new dn(K);return st.colorSpace=ht,st.mapping=Cr,st}function p(){const K=document.createElement("canvas");K.width=2048,K.height=1024;const $=K.getContext("2d"),ue=$.createLinearGradient(0,0,0,1024);ue.addColorStop(0,"#01020a"),ue.addColorStop(.6,"#03040d"),ue.addColorStop(1,"#05060f"),$.fillStyle=ue,$.fillRect(0,0,2048,1024),$.save(),$.translate(2048*.5,1024*.42),$.rotate(-.32);const De=$.createLinearGradient(0,-150,0,150);De.addColorStop(0,"rgba(120,140,190,0)"),De.addColorStop(.5,"rgba(150,165,205,0.09)"),De.addColorStop(1,"rgba(120,140,190,0)"),$.fillStyle=De,$.fillRect(-2048,-150,2048*2,300),$.restore();for(let je=0;je<2600;je++){const et=Math.random()*2048,Ze=Math.random()*1024,st=.35+Math.random()*.5,Pt=Math.random()<.14?Math.random()<.5?"255,225,200":"205,220,255":"255,255,255";$.fillStyle=`rgba(${Pt},${st})`,$.fillRect(et,Ze,1,1)}for(let je=0;je<90;je++){const et=Math.random()*2048,Ze=Math.random()*1024,st=1+Math.random()*1.4;$.fillStyle=`rgba(255,255,255,${.8+Math.random()*.2})`,$.beginPath(),$.arc(et,Ze,st,0,7),$.fill(),$.strokeStyle=`rgba(255,255,255,${.18})`,$.lineWidth=1,$.beginPath(),$.moveTo(et-st*3,Ze),$.lineTo(et+st*3,Ze),$.moveTo(et,Ze-st*3),$.lineTo(et,Ze+st*3),$.stroke()}const We=new dn(K);return We.colorSpace=ht,We.mapping=Cr,We.anisotropy=4,We}function g(){const K=document.createElement("canvas");K.width=2048,K.height=1024;const $=K.getContext("2d"),ue=$.createLinearGradient(0,0,0,1024);ue.addColorStop(0,"#0b3f86"),ue.addColorStop(.5,"#1f78d4"),ue.addColorStop(1,"#0a3a7c"),$.fillStyle=ue,$.fillRect(0,0,2048,1024);const De=(st,Pt)=>{$.fillStyle=Pt,$.beginPath();const Ie=st.map(([mt,Lt])=>[mt*2048,Lt*1024]);$.moveTo(Ie[0][0],Ie[0][1]);for(let mt=0;mt<Ie.length;mt++){const Lt=Ie[mt],rn=Ie[(mt+1)%Ie.length];$.quadraticCurveTo(Lt[0],Lt[1],(Lt[0]+rn[0])/2,(Lt[1]+rn[1])/2)}$.closePath(),$.fill()},We="#3a7540",je="#a08a58",et="#eaf3fb";De([[.15,.3],[.22,.22],[.3,.22],[.34,.3],[.32,.4],[.27,.46],[.22,.45],[.17,.4],[.14,.34]],We),De([[.3,.55],[.36,.55],[.385,.63],[.35,.76],[.315,.84],[.3,.72],[.285,.6]],We),De([[.4,.15],[.46,.13],[.485,.19],[.45,.24],[.4,.21]],et),De([[.5,.44],[.55,.43],[.605,.5],[.6,.6],[.565,.71],[.53,.66],[.505,.56],[.495,.48]],We),De([[.49,.3],[.55,.27],[.605,.29],[.6,.36],[.55,.4],[.5,.38]],We),De([[.595,.28],[.66,.24],[.75,.25],[.82,.3],[.81,.4],[.72,.44],[.64,.42],[.6,.36]],We),De([[.66,.44],[.7,.44],[.695,.52],[.665,.5]],We),De([[.78,.64],[.86,.63],[.905,.68],[.87,.74],[.8,.73],[.775,.68]],We),De([[.5,.45],[.57,.44],[.605,.49],[.58,.53],[.51,.51]],je),De([[.6,.45],[.65,.44],[.66,.5],[.61,.5]],je),De([[.8,.66],[.87,.66],[.87,.71],[.8,.71]],je),$.fillStyle=et,$.fillRect(0,0,2048,1024*.04),$.fillRect(0,1024*.965,2048,1024*.035);const Ze=new dn(K);return Ze.colorSpace=ht,Ze.anisotropy=4,Ze}function _(){const K=document.createElement("canvas");K.width=2048,K.height=1024;const $=K.getContext("2d");$.clearRect(0,0,2048,1024);for(let De=0;De<55;De++){const We=Math.random()*2048,je=1024*.08+Math.random()*1024*.84,et=5+(Math.random()*7|0);for(let Ze=0;Ze<et;Ze++){const st=We+(Math.random()-.5)*220,Pt=je+(Math.random()-.5)*90,Ie=26+Math.random()*90,mt=10+Math.random()*26;$.fillStyle=`rgba(255,255,255,${.16+Math.random()*.42})`,$.beginPath(),$.ellipse(st,Pt,Ie,mt,Math.random()*3,0,7),$.fill()}}const ue=new dn(K);return ue.colorSpace=ht,ue.anisotropy=4,ue}const m=d();h.push(m);const f=p();h.push(f),o.background=m;let w=null,x=null;try{const P=new zo(i),B=P.fromEquirectangular(m);w=B.texture;const K=P.fromEquirectangular(f);x=K.texture,o.environment=w,h.push(B,K,P)}catch(P){console.warn("env map skipped:",P)}const M=60,D=new U(0,-M-3,-20),T=g();h.push(T);const A=new Me(new Vn(M,64,44),new wt({map:T,roughness:.92,metalness:0,emissive:1986454,emissiveIntensity:.5,fog:!1}));A.position.copy(D),A.rotation.set(-1.4,2.6,0),A.visible=!1,o.add(A);const j=_();h.push(j);const v=new Me(new Vn(M*1.012,64,44),new wt({map:j,transparent:!0,roughness:1,metalness:0,depthWrite:!1,fog:!1}));v.position.copy(D),v.rotation.set(-1.4,2.6,0),v.visible=!1,o.add(v);const b=new Me(new Vn(M*1.02,48,32),new It({color:9357055,transparent:!0,opacity:.38,side:jt,blending:pn,depthWrite:!1,fog:!1})),I=new Me(new Vn(M*1.05,48,32),new It({color:5217256,transparent:!0,opacity:.2,side:jt,blending:pn,depthWrite:!1,fog:!1}));b.position.copy(D),I.position.copy(D),b.visible=I.visible=!1,o.add(b,I);const F=[A,v,b,I];function Q(P){const B=P==="space",K=P==="sea";o.background=B?f:m,w&&x&&(o.environment=B?x:w),o.fog=B||K?null:l;for(const $ of F)$.visible=B;le.visible=W.visible=K,_e(K),K&&me(0),K&&(c.position.set(10,4.2,26),c.lookAt(0,3.2,0))}const R=new _h(16764826,3.2);R.position.copy(u).multiplyScalar(60),o.add(R),o.add(new gh(9078448,4864556,.75));function z(){const P=document.createElement("canvas");P.width=256,P.height=256;const B=P.getContext("2d");B.fillStyle="#7c766e",B.fillRect(0,0,256,256);for(let $=0;$<2600;$++){const ue=95+Math.floor(Math.random()*42);B.fillStyle=`rgba(${ue+8},${ue+2},${ue-4},0.5)`,B.fillRect(Math.random()*256,Math.random()*256,2,2)}const K=new dn(P);return K.colorSpace=ht,K.wrapS=K.wrapT=Pr,K.repeat.set(12,12),K}const k=z();h.push(k);const Z=new Me(new nr(140,64),new wt({map:k,color:9406075,roughness:.96,metalness:0}));Z.rotation.x=-Math.PI/2,o.add(Z);const q=new Me(new Et(2.3,2.8,.45,40),new wt({color:3355183,roughness:.7,metalness:.4,envMapIntensity:1}));q.position.y=.22,o.add(q);const Y=new wt({color:3487807,metalness:.75,roughness:.5,envMapIntensity:1.1});function ee(){const P=new qt,B=.85,K=11.5,$=new $t(.18,K,.18);for(const[Ze,st]of[[-B,-B],[B,-B],[-B,B],[B,B]]){const Pt=new Me($,Y);Pt.position.set(Ze,K/2,st),P.add(Pt)}const ue=new $t(B*2,.09,.09),De=new $t(.09,.09,B*2);for(let Ze=1;Ze<=K-.5;Ze+=1.25){for(const st of[-B,B]){const Pt=new Me(ue,Y);Pt.position.set(0,Ze,st),P.add(Pt)}for(const st of[-B,B]){const Pt=new Me(De,Y);Pt.position.set(st,Ze,0),P.add(Pt)}}const We=new $t(3.4,.26,.4),je=new Me(We,Y);je.position.set(B+1.7,8,.62),P.add(je);const et=new Me(We,Y);return et.position.set(B+1.7,8,-.62),P.add(et),P.userData.arms=[je,et],P}const te=ee();te.position.set(-3.7,0,-.2),o.add(te);const le=new Me(new nr(200,48),new wt({color:1591399,metalness:.25,roughness:.28,envMapIntensity:1.4}));le.rotation.x=-Math.PI/2,le.position.y=0,le.visible=!1,o.add(le);const W=new qt,ne=new Me(new $t(7.2,.5,4.8),new wt({color:2764341,metalness:.5,roughness:.6}));ne.position.y=.3,W.add(ne);const xe=new Me(new nr(1.5,40),new It({color:987412}));xe.rotation.x=-Math.PI/2,xe.position.y=.552,W.add(xe);const Re=new Me(new na(1.18,1.5,44),new It({color:15778634,side:Yt}));Re.rotation.x=-Math.PI/2,Re.position.y=.556,W.add(Re);const be=new It({color:15778634});for(const P of[Math.PI/4,-Math.PI/4]){const B=new Me(new $t(2.3,.02,.16),be);B.rotation.y=P,B.position.y=.56,W.add(B)}for(const P of[-3.1,3.1]){const B=new Me(new $t(.7,.7,4.2),new wt({color:3817287,metalness:.4,roughness:.7}));B.position.set(P,.55,0),W.add(B)}W.position.set(0,0,0),W.visible=!1,o.add(W);const ke=te.userData.arms,$e=.62,Ce=1.25;function Ve(P){const B=$e+P*Ce;ke[0].position.z=B,ke[1].position.z=-B}function C(){const P=document.createElement("canvas");P.width=128,P.height=512;const B=P.getContext("2d");B.fillStyle="#d7dce3",B.fillRect(0,0,128,512);for(let $=0;$<128;$++){const ue=Math.floor(Math.random()*16);B.fillStyle=`rgba(${180+ue},${186+ue},${194+ue},0.22)`,B.fillRect($,0,1,512)}B.strokeStyle="rgba(112,120,132,0.55)",B.lineWidth=1.4;for(let $=24;$<512;$+=38)B.beginPath(),B.moveTo(0,$),B.lineTo(128,$),B.stroke();const K=new dn(P);return K.colorSpace=ht,K.wrapS=K.wrapT=Pr,K.repeat.set(3,1),K}const fe=C();h.push(fe);const V=new qt,ce=new wt({map:fe,color:15791095,metalness:.92,roughness:.2,envMapIntensity:1.5}),J=new wt({color:2895669,metalness:.8,roughness:.45,envMapIntensity:1.2});function Le(P,B,K,$){const ue=new uh;ue.moveTo(0,0),ue.lineTo(0,B),ue.lineTo(P,B-$),ue.lineTo(P,B-$-K),ue.closePath();const De=new ta(ue,{depth:.05,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:1});return De.translate(0,0,-.045),De}function ve(P,B,K,$){const ue=new Me(B,ce);ue.userData.part="flap",ue.position.set(K*.5,$,0),ue.scale.x=K,P.add(ue)}const S=new qt,y=new Me(new Et(.6,.6,5,72),ce);y.position.y=3;const O=[[.6,0],[.585,.35],[.55,.7],[.49,1.02],[.4,1.3],[.28,1.52],[.14,1.66],[.02,1.74]].map(([P,B])=>new he(P,B)),oe=new Me(new Is(O,72),ce);oe.position.y=5.5;const re=new Me(new Et(.62,.7,.7,72),J);re.position.y=.82;const ie=new Me(new Et(.606,.606,.16,72),J);ie.position.y=4.7,y.userData.part="body",oe.userData.part="nose",re.userData.part="engine",ie.userData.part="body",S.add(y,oe,re,ie);const Te=Le(.72,1.2,.32,.62),ge=Le(.44,.72,.24,.36);ve(S,Te,1,1),ve(S,Te,-1,1),ve(S,ge,1,4.7),ve(S,ge,-1,4.7);const Se=new Et(.1,.17,.4,20);for(let P=0;P<6;P++){const B=P/6*Math.PI*2,K=new Me(Se,J);K.userData.part="engine",K.position.set(Math.cos(B)*.3,.32,Math.sin(B)*.3),S.add(K)}const Ue=new Me(Se,J);Ue.userData.part="engine",Ue.position.set(0,.32,0),S.add(Ue);const Be=new It({color:16734762,transparent:!0,opacity:0,blending:pn,depthWrite:!1,fog:!1}),se=new Me(new Et(.78,.66,6.6,40,1,!0),Be);se.position.y=3.4,se.renderOrder=4,S.add(se),V.add(S);const ot=8,Ae=new qt,He=new Me(new Et(.6,.6,7,72),ce);He.position.y=4.2,He.userData.part="booster";const we=new Me(new Et(.585,.6,.5,72),J);we.position.y=7.95;const Ee=new Me(new Et(.62,.74,.7,72),J);Ee.position.y=.5;const Ye=new Me(new Et(.606,.606,.14,72),J);Ye.position.y=5.4,we.userData.part=Ee.userData.part=Ye.userData.part="booster",Ae.add(He,we,Ee,Ye);const at=new wt({color:11713220,metalness:.72,roughness:.34}),yt=new $t(.52,.66,.08),Je=[];for(const P of[Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4]){const B=new qt;B.rotation.y=-P,B.position.y=7.1,Ae.add(B);const K=new qt;K.position.set(.58,0,0),B.add(K);const $=new Me(yt,at);$.position.set(.3,0,0),$.userData.part="booster",K.add($),Je.push(K)}function de(P){for(const B of Je)B.rotation.z=(1-P)*(Math.PI*.52),B.scale.setScalar(.72+.28*P)}const L=[];for(const P of[Math.PI/4,3*Math.PI/4,5*Math.PI/4,7*Math.PI/4]){const B=new qt;B.rotation.y=P,B.position.y=.85,Ae.add(B);const K=new qt;K.position.set(.6,0,0),B.add(K);const $=new Me(new Et(.05,.08,1.9,10),J);$.position.set(0,-.95,0),$.userData.part="booster",K.add($);const ue=new Me(new Et(.2,.2,.07,12),J);ue.position.set(0,-1.9,0),K.add(ue),K.visible=!1,L.push(K)}function me(P){for(const B of L)B.rotation.z=3-P*3.5}function _e(P){for(const B of L)B.visible=P}me(0);const Oe=new It({color:16732966,transparent:!0,opacity:0,blending:pn,depthWrite:!1,fog:!1}),Ne=new Me(new Et(.72,.82,7.2,40,1,!0),Oe);Ne.position.y=4.2,Ae.add(Ne);const ut=new Et(.06,.1,.28,14),lt=(P,B)=>{for(let K=0;K<P;K++){const $=K/P*Math.PI*2,ue=new Me(ut,J);ue.userData.part="booster",ue.position.set(Math.cos($)*B,.2,Math.sin($)*B),Ae.add(ue)}};lt(20,.5),lt(10,.28),lt(3,.1),Ae.visible=!1,V.add(Ae),o.add(V);const At=new It({color:16757338,transparent:!0,opacity:.95,blending:pn,depthWrite:!1,depthTest:!1,fog:!1}),Mt=new Me(new mi(.34,1,28),At);Mt.rotation.x=Math.PI,Mt.renderOrder=6;const ct=new It({color:16742938,transparent:!0,opacity:.3,blending:pn,depthWrite:!1,depthTest:!1,fog:!1}),St=new Me(new mi(.62,1,24),ct);St.rotation.x=Math.PI,St.renderOrder=5;const Ut=.2;Mt.position.y=Ut,St.position.y=Ut,V.add(Mt,St);const ln=new Me(new mi(.3,1,24),At);ln.rotation.x=Math.PI;const xn=new Me(new mi(.5,1,20),ct);xn.rotation.x=Math.PI,ln.position.y=Ut,xn.position.y=Ut,ln.visible=xn.visible=!1,S.add(ln,xn);const Si=[{key:"nose",name:{zh:"载荷舱",en:"Payload bay"},top:6.6,bot:5.5,half:.34},{key:"oxtank",name:{zh:"液氧舱",en:"LOX tank"},top:5.35,bot:3.55,half:.56},{key:"fueltank",name:{zh:"甲烷舱",en:"Methane tank"},top:3.45,bot:1.25,half:.56},{key:"engine",name:{zh:"燃烧仓",en:"Engine bay"},top:1.15,bot:.45,half:.5}],bi=6.7,ii=.35,Ei=1.7,wi=bi-ii,Tn=document.createElement("canvas");Tn.width=240,Tn.height=Math.round(240*wi/Ei);const kr=Tn.width/Ei,zs=Tn.height/wi,E=Tn.getContext("2d"),N=new dn(Tn);N.colorSpace=ht,h.push(N);let G="_";function X(P){const B=E,K=Tn.width;B.clearRect(0,0,K,Tn.height);const $=K/2,ue=De=>(bi-De)*zs;for(const De of Si){const We=De.key===P,je=$-De.half*kr,et=$+De.half*kr,Ze=ue(De.top),st=ue(De.bot);B.fillStyle=We?"rgba(90,214,255,0.20)":"rgba(20,28,38,0.14)",B.fillRect(je,Ze,et-je,st-Ze),B.setLineDash(We?[10,6]:[6,6]),B.lineWidth=We?3:1.6,B.strokeStyle=We?"#8fe8ff":"rgba(196,208,220,0.7)",B.strokeRect(je,Ze,et-je,st-Ze),B.setLineDash([]),B.font=`bold ${We?34:30}px "PingFang SC","Microsoft YaHei",sans-serif`,B.textAlign="center",B.textBaseline="middle",B.shadowColor="rgba(0,0,0,0.75)",B.shadowBlur=6,B.fillStyle=We?"#eafaff":"rgba(226,234,242,0.92)",B.fillText(ae(De.name),$,(Ze+st)/2),B.shadowBlur=0}N.needsUpdate=!0}X(null);const H=new It({map:N,transparent:!0,depthTest:!1,depthWrite:!1,fog:!1}),ye=new Me(new pi(Ei,wi),H);ye.position.set(0,(bi+ii)/2,0),ye.renderOrder=10,ye.visible=!1,S.add(ye);const Pe=2.5,Fe=3.4,ze=document.createElement("canvas");ze.width=300,ze.height=Math.round(300*Fe/Pe);const Ke=ze.getContext("2d"),Ge=new dn(ze);Ge.colorSpace=ht,h.push(Ge);function Xe(P,B,K,$,ue,De,We){P.setLineDash([]),P.strokeStyle=De,P.fillStyle=De,P.lineWidth=We||3,P.beginPath(),P.moveTo(B,K),P.lineTo($,ue),P.stroke();const je=Math.atan2(ue-K,$-B),et=(We||3)*2.4+6;P.beginPath(),P.moveTo($,ue),P.lineTo($-et*Math.cos(je-.42),ue-et*Math.sin(je-.42)),P.lineTo($-et*Math.cos(je+.42),ue-et*Math.sin(je+.42)),P.closePath(),P.fill()}function bt(){const P=Ke,B=ze.width,K=ze.height,$=B/2;P.clearRect(0,0,B,K);const ue=K*.3,De=K*.52,We=K*.88;P.setLineDash([9,6]),P.lineWidth=2.6,P.strokeStyle="#8fe8ff";for(const et of[-1,1])P.beginPath(),P.moveTo($+et*62,ue),P.lineTo($+et*62,ue+34),P.lineTo($+et*22,De),P.lineTo($+et*86,We),P.stroke();P.setLineDash([]);const je=P.createRadialGradient($,ue+32,4,$,ue+32,58);je.addColorStop(0,"rgba(255,214,130,0.95)"),je.addColorStop(1,"rgba(255,140,40,0)"),P.fillStyle=je,P.beginPath(),P.arc($,ue+32,58,0,7),P.fill(),Xe(P,$-104,K*.13,$-30,ue+10,"#ff9a3a",4),Xe(P,$+104,K*.13,$+30,ue+10,"#5aa8ff",4),Xe(P,$,De+12,$,K*.985,"#ffd070",6),P.textAlign="center",P.textBaseline="middle",P.shadowColor="rgba(0,0,0,0.85)",P.shadowBlur=6,P.font='bold 22px "PingFang SC","Microsoft YaHei",sans-serif',P.fillStyle="#ffc48a",P.fillText(ae({zh:"甲烷",en:"CH₄"}),$-108,K*.1),P.fillStyle="#a8d8ff",P.fillText(ae({zh:"液氧",en:"LOX"}),$+108,K*.1),P.fillStyle="#ffe6b4",P.fillText(ae({zh:"燃烧室",en:"Chamber"}),$,ue+32),P.font='bold 15px "PingFang SC","Microsoft YaHei",sans-serif',P.fillStyle="#cfe8ff",P.fillText(ae({zh:"喉部·加速",en:"Throat"}),$+66,De),P.font='bold 19px "PingFang SC","Microsoft YaHei",sans-serif',P.fillStyle="#ffd070",P.fillText(ae({zh:"燃气喷出",en:"Exhaust"}),$,K*.94),P.shadowBlur=0,Ge.needsUpdate=!0}bt();const Gt=new It({map:Ge,transparent:!0,depthTest:!1,depthWrite:!1,fog:!1}),xt=new Me(new pi(Pe,Fe),Gt);xt.position.set(0,.25,.04),xt.renderOrder=12,xt.visible=!1,V.add(xt);const cn=1.8,_t=1.5,qe=document.createElement("canvas");qe.width=320,qe.height=Math.round(320*_t/cn);const hr=qe.getContext("2d"),pt=new dn(qe);pt.colorSpace=ht,h.push(pt);function An(){const P=hr,B=qe.width,K=qe.height,$=14,ue=K*.3,De=B-28,We=K*.5;P.clearRect(0,0,B,K),P.fillStyle="rgba(90,214,255,0.18)",P.fillRect($,ue,De,We),P.setLineDash([11,7]),P.lineWidth=3,P.strokeStyle="#8fe8ff",P.strokeRect($,ue,De,We),P.setLineDash([]),P.textAlign="center",P.shadowColor="rgba(0,0,0,0.8)",P.shadowBlur=6,P.fillStyle="#eafaff",P.font='bold 30px "PingFang SC","Microsoft YaHei",sans-serif',P.fillText(ae({zh:"一级发动机",en:"Stage-1 engines"}),B/2,ue+We*.36),P.fillStyle="#c3ecff",P.font='19px "PingFang SC","Microsoft YaHei",sans-serif',P.fillText(ae({zh:"高速喷出燃气 → 推力",en:"exhaust → thrust"}),B/2,ue+We*.72),P.shadowBlur=0,pt.needsUpdate=!0}An();const ur=new It({map:pt,transparent:!0,depthTest:!1,depthWrite:!1,fog:!1}),hn=new Me(new pi(cn,_t),ur);hn.position.set(0,1.15,.02),hn.renderOrder=11,hn.visible=!1,Ae.add(hn);const fr=[{key:"b-oxtank",name:{zh:"液氧舱",en:"LOX tank"},top:7.7,bot:4.4,half:.56},{key:"b-fueltank",name:{zh:"甲烷舱",en:"Methane tank"},top:4.3,bot:1.3,half:.56},{key:"b-engine",name:{zh:"发动机",en:"Engines"},top:1.2,bot:.2,half:.5}],Ct=7.9,Rn=.1,ri=1.7,Vt=Ct-Rn,un=document.createElement("canvas");un.width=240,un.height=Math.round(240*Vt/ri);const Br=un.width/ri,Hr=un.height/Vt,vh=un.getContext("2d"),Gr=new dn(un);Gr.colorSpace=ht,h.push(Gr);let Os="_";function ra(P){const B=vh,K=un.width;B.clearRect(0,0,K,un.height);const $=K/2,ue=De=>(Ct-De)*Hr;for(const De of fr){const We=De.key===P,je=$-De.half*Br,et=$+De.half*Br,Ze=ue(De.top),st=ue(De.bot);B.fillStyle=We?"rgba(90,214,255,0.20)":"rgba(20,28,38,0.14)",B.fillRect(je,Ze,et-je,st-Ze),B.setLineDash(We?[10,6]:[6,6]),B.lineWidth=We?3:1.6,B.strokeStyle=We?"#8fe8ff":"rgba(196,208,220,0.7)",B.strokeRect(je,Ze,et-je,st-Ze),B.setLineDash([]),B.font=`bold ${We?30:26}px "PingFang SC","Microsoft YaHei",sans-serif`,B.textAlign="center",B.textBaseline="middle",B.shadowColor="rgba(0,0,0,0.75)",B.shadowBlur=6,B.fillStyle=We?"#eafaff":"rgba(226,234,242,0.92)",B.fillText(ae(De.name),$,(Ze+st)/2),B.shadowBlur=0}Gr.needsUpdate=!0}ra(null);const sa=new It({map:Gr,transparent:!0,depthTest:!1,depthWrite:!1,fog:!1}),Ti=new Me(new pi(ri,Vt),sa);Ti.position.set(0,(Ct+Rn)/2,.02),Ti.renderOrder=10,Ti.visible=!1,Ae.add(Ti);let Xn={thrust:0,twr:null,goalMet:!1},tn="pad",nt=null,it=0,oa=!0,vn=0,Ht="ship",Cn=0,Nn=0,Ai=0,Ri=0;function Ci(){S.position.y=(Ht==="stack"?ot:0)+Cn}function yh(){Ae.visible=Ht==="stack"||Ht==="booster",S.visible=Ht!=="booster",we.visible=Ht!=="booster",Ae.position.y=0,Ae.rotation.z=0,ln.visible=xn.visible=!1,Ci()}function Mh(){Ht==="stack"?(c.position.set(9,3.6,22),c.lookAt(0,7.6,0)):Ht==="booster"?(c.position.set(9,4.5,25),c.lookAt(0,7.5,0)):(c.position.set(5.4,1.1,12.5),c.lookAt(0,4.2,0))}function Sh(P){Ht=P||"ship",Cn=0,Nn=0,yh(),Mh()}let Vr="simple";function bh(P){Vr=P||"simple"}let aa=!1;function Eh(P){aa=!!P}function wh(){V.position.x=0,de(1),Oe.opacity=0,Be.opacity=0}function Th(P){Xn={...Xn,...P}}const Fs={nose:{name:{zh:"鼻锥 / 载荷舱",en:"Nose / payload bay"},desc:{zh:"装卫星或飞船",en:"Holds satellites or a spacecraft"},y:6},oxtank:{name:{zh:"氧化剂罐（液氧）",en:"Oxidizer tank (LOX)"},desc:{zh:"真空没空气，火箭自带氧化剂",en:"No air in space — the rocket carries its own oxidizer"},y:4.3},fueltank:{name:{zh:"燃料罐（液甲烷）",en:"Fuel tank (liquid methane)"},desc:{zh:"燃料，与氧化剂分罐储存",en:"Fuel, stored separately from the oxidizer"},y:1.9},flap:{name:{zh:"后襟翼",en:"Aft flap"},desc:{zh:"再入时像跳伞一样控制姿态",en:"Controls attitude on reentry like a skydiver"},y:2},engine:{name:{zh:"发动机（猛禽）",en:"Engine (Raptor)"},desc:{zh:"液氧甲烷、可深度节流",en:"Methalox, deep-throttling"},y:.7},"b-oxtank":{name:{zh:"一级 · 液氧舱",en:"Stage 1 · LOX tank"},desc:{zh:"氧化剂（液氧），一级的大罐",en:"Oxidizer (LOX), the booster’s big tank"},y:6},"b-fueltank":{name:{zh:"一级 · 甲烷舱",en:"Stage 1 · Methane tank"},desc:{zh:"燃料（液甲烷），和二级同款推进剂",en:"Fuel (methane), same propellant as the ship"},y:3},"b-engine":{name:{zh:"一级发动机 · 33 台猛禽",en:"Stage 1 · 33 Raptors"},desc:{zh:"起飞主推力来源",en:"Main thrust at liftoff"},y:.7}};let Wr=null,Zt=null,ks=!1;function Ah(P){ks=P==="thrust"||P==="booster-engine"||P==="booster",Wr=ks?null:P==="tanks"?"fueltank":Fs[P]?P:null}function Rh(P){tn=P||"pad",nt=null,V.rotation.z=0,Cn=0,Nn=0,Ci(),Ae.position.y=0,Ae.rotation.z=0,Ai=0,we.position.y=7.95,we.rotation.z=0,ln.visible=xn.visible=!1,wh(),Ri=tn==="descent"?1:0,Ve(Ri);const B=tn==="ascent"||tn==="separate",K=tn==="descent";Z.visible=q.visible=te.visible=!B&&!K,it=K?12:B?2.4:0,V.position.y=it}function Ch(P){V.rotation.z=0,tn==="liftoff"?(it=0,nt=P?{type:"launch",t:0,vy:0}:{type:"pad-fire",t:0}):tn==="descent"?Vr==="sea"?(Z.visible=q.visible=te.visible=!1,_e(!0),me(0),P?(it=11,V.position.x=0,V.rotation.z=0,nt={type:"sealand",t:0}):nt=null):Vr==="reentry"?(Z.visible=q.visible=te.visible=!1,c.position.set(0,6,21),c.lookAt(0,5,0),it=8,V.position.x=-4,V.rotation.z=.95,Be.opacity=0,nt={type:"reenter",t:0}):P&&Ht==="booster"&&Vr==="full"?(Z.visible=q.visible=te.visible=!1,it=8,V.position.x=3.6,V.rotation.z=0,de(0),Oe.opacity=0,nt={type:"recover",t:0}):(Z.visible=q.visible=te.visible=!0,it=12,nt={type:P?"land-ok":"land-fail",t:0}):tn==="separate"?(Cn=0,Nn=0,Ae.position.y=0,Ae.rotation.z=0,Ci(),Ai=0,we.position.y=7.95,we.rotation.z=0,nt=P?{type:"separate",t:0}:{type:"boost",t:0}):tn==="ascent"?nt={type:"boost",t:0}:aa?(it=0,nt={type:"hop",t:0}):(it=0,nt={type:"pad-fire",t:0})}function la(){if(!oa)return;requestAnimationFrame(la),vn+=.016;let P=Xn.thrust||0,B=0;Xn.goalMet;let K=null;if(nt)if(nt.t+=.016,nt.type==="separate"){const Ie=nt.t;Ie<2.5?(K=ae({zh:"① 一级关大部分主机",en:"① Booster throttles down"}),P=12e4+(Ie<1.5?7e5*(1-Ie/1.5):0),it=2.4+Math.sin(vn*2)*.06):Ie<5?(K=ae({zh:"② 二级点火 · 热分离",en:"② Ship ignites — hot-staging"}),P=Math.max(0,12e4*(1-(Ie-2.5)/.8)),B=76e4,Cn=Math.min(Cn+.006,.45),Ci()):Ie<7.5?(K=ae({zh:"③ 级间分离",en:"③ Stage separation"}),B=74e4,Cn=Math.min(Cn+.02,2.6),Ci(),Nn=Math.min(Nn+.014,3),Ae.position.y=-Nn,Ae.rotation.z=Math.min(Ae.rotation.z+.0018,.14)):(K=ae({zh:"④ 一级抛级间环 · 掉头",en:"④ Booster sheds ring, flips"}),B=72e4,Cn=Math.min(Cn+.02,5),Ci(),Nn=Math.min(Nn+.018,8),Ae.position.y=-Nn,Ae.rotation.z=Math.min(Ae.rotation.z+.004,.5),Ai=Math.min(Ai+.03,1.6),we.position.y=7.95+Ai,we.rotation.z=-Ai*.5)}else if(nt.type==="recover"){const Ie=nt.t;let mt,Lt,rn,Pi=0,dr=0,Pn,si=!1;Ie<5?(K=ae({zh:"① 掉头 · 回推点火（高空）",en:"① Flip around · boostback burn (high up)"}),mt=7,Lt=2.6,rn=1.55,Pi=Ie>1.8&&Ie<4.4?9e5:0,Pn=0):Ie<10?(K=ae({zh:"② 展开栅格舵 · 立直（高空）",en:"② Deploy grid fins · upright (high up)"}),mt=6,Lt=1,rn=0,Pn=Math.min(1,(Ie-5.2)/4.2)):Ie<15?(K=ae({zh:"③ 再入点火 · 减速",en:"③ Reentry burn · slow down"}),mt=6,Lt=.2,rn=0,Pi=Ie>10.6&&Ie<14.2?56e4:0,dr=Ie<13.6?Math.min(.6,(Ie-10)/1.6):Math.max(0,.6-(Ie-13.6)*1.1),Pn=1):(K=ae({zh:"④ 着陆点火 · 悬停 · 被筷子夹住",en:"④ Landing burn · hover · caught by the arms"}),mt=3,Lt=0,rn=0,Pi=it>3.15?5e5:0,Pn=1,si=!0),si&&(Z.visible=q.visible=te.visible=!0),it+=(mt-it)*.025,V.position.x+=(Lt-V.position.x)*.03,V.rotation.z+=(rn-V.rotation.z)*.03,de(Pn),Oe.opacity=dr,P=Pi}else if(nt.type==="sealand"){it+=(1.7-it)*.02;const mt=it<5?Math.min(1,(5-it)/2.4):0;me(mt);const Lt=it<2.1;P=Lt?0:34e4,K=ae(Lt?{zh:"稳稳落在无人船甲板 ✅",en:"Touchdown on the droneship ✅"}:{zh:"海上无人船回收 · 反推下降",en:"Droneship recovery · retropropulsion"})}else if(nt.type==="reenter"){const Ie=nt.t,mt=Xn.reentryAngle||5;V.rotation.z+=(.95-V.rotation.z)*.06;const Lt=Math.min(1.15,mt*4.5*Math.PI/180),rn=1.3,Pi=rn*Math.cos(Lt);let dr=-4+Ie*Pi,Pn,si,fa=16738858;if(Xn.reentrySteep)Pn=8-Ie*rn*Math.sin(Lt)*1.4,si=Math.min(1,Ie/1.2),fa=Ie>1.8?16777215:16738858,dr+=Math.sin(Ie*40)*.06*Math.min(1,Ie),K=ae({zh:`再入角 ${mt}° · 太陡：过热烧毁 🔥`,en:`Reentry ${mt}° · too steep: burning up 🔥`});else if(Xn.reentryShallow){const Ih=Math.min(Ie,3.5),da=Math.max(0,Ie-3.5);Pn=8-Ih*rn*Math.sin(Lt)+da*da*.5,si=Math.max(0,.5-Math.abs(Ie-2.4)*.16),K=ae({zh:`再入角 ${mt}° · 太浅：打水漂被弹回 🪨`,en:`Reentry ${mt}° · too shallow: skips off 🪨`})}else Pn=8-Ie*rn*Math.sin(Lt),si=Math.min(.85,Ie/1.3)*(Ie>7?Math.max(0,1-(Ie-7)/2):1),K=ae({zh:`再入角 ${mt}° · 安全走廊，稳稳穿过 ✅`,en:`Reentry ${mt}° · safe corridor ✅`});V.position.x=dr,it=Pn,Be.color.setHex(fa),Be.opacity=si*(.82+.18*Math.sin(vn*18)),P=0}else nt.type==="launch"?(nt.vy=Math.min(nt.vy+35e-5,.036),it+=nt.vy,P=1e6):nt.type==="land-ok"?(it=Math.max(3,it-.026),P=it>3.3?36e4:0):nt.type==="land-fail"?(it=Math.max(0,it-.09),P=12e4,it<=0&&(V.rotation.z=Math.min(V.rotation.z+.035,1.3))):nt.type==="hop"?(it=Math.min(1.3,it+.006),P=Math.max(Xn.thrust||0,7e5)):nt.type==="boost"?(it=2.4+Math.sin(vn*2)*.12,P=nt.t<1.4?9e5:52e4,nt.t<1.4):P=Math.max(P,42e4);else tn==="separate"?(it=2.4+Math.sin(vn*2)*.12,P=Math.max(P,82e4)):tn==="ascent"?(it=2.4+Math.sin(vn*2)*.12,P=Math.max(P,52e4)):tn==="descent"?(it=Ht==="booster"?4.5:8,P=3e5):it=0;V.position.y=it;const ue=Math.max(.2,P/5e5*3)*(1+Math.sin(vn*22)*.06);if(Mt.scale.set(1,ue,1),Mt.position.y=Ut-ue/2,St.scale.set(1,ue*1.15,1),St.position.y=Ut-ue*.575,At.color.setHex(16757338),ct.color.setHex(16742938),Mt.visible=St.visible=P>1,ln.visible=xn.visible=B>0,B>0){const Ie=Math.max(.2,B/5e5*3)*(1+Math.sin(vn*22)*.06);ln.scale.set(1,Ie,1),ln.position.y=Ut-Ie/2,xn.scale.set(1,Ie*1.15,1),xn.position.y=Ut-Ie*.575}const De={nose:1,oxtank:1,fueltank:1},We=Zt&&De[Zt]?Zt:De[Wr]?Wr:null,je=Zt==="flap";if(We||je){ye.visible=!0;const Ie=je?null:We;Ie!==G&&(X(Ie),G=Ie),H.opacity=Zt?1:.55+(Math.sin(vn*4)+1)*.22}else ye.visible=!1;const Ze=(Wr==="engine"||Zt==="engine"||Zt==="b-engine")&&(S.visible||Ht==="booster");if(xt.visible=Ze,Ze){const Ie=(Ht==="stack"||Ht==="booster")&&Zt!=="engine";xt.position.y=Ie?.55:S.position.y+.25;const mt=Zt==="engine"||Zt==="b-engine";Gt.opacity=mt?1:.6+(Math.sin(vn*4)+1)*.2,mt&&(Mt.visible=St.visible=!1)}const st=Zt&&Zt.slice(0,2)==="b-"&&Zt!=="b-engine"?Zt:null;st&&(Ht==="stack"||Ht==="booster")?(Ti.visible=!0,st!==Os&&(ra(st),Os=st),sa.opacity=1):Ti.visible=!1,ks&&(Ht==="stack"||Ht==="booster")?(hn.visible=!0,ur.opacity=.55+(Math.sin(vn*4)+1)*.22):hn.visible=!1;let Pt=Ri;nt&&nt.type==="launch"?Pt=1:nt&&(nt.type==="land-ok"||nt.type==="recover")?Pt=it>3.4?1:0:tn==="descent"?Pt=1:tn==="liftoff"&&(Pt=0),Ri+=(Pt-Ri)*.08,Ve(Ri),K?s(K):a(),v.visible&&(v.rotation.y+=3e-4),i.render(o,c)}la();function ca(){const P=n.clientWidth,B=n.clientHeight;!P||!B||(c.aspect=P/B,c.updateProjectionMatrix(),i.setSize(P,B))}window.addEventListener("resize",ca);const ha=new O_,Bs=new he;let Hs=null;function Ph(P,B){const K=P.userData&&P.userData.part;if(K==="nose"||K==="flap"||K==="engine")return K;if(K==="body")return B.y-(V.position.y+S.position.y)>3?"oxtank":"fueltank";if(K==="booster"){const $=B.y-(V.position.y+Ae.position.y);return $>4.4?"b-oxtank":$>1.3?"b-fueltank":"b-engine"}return null}function ua(P){const B=i.domElement.getBoundingClientRect();if(!B.width||!B.height)return;Bs.x=(P.clientX-B.left)/B.width*2-1,Bs.y=-((P.clientY-B.top)/B.height)*2+1,ha.setFromCamera(Bs,c);const K=ha.intersectObject(V,!0);let $=null;for(const ue of K)if($=Ph(ue.object,ue.point),$)break;Zt=$,Hs&&Hs($?{name:ae(Fs[$].name),desc:ae(Fs[$].desc),x:P.clientX,y:P.clientY}:null)}i.domElement.addEventListener("pointermove",ua);function Lh(P){Hs=P}const Dh=Go(()=>{G="_",Os="_",An(),bt()});function Uh(){oa=!1,Dh(),window.removeEventListener("resize",ca),i.domElement.removeEventListener("pointermove",ua),o.traverse(P=>{P.geometry&&P.geometry.dispose(),P.material&&P.material.dispose()});for(const P of h)P&&P.dispose&&P.dispose();i.dispose(),i.domElement.parentNode&&i.domElement.parentNode.removeChild(i.domElement),r.parentNode&&r.parentNode.removeChild(r)}return{update:Th,setStage:Rh,setVehicle:Sh,setRecovery:bh,setPadRise:Eh,setEnvironment:Q,play:Ch,setHighlight:Ah,setHoverHandler:Lh,dispose:Uh}}function F_(n){const e=document.createElement("div");e.className="blueprint-overlay",e.innerHTML=`
    <div class="bp-formula" id="bp-formula"></div>
    <div class="bp-arrows">
      <div class="bp-arrow bp-thrust"><span class="bp-lbl-thrust"></span><i id="bp-thrust-bar"></i></div>
      <div class="bp-arrow bp-weight"><span class="bp-lbl-weight"></span><i id="bp-weight-bar"></i></div>
    </div>
  `,n.appendChild(e);function t(){e.querySelector(".bp-lbl-thrust").textContent=ae({zh:"推力 ↑",en:"Thrust ↑"}),e.querySelector(".bp-lbl-weight").textContent=ae({zh:"重力 ↓",en:"Weight ↓"})}t();const i=e.querySelector("#bp-formula"),r=e.querySelector("#bp-thrust-bar"),s=e.querySelector("#bp-weight-bar");function a({formulaText:o,thrust:l,weight:c}){o!=null&&(i.textContent=o),l!=null&&(r.style.height=`${Math.min(l/12e5*120,120)}px`),c!=null&&(s.style.height=`${Math.min(c/12e5*120,120)}px`)}return{update:a,relocalize:t,setTop:o=>{i.style.top=`${o}px`},dispose:()=>{e.parentNode&&e.parentNode.removeChild(e)}}}function k_(n,{onLaunch:e,onNext:t,onPrev:i}){const r=document.createElement("div");r.className="hud",r.innerHTML=`
    <div class="hud-hook"></div>
    <div class="hud-panel">
      <button class="hud-prev" style="align-self:flex-start;margin-bottom:8px;padding:4px 12px;border-radius:14px;border:1px solid #3a5170;background:rgba(255,255,255,.06);color:#bcd0e6;font-size:13px;cursor:pointer"></button>
      <div class="hud-goal"></div>
      <div class="hud-slot" id="hud-slot"></div>
      <button class="hud-launch"></button>
      <div class="hud-feedback"></div>
    </div>
    <div class="hud-milestone hidden">
      <div class="hud-stars"></div>
      <h3 class="hud-mile-title"></h3>
      <p class="hud-mile-fact"></p>
      <button class="hud-next"></button>
    </div>
  `,n.appendChild(r);const s=r.querySelector(".hud-launch"),a=r.querySelector(".hud-next"),o=r.querySelector(".hud-prev");function l(){s.textContent=ae({zh:"🚀 发射",en:"🚀 Launch"}),a.textContent=ae({zh:"下一关 →",en:"Next →"}),o.textContent=ae({zh:"← 上一关",en:"← Prev"})}l(),o.addEventListener("click",i);const c=r.querySelector(".hud-hook"),h=r.querySelector(".hud-goal"),u=r.querySelector(".hud-feedback"),d=r.querySelector(".hud-milestone"),p=r.querySelector(".hud-stars");return s.addEventListener("click",e),a.addEventListener("click",t),{slot:r.querySelector("#hud-slot"),hookEl:c,relocalize:l,setPrevVisible:g=>{o.style.display=g?"":"none"},setHook:g=>{c.textContent=g},setGoal:g=>{h.textContent=`🎯 ${g}`},setFeedback:({goalMet:g,message:_})=>{u.textContent=_,u.className=`hud-feedback ${g?"ok":"bad"}`},showMilestone:({title:g,fact:_,stars:m})=>{p.innerHTML=[1,2,3].map(f=>`<span class="${f<=m?"star-on":"star-off"}">★</span>`).join(""),r.querySelector(".hud-mile-title").textContent=g,r.querySelector(".hud-mile-fact").textContent=_,d.classList.remove("hidden")},reset:()=>{d.classList.add("hidden"),u.textContent=""}}}function B_(n){const e=document.createElement("div");return e.className="part-label hidden",n.appendChild(e),{show({name:t,desc:i,x:r,y:s}){e.innerHTML=`<b>${t}</b>${i?`<span>${i}</span>`:""}`,e.style.left=`${r}px`,e.style.top=`${s}px`,e.classList.remove("hidden")},hide(){e.classList.add("hidden")},destroy(){e.parentNode&&e.parentNode.removeChild(e)}}}function H_(n,e){const t=n.clientWidth||340,i=300,r=new Jo({antialias:!0,alpha:!0});r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setSize(t,i),n.appendChild(r.domElement);const s=new ih,a=new an(42,t/i,.1,100);s.add(new gh(14674687,3358797,1.3));const o=new _h(16777215,1.6);o.position.set(3,4,5),s.add(o);const l=new qt;s.add(l);const c=[[0,2],[.52,2],[.52,1.45],[.2,1.05],[.2,.95],[.78,0]];function h(){return new Me(new Is(c.map(([v,b])=>new he(v,b)),64),new wt({color:13489373,metalness:.85,roughness:.35,side:Yt,transparent:!0,opacity:.32,depthWrite:!1}))}function u(v,b,I="#e6ebf2",F=22){const Q=document.createElement("canvas");Q.width=256,Q.height=64;const R=Q.getContext("2d");R.textAlign="center",R.textBaseline="middle",R.shadowColor="rgba(0,0,0,0.85)",R.shadowBlur=6,R.fillStyle=I,R.font=`bold ${F}px "PingFang SC","Microsoft YaHei",sans-serif`,R.fillText(v,128,32);const z=new dn(Q);z.colorSpace=ht;const k=new Yl(new Fo({map:z,transparent:!0,depthWrite:!1}));return k.scale.set(1.3,.32,1),k.position.set(b[0],b[1],b[2]),l.add(k),k}const d=[];function p(v,b,I=16757066){const F=new Me(new Vn(b,20,16),new It({color:I,transparent:!0,opacity:.5,blending:pn,depthWrite:!1}));return F.position.y=v,F.scale.set(1,1.35,1),l.add(F),d.push(F),F}const g=[];function _(v,b,{count:I=10,speed:F=.14,r:Q=.07,tube:R=!0,spread:z=0}={}){const k=new sh(v.map(Y=>new U(Y[0],Y[1],Y[2])));R&&l.add(new Me(new ia(k,32,.05,8,!1),new wt({color:3752527,metalness:.4,roughness:.6,transparent:!0,opacity:.5})));const Z=new It({color:b,transparent:!0,opacity:.98,blending:pn,depthWrite:!1}),q=[];for(let Y=0;Y<I;Y++){const ee=new Me(new Vn(Q,10,10),Z);l.add(ee),q.push({m:ee,u:Y/I,ang:Y/I*6.283})}g.push({curve:k,parts:q,speed:F,spread:z})}const m=new U;function f(){for(const v of g)for(const b of v.parts){if(b.u=(b.u+v.speed*.016)%1,v.curve.getPoint(b.u,m),v.spread){const I=v.spread*b.u;m.x+=Math.cos(b.ang)*I,m.z+=Math.sin(b.ang)*I}b.m.position.copy(m)}}let w=null,x=null,M=!0;if(e==="gridfin"){M=!1,a.position.set(2.3,.8,4.7),a.lookAt(.2,.1,0);const v=new Me(new Et(.55,.55,3,40,1,!0),new wt({color:11844806,metalness:.82,roughness:.34,side:Yt}));l.add(v);const b=new qt;b.position.set(.55,1,0),l.add(b);const I=new wt({color:14147044,metalness:.85,roughness:.28}),F=1.25,Q=1,R=.18,z=new Me(new $t(F,Q,R),new wt({color:14147044,metalness:.85,roughness:.28,transparent:!0,opacity:.14,depthWrite:!1}));z.position.x=F/2,b.add(z);const k=6,Z=5;for(let q=0;q<=k;q++){const Y=new Me(new $t(.035,Q,R),I);Y.position.set(q/k*F,0,0),b.add(Y)}for(let q=0;q<=Z;q++){const Y=new Me(new $t(F,.035,R),I);Y.position.set(F/2,-Q/2+q/Z*Q,0),b.add(Y)}for(const q of[-.05,.35,.72,1.05])_([[q,-1.7,0],[q*.9+.2,-.5,0],[q*.85+.35,1,0],[q*.8+.4,2.1,0]],9427199,{count:6,speed:.3,r:.045,tube:!1});u(ae({zh:"栅格舵",en:"Grid fin"}),[1.2,1.85,0],"#eaf4ff",22),u(ae({zh:"钛合金格栅",en:"Titanium lattice"}),[1.15,-1.15,0],"#bcd6f0",16),u(ae({zh:"↑ 气流",en:"↑ airflow"}),[-.1,-1.9,0],"#9fd8ff",15),x=q=>{b.rotation.x=Math.sin(q*.02)*.5},l.position.y=-.1}else if(e==="autogenous"){let Q=function(z,k,Z,q){const Y=new qt;Y.position.x=z,l.add(Y),Y.add(new Me(new Et(F,F,I,32,1,!0),v(k)));const ee=new Vn(F,28,14,0,Math.PI*2,0,Math.PI/2),te=new Me(ee,v(k));te.position.y=I/2,Y.add(te);const le=new Me(ee,v(k));le.position.y=-I/2,le.rotation.x=Math.PI,Y.add(le);const W=I*q,ne=new Me(new Et(F*.95,F*.95,W,32),b(Z));return ne.position.y=-I/2+W/2,Y.add(ne),Y};var j=Q;M=!1,a.position.set(.3,.4,6.4),a.lookAt(0,0,0);const v=z=>new wt({color:z,metalness:.4,roughness:.4,transparent:!0,opacity:.16,side:Yt,depthWrite:!1}),b=z=>new wt({color:z,metalness:.2,roughness:.6,transparent:!0,opacity:.82}),I=2.6,F=.62;Q(-1.2,16751162,16759144,.5),Q(1.2,5941503,9425151,.62);const R=new Me(new Et(.34,.5,.7,24,1,!0),new wt({color:10134187,metalness:.8,roughness:.4,side:Yt}));R.position.set(0,-2.15,0),l.add(R),p(-2.15,.3),_([[-1.2,-1,0],[-1.2,-1.7,0],[-.35,-2.05,0]],16759144,{count:5,speed:.22,r:.05}),_([[-.35,-2,0],[-1.85,-1.4,0],[-1.95,.6,0],[-1.2,1.15,0]],16770236,{count:8,speed:.32,r:.05}),_([[1.2,-1,0],[1.2,-1.7,0],[.35,-2.05,0]],9425151,{count:5,speed:.22,r:.05}),_([[.35,-2,0],[1.85,-1.4,0],[1.95,.7,0],[1.2,1.25,0]],14085375,{count:8,speed:.32,r:.05}),u(ae({zh:"甲烷箱",en:"Methane"}),[-1.2,1.75,0],"#ffc48a",18),u(ae({zh:"液氧箱",en:"LOX"}),[1.2,1.75,0],"#a8d8ff",18),u(ae({zh:"气枕",en:"Ullage"}),[0,1.15,0],"#dfe8f2",15),u(ae({zh:"发动机汽化",en:"Engine vaporizes"}),[0,-2.75,0],"#ffd070",16),l.position.y=.35}else if(e==="engine-cycle"){M=!1,a.position.set(.15,.7,5.7),a.lookAt(0,.35,0),l.add(h());const v=new Et(.26,.26,.66,24),b=new Me(v,new wt({color:9067056,metalness:.6,roughness:.4}));b.position.set(-1.15,1.55,0),l.add(b);const I=new Me(v,new wt({color:3104650,metalness:.6,roughness:.4}));I.position.set(1.15,1.55,0),l.add(I),_([[-1.15,2.7,0],[-1.15,1.9,0],[-1.15,1.2,0],[-.7,1.7,0],[-.2,1.85,0]],16751162,{count:8,speed:.17,r:.06}),_([[1.15,2.7,0],[1.15,1.9,0],[1.15,1.2,0],[.7,1.7,0],[.2,1.85,0]],5941503,{count:8,speed:.17,r:.06}),p(1.6,.42),_([[0,1.7,0],[0,1.2,0],[0,.98,0],[0,.4,0],[0,-1.3,0]],16764778,{count:14,speed:.5,r:.06,tube:!1,spread:.62}),u(ae({zh:"富燃预燃室 → 甲烷泵",en:"Fuel-rich PB → methane pump"}),[-1.15,2.55,0],"#ffc48a",17),u(ae({zh:"富氧预燃室 → 液氧泵",en:"Ox-rich PB → LOX pump"}),[1.15,2.55,0],"#a8d8ff",17),u(ae({zh:"涡轮泵",en:"turbopump"}),[-1.15,1,0],"#e8d0b0",15),u(ae({zh:"涡轮泵",en:"turbopump"}),[1.15,1,0],"#bcd6f0",15),u(ae({zh:"主燃烧室",en:"Main chamber"}),[0,2.34,0],"#ffe0a8",22),l.position.y=-.55}else{M=!1,a.position.set(1.9,.65,4.4),a.lookAt(0,.25,0),l.add(h());const v=new Et(.09,.09,.55,16),b=new Me(v,new wt({color:16751162,metalness:.4,roughness:.5}));b.position.set(-.26,2.28,0),b.rotation.z=.32,l.add(b);const I=new Me(v,new wt({color:5941503,metalness:.4,roughness:.5}));I.position.set(.26,2.28,0),I.rotation.z=-.32,l.add(I),_([[-.26,2.5,0],[-.22,2.05,0],[-.05,1.85,0]],16751162,{count:6,speed:.3,r:.05,tube:!1}),_([[.26,2.5,0],[.22,2.05,0],[.05,1.85,0]],5941503,{count:6,speed:.3,r:.05,tube:!1});const F=new Me(new nr(.5,40),new It({color:16773312,transparent:!0,opacity:.9,side:Yt,depthWrite:!1,blending:pn}));F.rotation.x=-Math.PI/2,F.position.y=1.94,l.add(F),p(1.55,.44),_([[0,1.7,0],[0,1.2,0],[0,.98,0],[0,.4,0],[0,-1.3,0]],16765040,{count:16,speed:.55,r:.065,tube:!1,spread:.55});const Q=new Me(new mi(.72,1.4,40,1,!0),new It({color:16753210,transparent:!0,opacity:.4,side:Yt,depthWrite:!1,blending:pn}));Q.position.y=.28,l.add(Q);const R=document.createElement("canvas");R.width=256,R.height=128;const z=R.getContext("2d"),k=new dn(R);k.colorSpace=ht;const Z=new Yl(new Fo({map:k,transparent:!0,depthWrite:!1}));Z.scale.set(1.5,.75,1),Z.position.set(1.7,1.2,0),l.add(Z),u(ae({zh:"燃烧室",en:"Combustion chamber"}),[0,2.32,0],"#ffe0a8",20),w={gas:Q,injector:F,label:Z,lblCtx:z,lblCanvas:R,lblTex:k,lastPct:-1},l.position.y=-1}let D=!0,T=0;function A(){if(D){requestAnimationFrame(A),T+=1,l.rotation.y=M?l.rotation.y+.009:Math.sin(T*.006)*.45,x&&x(T),f();for(const v of d)v.material.opacity=.42+.22*Math.sin(T*.25+v.position.y*3);if(w){const v=.2+.8*(.5+.5*Math.sin(T*.018));w.gas.scale.set(.45+.55*v,v,.45+.55*v),w.gas.material.opacity=.28+.32*v,w.injector.material.opacity=.55+.4*v;const b=Math.round(v*100);if(b!==w.lastPct){w.lastPct=b;const I=w.lblCtx,F=256;I.clearRect(0,0,F,128),I.textAlign="center",I.shadowColor="rgba(0,0,0,0.8)",I.shadowBlur=8,I.fillStyle="#ffd98a",I.font='bold 30px "PingFang SC",sans-serif',I.fillText(ae({zh:"节流",en:"Throttle"}),F/2,48),I.fillStyle="#ffffff",I.font="bold 56px system-ui,sans-serif",I.fillText(b+"%",F/2,104),w.lblTex.needsUpdate=!0}}r.render(s,a)}}return A(),{dispose(){D=!1,s.traverse(v=>{v.geometry&&v.geometry.dispose(),v.material&&(v.material.map&&v.material.map.dispose(),v.material.dispose())}),r.dispose(),r.domElement.parentNode&&r.domElement.parentNode.removeChild(r.domElement)}}}function G_(n){const e=document.createElement("div");e.className="diagram-root",e.innerHTML=`
    <div class="diagram-hint hidden"></div>
    <div class="diagram-panel hidden">
      <div class="diagram-title"></div>
      <div class="diagram-body"></div>
    </div>`,n.appendChild(e),e.querySelector(".diagram-hint").textContent=ae({zh:"🔧 把鼠标移到火箭上，看内部构造",en:"🔧 Hover the rocket to see inside"});const t=e.querySelector(".diagram-hint"),i=e.querySelector(".diagram-panel"),r=e.querySelector(".diagram-title"),s=e.querySelector(".diagram-body");let a=null,o=null,l=!1,c=!1,h=null;function u(){o&&(o.dispose(),o=null)}function d(){if(!(!a||l)&&(l=!0,i.classList.remove("hidden"),a.model3d)){u();const _=s.querySelector(".d3d-wrap");_&&(o=H_(_,a.model3d))}}function p(){l&&(l=!1,i.classList.add("hidden"),u())}function g(){h&&clearTimeout(h),h=setTimeout(()=>{c||p()},320)}return i.addEventListener("mouseenter",()=>{c=!0,h&&clearTimeout(h)}),i.addEventListener("mouseleave",()=>{c=!1,g()}),{setDiagram(_){if(p(),a=_&&(_.svg||_.model3d)?_:null,a){r.textContent=ae(a.title)||ae({zh:"剖面构造",en:"Cutaway"});const m=ae(a.legend);s.innerHTML=a.model3d?`<div class="d3d-wrap"></div>${m?`<div class="d3d-legend">${m}</div>`:""}`:ae(a.svg),t.classList.remove("hidden")}else t.classList.add("hidden"),s.innerHTML=""},setHoverVisible(_){a&&(_?(h&&clearTimeout(h),d()):g())},destroy(){u(),h&&clearTimeout(h),e.parentNode&&e.parentNode.removeChild(e)}}}function V_(n){const e=Iu(Aa.map(x=>x.id)),t=xh(n),i=F_(n),r=B_(n),s=G_(n);t.setHoverHandler(x=>{x?r.show(x):r.hide(),s.setHoverVisible(!!x)});let a=null;const o=document.createElement("button");o.className="lang-toggle",o.style.cssText="position:fixed;top:12px;right:14px;z-index:40;padding:5px 13px;border-radius:16px;border:1px solid #2f6bff;background:rgba(9,14,26,.92);color:#cfe0ff;font:600 13px/1 system-ui,sans-serif;cursor:pointer",n.appendChild(o);const l=()=>{o.textContent=Mr()==="zh"?"EN":"中文"};l(),o.addEventListener("click",()=>lc(Mr()==="zh"?"en":"zh"));const c=Go(()=>{l(),p&&p.relocalize(),i.relocalize(),h&&w(h.id)});let h,u,d,p;function g(){const{derived:x}=Ra(h,u);t.update({thrust:x.thrust??0,twr:x.twr??0,deltaV:x.deltaV??null,goalMet:!1,reentryAngle:u.reentryAngle??null,reentryShallow:!!x.tooShallow,reentrySteep:!!x.tooSteep});const M=h.interaction==="choice"&&!u.choice;i.update({formulaText:M?ae({zh:"⬆ 先选一个方案",en:"⬆ Pick an option first"}):h.formulaHUD(u,x,Mr()),thrust:x.thrust??0,weight:x.weight??0})}function _(x){return 3}function m(){if(h.interaction==="choice"&&!u.choice){p.setFeedback({goalMet:!1,message:ae({zh:"先选一个方案再发射",en:"Pick an option before launching"})});return}const{derived:x,goalMet:M}=Ra(h,u);t.update({thrust:x.thrust??0,twr:x.twr??0,deltaV:x.deltaV??null,goalMet:M,reentryAngle:u.reentryAngle??null,reentryShallow:!!x.tooShallow,reentrySteep:!!x.tooSteep}),t.play(M);const D=M?ae({zh:"达标！火箭表现符合目标。",en:"Target met! The rocket performs as required."}):h.interaction==="choice"?ae({zh:`能飞——但${ae(x.chosen.note)} 换一种再试试？`,en:`It flies — but ${ae(x.chosen.note)} Try another?`}):ae({zh:"还差一点，调整参数再试试。",en:"Not quite — tweak the parameters and try again."});if(p.setFeedback({goalMet:M,message:D}),M){const T=_();e.complete(h.id,T);const A=Uu[h.milestoneId],j=h.recovery==="full"?19e3:h.recovery==="reentry"?7e3:h.recovery==="sea"?6e3:h.stage==="liftoff"?5200:h.stage==="descent"?5500:h.stage==="separate"?10500:h.padRise?3600:0;clearTimeout(a),a=setTimeout(()=>p.showMilestone({title:ae(A.title),fact:ae(A.fact),stars:T}),j)}}function f(){p&&p.hookEl&&i.setTop(p.hookEl.getBoundingClientRect().bottom+8)}window.addEventListener("resize",f);function w(x){const M=Aa.find(T=>T.id===x);if(!M)return;h=M,clearTimeout(a),p&&p.reset(),p||(p=k_(n,{onLaunch:m,onNext:()=>{const T=e.nextLockedUnlockedId();T&&w(T)},onPrev:()=>{const T=e.prevId(h.id);T&&w(T)}})),p.setPrevVisible(!!e.prevId(M.id)),p.setHook(ae(M.hook)),p.setGoal(ae(M.goal.text)),requestAnimationFrame(f),t.setStage(M.stage||"pad"),t.setVehicle(M.vehicle||(M.stage==="separate"?"stack":"ship")),t.setRecovery(M.recovery||"simple"),t.setPadRise(!!M.padRise),t.setEnvironment(M.env||"sky"),t.setHighlight(M.highlight||null);const D=new Set(["8.1","2.3","6.1","3.4"]);s.setDiagram(D.has(M.id)?M.diagram:null),d&&d.destroy(),M.interaction==="choice"?(u={choice:null},d=zu(p.slot,M.options.map(T=>({key:T.key,label:T.label})),u.choice,T=>{u={choice:T},g()})):M.interaction==="sequence"?(u={order:[]},d=Ou(p.slot,M.steps,T=>{u={order:T},g()})):(u=Lu(M),d=Nu(p.slot,M.params,u,T=>{u=T,g()})),g()}return w(e.nextLockedUnlockedId()),{dispose:()=>{c(),window.removeEventListener("resize",f),o.parentNode&&o.parentNode.removeChild(o),t.dispose(),i.dispose(),r.destroy(),s.destroy()}}}function W_(n,e){const t=document.createElement("div");t.className="home",t.innerHTML=`
    <div class="home-bg"></div>
    <div class="home-scrim"></div>
    <button class="home-lang"></button>
    <div class="home-content">
      <div class="home-title"></div>
      <div class="home-sub"></div>
      <div class="home-tagline">GATEWAY TO MARS</div>
      <button class="home-start"></button>
    </div>`,n.appendChild(t);const i=xh(t.querySelector(".home-bg"));i.setVehicle("stack"),i.update({thrust:125e4,goalMet:!0});const r=()=>{i.setStage("liftoff"),i.play(!0)};r();const s=setInterval(r,6800),a=t.querySelector(".home-title"),o=t.querySelector(".home-sub"),l=t.querySelector(".home-start"),c=t.querySelector(".home-lang");function h(){a.textContent=ae({zh:"从零到星舰",en:"ZERO TO STARSHIP"}),o.textContent=ae({zh:"一步步造出星舰，飞向火星",en:"Build Starship, one step at a time — bound for Mars"}),l.textContent=ae({zh:"开始旅程 →",en:"Start the journey →"}),c.textContent=Mr()==="zh"?"EN":"中文"}h();const u=Go(h);c.addEventListener("click",()=>lc(Mr()==="zh"?"en":"zh")),l.addEventListener("click",()=>{u(),clearInterval(s),i.dispose(),t.parentNode&&t.parentNode.removeChild(t),e()})}const ic=document.getElementById("app");W_(ic,()=>V_(ic));
