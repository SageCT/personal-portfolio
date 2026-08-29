import type { Metadata } from "next";
import { PhotoGallery } from "@/components/site/photo-gallery";
import { SectionHead } from "@/components/site/section-head";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { PHOTOS } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Photography · Sage Turner",
  description:
    "Photographs by Sage Turner — street, landscape, and film work from Philadelphia and beyond.",
};

export default function PhotographyPage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-6 pt-28 pb-16 md:px-14 md:pt-[132px] md:pb-24">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            index="/06"
            label={`${PHOTOS.length} frames`}
            title="Through the"
            titleAccent="lens."
            note="Digital and film, mostly after dark. Click any frame to open it."
          />
          <PhotoGallery photos={PHOTOS} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
