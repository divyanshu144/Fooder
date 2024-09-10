import ItemList from "./ItemList";

const ResCategory = ({ data, showItems, setShowIndex }) => {
   

    const handleClick = () => {
        //setShowItems(!showItems);
        setShowIndex()

    }

    return (
        <div>
           {/* Header */}
           <div className="w-6/12 bg-gray-50 shadow-lg p-2 mx-auto my-4">
            <div className="flex justify-between">
                <span className="font-bold text-lg">{data.title} ({data.itemCards.length})</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} stroke="currentColor" 
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => handleClick() }>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
                {/* Accordian Body */}
                {showItems && <ItemList items={data.itemCards}/> }

           </div>
        </div>
    )
}

export default ResCategory;