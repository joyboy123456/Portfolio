import { HeroSection } from "@/components/hero-section"
import { MasonryWaterfall } from "@/components/masonry-waterfall"

export default function HomePage() {
  return (
    <div className="max-w-[1360px] mx-auto px-6 md:px-10">
      {/* Hero区域：独立section */}
      <HeroSection />

      {/* 瀑布流：独立section */}
      <MasonryWaterfall />
    </div>
  )
}
