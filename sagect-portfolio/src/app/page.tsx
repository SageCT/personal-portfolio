import { About } from "@/components/site/about";
import { Hero } from "@/components/site/hero";
import { SelectedWork } from "@/components/site/selected-work";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { Toolkit } from "@/components/site/toolkit";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Toolkit />
        <SelectedWork />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
