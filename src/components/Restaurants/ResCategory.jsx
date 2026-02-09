import ItemList from "./ItemList";
import { Card } from "../../ui";

const ResCategory = ({ data, showItems, setShowIndex }) => {
   

    const handleClick = () => {
        //setShowItems(!showItems);
        setShowIndex()

    }

    return (
        <div>
           {/* Header */}
           <Card className="mx-auto my-4 w-full max-w-3xl" variant="solid" size="md">
            <div className="flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">{data.title} ({data.itemCards.length})</span>
                <svg xmlns="http://www.w3.org/2000/svg" 
                    fill="none" viewBox="0 0 24 24" 
                    strokeWidth={1.5} stroke="currentColor" 
                    className="w-5 h-5 cursor-pointer text-gray-600"
                    onClick={() => handleClick() }>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
                {/* Accordian Body */}
                {showItems && <ItemList items={data.itemCards}/> }

           </Card>
        </div>
    )
}

export default ResCategory;
