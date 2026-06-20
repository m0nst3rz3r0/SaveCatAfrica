import { motion } from "motion/react";
import { MapPin } from "lucide-react";
import { useStories } from "../hooks/useSiteData";
import { formatCents } from "../lib/format";
import { SectionSkeleton } from "./SectionSkeleton";

export function RescueStoriesSection() {
  const stories = useStories();

  if (stories === undefined) {
    return (
      <section id="stories" className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SectionSkeleton className="h-96" />
            <SectionSkeleton className="h-96" />
          </div>
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  return (
    <section id="stories" className="py-24 bg-canvas">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-3 py-1 bg-terracotta/10 text-terracotta text-[10px] font-bold uppercase tracking-widest rounded mb-4">
            Rescue Stories
          </span>
          <h2 className="text-3xl md:text-5xl text-navy font-bold leading-tight">
            Cats We've Saved
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.article
              key={story._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-border-theme shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {story.imageUrl && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={story.imageUrl}
                    alt={story.catName}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-navy">{story.catName}</h3>
                  {story.location && (
                    <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted shrink-0">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-bold text-terracotta uppercase tracking-widest">
                  {story.title}
                </h4>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  {story.story}
                </p>
                {story.amountNeededCents != null && story.amountNeededCents > 0 && (
                  <p className="text-sm font-bold text-navy pt-2 border-t border-border-theme">
                    Still needed: {formatCents(story.amountNeededCents)}
                  </p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
