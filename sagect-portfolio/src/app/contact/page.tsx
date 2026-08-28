import type { Metadata } from "next";
import { ContactCard } from "@/components/site/contact-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHead } from "@/components/site/section-head";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { CHANNELS } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact · Sage Turner",
  description: "Get in touch with Sage Turner — email, GitHub, and LinkedIn.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 pt-28 pb-16 md:px-14 md:pt-[132px] md:pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            index="/05"
            label={`${CHANNELS.length} ways`}
            title="Get in"
            titleAccent="touch."
            note="Open to work, and quick to reply on any of these."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((channel) => (
              <Reveal
                key={channel.label}
                className="h-full"
                delay={0.04}
                y={32}
              >
                <ContactCard channel={channel} />
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
