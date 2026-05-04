"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Cake, Gift, ChevronRight, ImageIcon, Sparkles } from "lucide-react";

const upcomingEvents = [
    {
        id: "1",
        name: "Christopher Nolan",
        role: "Director",
        event: "Birthday",
        date: "July 30",
        image: "https://image.tmdb.org/t/p/w500/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
        fallbackImage: "/placeholder-person.jpg",
        notableWorks: ["Oppenheimer", "Inception", "Interstellar"],
    },
    {
        id: "2",
        name: "Inception",
        event: "14th Anniversary",
        date: "July 16",
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uc4.jpg",
        fallbackImage: "/placeholder-movie.jpg",
        type: "movie",
    },
    {
        id: "3",
        name: "Margot Robbie",
        role: "Actor",
        event: "Birthday",
        date: "July 2",
        image: "https://image.tmdb.org/t/p/w500/euDPyqLnuwaWMHajcU3oP9G07yT.jpg",
        fallbackImage: "/placeholder-person.jpg",
        notableWorks: ["Barbie", "Wolf of Wall Street", "I, Tonya"],
    },
];

export default function UpcomingEvents() {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (id: string) => {
        setImageErrors(prev => ({ ...prev, [id]: true }));
    };

    return (
        <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium">Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-7 h-7 text-rose-500" />
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            This Month in Cinema
                        </h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                        Discover the latest events and celebrations in the world of cinema
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map((event) => (
                        <div key={event.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-shadow">
                            <div className="flex gap-3">
                                {/* Image with Fallback */}
                                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                                    {!imageErrors[event.id] ? (
                                        <Image
                                            src={event.image}
                                            alt={event.name}
                                            fill
                                            className="object-cover"
                                            onError={() => handleImageError(event.id)}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <ImageIcon className="w-6 h-6 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                {/* Rest of your component remains the same */}
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {event.name}
                                            </h3>
                                            {"role" in event && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {event.role}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm">
                                            {event.event === "Birthday" ? (
                                                <Cake className="w-4 h-4 text-pink-500" />
                                            ) : (
                                                <Gift className="w-4 h-4 text-purple-500" />
                                            )}
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                {event.event}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-rose-500 font-medium mt-1">{event.date}</p>
                                    {"notableWorks" in event && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {event.notableWorks?.slice(0, 2).map((work) => (
                                                <span key={work} className="text-xs px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                                                    {work}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}