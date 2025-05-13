// Timeline.tsx
import { motion } from "framer-motion";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

const Timeline = () => {
const timelineEvents: TimelineEvent[] = [
    {
        year: 2021,
        title: "B.Tech AI at Amrita School of Engineering",
        description: "Specialized in artificial intelligence and machine learning technologies.",
    },
    {
        year: 2024,
        title: "Synopsys - Intern",
        description: "Created an application for data management workflows and improved efficiency using advanced Excel and VBA techniques.",
    },
    
    {
    year: 2025,
    title: "Value Health - GenAI Engineer",
    description: "Built a React based LLM voice agent for human-like calls to automate bookings, reschedules, cancellations, and info via PostgreSQL.",
    },

];

  const centralPathColor = "bg-slate-400 dark:bg-slate-600";
  const dotColor = "bg-indigo-500 dark:bg-indigo-400";
  // Define RGB for indigo-500 if not available as CSS var for box-shadow
  // You might need to adjust this based on your exact indigo-500 shade
  const dotGlowColorRgb = "99, 102, 241"; // Approx. for Tailwind's indigo-500

  const timelineContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.4, delayChildren: 0.2 },
    },
  };

  const itemVariants = (isEven: boolean) => ({
    hidden: { opacity: 0, x: isEven ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  });

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.4, ease: "backOut", delay: 0.3 } },
  };

  return (
    <motion.div
      variants={timelineContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative w-full max-w-2xl mx-auto mt-16 mb-20 px-4 sm:px-6 lg:px-8"
    >
      <div
        className={`absolute left-1/2 top-0 bottom-0 w-[2px] sm:w-[3px] transform -translate-x-1/2 z-0 ${centralPathColor}`}
      />

      {timelineEvents.map((event, index) => {
        const isEven = index % 2 === 0;

        return (
          <motion.div
            key={index}
            variants={itemVariants(isEven)}
            className={`mb-12 sm:mb-16 w-full flex relative group ${
              isEven ? "justify-start" : "justify-end"
            }`}
          >
            <motion.div
              variants={dotVariants}
              className={`absolute top-1/2 transform -translate-y-1/2 
                           w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full 
                           z-10 border-2 border-gray-50 dark:border-gray-900 
                           ${dotColor}
                           group-hover:scale-125 transition-all duration-300
                           ${isEven ? "left-[calc(50%-8px)] sm:left-[calc(50%-9px)]" : "right-[calc(50%-8px)] sm:right-[calc(50%-9px)]"}`}
              style={{
                // Dynamic shadow for glow on hover - adjust color and spread as needed
                // boxShadow: "0 0 0px 0px rgba(0,0,0,0)", // Initial state for transition
              }}
              // Apply hover style directly or via a more complex variant if needed
              // For simplicity, using Tailwind group-hover on className for scale
              // and can add a shadow class via group-hover if preferred over inline style for hover
            >
              {/* Glow effect can be achieved with box-shadow on hover */}
              <div className={`absolute inset-0 rounded-full group-hover:shadow-[0_0_15px_3px_rgba(${dotGlowColorRgb},0.6)] transition-shadow duration-300`}/>
            </motion.div>

            <div
              className={`w-[calc(50%-2.5rem)] sm:w-[calc(50%-3rem)] 
                           ${isEven ? "ml-[calc(50%+2.5rem)] sm:ml-[calc(50%+3rem)]" : "mr-[calc(50%+2.5rem)] sm:mr-[calc(50%+3rem)]"}
                           group-hover:-translate-y-1 transition-all duration-300`}
            >
              <div
                className="bg-slate-700/90 dark:bg-slate-800/80 backdrop-blur-md p-5 sm:p-6 rounded-xl 
                           shadow-lg group-hover:shadow-xl 
                           border border-slate-600/50 dark:border-slate-700/50 
                           group-hover:border-indigo-500/70 dark:group-hover:border-indigo-400/70 
                           transition-all duration-300"
              >
                <span className="text-xs sm:text-sm font-semibold text-indigo-400 dark:text-indigo-300 block mb-1.5 text-right">
                  {event.year}
                </span>
                <h3 className="text-md sm:text-lg font-semibold text-slate-100 dark:text-white mb-1.5 sm:mb-2">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Timeline;