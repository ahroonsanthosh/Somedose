"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);
interface Hours { [key: string]: { open: string; close: string } }
const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
const DL: Record<string,string> = { monday:"Monday",tuesday:"Tuesday",wednesday:"Wednesday",thursday:"Thursday",friday:"Friday",saturday:"Saturday",sunday:"Sunday" };
const isToday = (d: string) => ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()]===d;
export default function HoursSection({ hours }: { hours: Hours }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".hours-heading",{y:40,autoAlpha:0},{y:0,autoAlpha:1,duration:1.2,ease:"expo.out",scrollTrigger:{trigger:".hours-heading",start:"top 85%"}});
      gsap.fromTo(".hours-row",{x:-20,autoAlpha:0},{x:0,autoAlpha:1,duration:.6,stagger:.07,ease:"expo.out",scrollTrigger:{trigger:".hours-table",start:"top 80%"}});
    },ref);
    return () => ctx.revert();
  },[]);
  return (
    <section ref={ref} id="hours" className="py-24 md:py-36 bg-[#FDFAF6] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(ellipse at 50% 100%,rgba(90,191,192,.06) 0%,transparent 60%)"}} />
      <div className="max-w-2xl mx-auto px-6">
        <div className="hours-heading text-center mb-16">
          <span className="text-[10px] uppercase tracking-[.3em] text-[#5ABFC0] font-semibold">Come visit</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B2A5E] mt-3 mb-4 tracking-tight" style={{fontFamily:"Georgia,serif"}}>Opening Hours</h2>
          <div className="w-12 h-[2px] bg-gradient-to-r from-[#5ABFC0] to-[#F2B8C6] mx-auto rounded-full" />
        </div>
        <div className="hours-table bg-white rounded-3xl border border-[#1B2A5E]/06 overflow-hidden shadow-xl shadow-[#1B2A5E]/04">
          {DAYS.map((day,i) => { const h=hours[day]; const today=isToday(day); return (
            <div key={day} className={`hours-row flex items-center justify-between px-7 py-4 transition-colors ${today?"bg-[#1B2A5E]":i%2===0?"bg-white":"bg-[#FDFAF6]"} ${i<DAYS.length-1?"border-b border-[#1B2A5E]/05":""}`}>
              <div className="flex items-center gap-3">{today&&<div className="w-1.5 h-1.5 rounded-full bg-[#5ABFC0] animate-pulse" />}<span className={`font-medium text-sm ${today?"text-white":"text-[#1B2A5E]"}`}>{DL[day]}</span>{today&&<span className="text-[9px] uppercase tracking-widest text-[#5ABFC0] font-bold">Today</span>}</div>
              <span className={`text-sm tabular-nums ${today?"text-[#5ABFC0] font-semibold":"text-[#1B2A5E]/60"}`}>{h.open} - {h.close}</span>
            </div>
          ); })}
        </div>
        <p className="text-center text-[#1B2A5E]/40 text-sm mt-6 font-light">Hours consistent across all three Cork locations.</p>
      </div>
    </section>
  );
}
