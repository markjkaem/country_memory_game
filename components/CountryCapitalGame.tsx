import React, { useState, useEffect } from "react";



export default function CountryCapitalGame() {

    //define states and data
    const [shuffledData, setShuffledData] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [errorItems, setErrorItems] = useState([])
    const COLLECTION_SIZE = 2
    const data= {Germany: "Berlin", Netherlands:"Amsterdam", France:"Paris", England:"London"}

    //create the shuffled data inside newData everytime page loads
    useEffect(() => {
        const newData = Object.entries(data).flat().sort(() => 0.5 - Math.random())
        setShuffledData(newData)
    }, [])

// change impl when we need to check more than a pair, quartet game?
const isValidCollection = (data, [item1, item2]) => data[item1] === item2 || data[item2] === item1

const isCollection = (items) => items.length === COLLECTION_SIZE

const isAlreadySelected = (clickedItems, item) => clickedItems.includes(item)


const isErrorItem = (errorItems, item) => errorItems.includes(item)


const isSelectedItem = (items, item) =>  items.includes(item)


const handleClick = (value) => {

    if (isAlreadySelected(selectedItems, value)){
        setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== value))
        return;
    }

    selectedItems.push(value)

    if (isCollection(selectedItems)) {

        if(isValidCollection(data, selectedItems)){
            // remove them from the shuffled data
            setShuffledData(shuffledData.filter(i => !selectedItems.includes(i)))

            // reset
            setSelectedItems([])
            return;
        }
        // put all in the error state and remove any clicked items
        setErrorItems([...selectedItems])
        setSelectedItems([])
        return;
    }
    setErrorItems([])
    setSelectedItems([...selectedItems])
}

const getColor = (clickedItems,errorItems, value) => {
    if (isErrorItem(errorItems, value)){
        return '#FF0000'
    }

    if (isSelectedItem(clickedItems, value)){
        return '#0000FF'
    }
    return null
}

const Button = ({value, onClick, color}) => {

    return (
        <button className="bg-slate-200 m-1 p-2 border-2border-spacing-1 border-black"
            onClick={()=> onClick(value)}
            style={{backgroundColor: color}}
        >{value}</button>
    )
}
    

    return <div>
        {shuffledData.length > 0 && shuffledData.map((element, index) => {
            return (
                <Button
                    value={element}
                    key={index}
                    onClick={handleClick}
                    color={getColor(selectedItems, errorItems, element)}
                />
            )
        })}

        {shuffledData.length === 0 && <p>Congratulations!</p>}
    </div>;
}
