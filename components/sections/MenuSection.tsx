"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
interface MenuItem { id: string; name: string; description: string; price: string; tags: string[]; }
interface Category { id: string; name: string; items: MenuItem[]; }
const TAG: Record<string,string> = { signature:"bg-[#1B2A5E] text-white", vegan:"bg-[#5ABFC0]/15 text-[#3a9fa0]", "dairy-free":"bg-[#F2B8C6]/30 text-[#c47a8a]", "gluten-free":"bg-amber-50 text-amber-700" };
export default function MenuSection({ categories }: { categories: Category[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".menu-heading",{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".menu-heading",start:"top 85%"}});
      gsap.fromTo(".menu-tab",{y:20,autoAlpha:0},{y:0,autoAlpha:1,duration:.8,stagger:.08,ease:"expo.out",scrollTrigger:{trigger:".menu-tabs",start:"top 85%"}});
    },ref);
    return () => ctx.revert();
  },[]);
  useEffect(() => { gsap.fromTo(".menu-item-card",{y:24,autoAlpha:0},{y:0,autoAlpha:1,duration:.6,stagger:.06,ease:"expo.out"}); },[active]);
  const ac = categories.find(c => c.id===active);
  return (
    <section ref={ref} id="menu" className="py-24 md:py-36 bg-[#FDFAF6] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[.03]" style={{backgroundImage:"radial-gradient(circle at 20% 50%,#5ABFC0 0%,transparent 50%),radial-gradient(circle at 80% 20%,#F2B8C6 0%,transparent 40%)"}} />
      <div className="max-w-6xl mx-auto px-6">
        <div className="menu-heading text-center mb-16">
          <span className="text-[10px] uppercase tracking-[.3em] text-[#5ABFC0] font-semibold">What we serve</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#1B2A5E] mt-3 mb-4 tracking-tight" style={{fontFamily:"Georgia,serif"}}>The Menu</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#5ABFC0] to-[#F2B8C6] mx-auto rounded-full" />
        </div>
        <div className="menu-tabs flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => <button key={cat.id} onClick={() => setActive(cat.id)} className={`menu-tab px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${active===cat.id?"bg-[#1B2A5E] text-white shadow-lg shadow-[#1B2A5E]/20":"bg-white text-[#1B2A5E]/60 border border-[#1B2A5E]/10 hover:border-[#1B2A5E]/30 hover:text-[#1B2A5E]"}`}>{cat.name}</button>)}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {ac?.items.map(item => <div key={item.id} className="menu-item-card group bg-white rounded-2xl p-6 border border-[#1B2A5E]/06 hover:border-[#5ABFC0]/30 hover:shadow-lg hover:shadow-[#5ABFC0]/08 transition-all duration-500 cursor-default"><div className="flex items-start justify-between gap-4"><div className="flex-1"><div className="flex items-center gap-2 mb-1.5"><h3 className="font-semibold text-[#1B2A5E] text-base">{item.name}</h3>{item.tags.map(t => <span key={t} className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${TAG[t]??"bg-gray-100 text-gray-500"}`}>{t}</span>)}</div><p className="text-[#1B2A5E]/50 text-sm font-light leading-relaxed">{item.description}</p></div><span className="text-[#1B2A5E] font-bold text-base whitespace-nowrap tabular-nums">€{item.price}</span></div><div className="mt-4 h-[1px] bg-gradient-to-r from-[#5ABFC0]/0 via-[#5ABFC0]/40 to-[#F2B8C6]/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" /></div>)}
        </div>
        <p className="text-center text-[#1B2A5E]/40 text-sm mt-10 font-light">Menu rotates with the seasons. Ask your barista for today's specials.</p>
      </div>
    </section>
  );
}
