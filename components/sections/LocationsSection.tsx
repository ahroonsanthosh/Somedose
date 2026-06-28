"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
interface Location { id: string; name: string; address: string; eircode: string; handle: string; slug: string; images: string[]; }
export default function LocationsSection({ locations }: { locations: Location[] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".loc-heading",{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".loc-heading",start:"top 85%"}});
      gsap.fromTo(".loc-card",{y:60,autoAlpha:0},{y:0,autoAlpha:1,duration:.9,stagger:.15,ease:"expo.out",scrollTrigger:{trigger:".loc-cards",start:"top 80%"}});
    },ref);
    return () => ctx.revert();
  },[]);
  return (
    <section ref={ref} id="locations" className="py-24 md:py-36 bg-[#1B2A5E] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#5ABFC0]/08 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#F2B8C6]/06 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="loc-heading text-center mb-16">
          <span className="text-[10px] uppercase tracking-[.3em] text-[#5ABFC0] font-semibold">Find us</span>
          <h2 className="text-4xl md:text-6xl font-bold text-[#FDFAF6] mt-3 mb-4 tracking-tight" style={{fontFamily:"Georgia,serif"}}>Three Locations</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#5ABFC0] to-[#F2B8C6] mx-auto rounded-full" />
        </div>
        <div className="loc-cards grid md:grid-cols-3 gap-6">
          {locations.map(loc => <Link key={loc.id} href={`/locations/${loc.slug}`} className="loc-card group block relative rounded-3xl overflow-hidden cursor-pointer" style={{height:"420px"}}><img src={loc.images[0]} alt={loc.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0d1a3a]/95 via-[#0d1a3a]/40 to-transparent" /><div className="absolute top-5 left-5"><span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold">{loc.eircode}</span></div><div className="absolute bottom-0 left-0 right-0 p-6"><div className="flex items-center gap-2 mb-2"><MapPin className="w-3.5 h-3.5 text-[#5ABFC0]" /><span className="text-[#5ABFC0] text-[10px] uppercase tracking-widest font-semibold">{loc.handle}</span></div><h3 className="text-white text-xl font-bold mb-1 tracking-tight" style={{fontFamily:"Georgia,serif"}}>{loc.name}</h3><p className="text-white/50 text-sm mb-4">{loc.address}</p><div className="flex items-center gap-2 text-[#5ABFC0] text-sm font-semibold group-hover:gap-3 transition-all"><span>Explore location</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div></div><div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5ABFC0] to-[#F2B8C6] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" /></Link>)}
        </div>
      </div>
    </section>
  );
}
