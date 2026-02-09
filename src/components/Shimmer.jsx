const Shimmer = () => {
    return (
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-6">
            {Array.from({ length: 12 }).map((_, idx) => (
                <div
                    key={idx}
                    className="h-[340px] w-[280px] animate-pulse rounded-2xl border border-white/60 bg-white/80 shadow-md"
                >
                    <div className="h-44 w-full rounded-t-2xl bg-gray-200" />
                    <div className="p-4 space-y-3">
                        <div className="h-4 w-2/3 rounded bg-gray-200" />
                        <div className="h-3 w-1/2 rounded bg-gray-200" />
                        <div className="h-3 w-3/4 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Shimmer;
