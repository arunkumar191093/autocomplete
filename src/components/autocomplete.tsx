import React, { useState } from "react";

type AutocompleteProps = {
  placeholder: string;
  initialValues: string[]
}

const Automcomplete = ({
  placeholder,
  initialValues = []
}: AutocompleteProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [listItems, setListItems] = useState<string[]>(initialValues.slice(0, 5));
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleInputClick = () => {
    setShowList(true);
  }

  const filterListFromText = (text: string) => {
    return initialValues?.filter(val => val.toLowerCase().includes(text.toLowerCase()));
  }

  const handleInputChange = (val: string) => {
    setSearchText(val);
    if (val) {
      setShowList(false);
      const filtered = filterListFromText(val);
      setListItems([...filtered]);
      setShowList(true);
    } else {
      setListItems(initialValues.slice(0, 5));
    }
  }

  const handleItemClick = (e: any) => {
    console.log(e.target?.textContent);
    const selected: string = e.target?.textContent;
    const idx = selectedItems.findIndex(ele => ele === selected);
    const selectedCopy = [...selectedItems];
    if (idx === -1) {
      selectedCopy.push(selected);
    } else {
      selectedCopy.splice(idx, 1);
    }
    console.log('selectedCopy', selectedCopy)
    setSelectedItems([...selectedCopy])
  }

  return (
    <div>
      <div className="input-box-wrapper">
        <input type="text" placeholder={placeholder}
          className="input-box"
          value={searchText}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleInputClick}
        // onBlur={() => setShowTopFive(false)}
        />
        <div id="selected-items" className="selected-items-wrapper">
          {
            selectedItems?.map((item, idx) => (
              <span key={`${item}-${idx}`}>{item}</span>
            ))
          }
        </div>
      </div>
      {
        showList &&
        <div id="list-wrapper" className="list-wrapper">
          <div id="opacity" className="dropdown-opacity" onClick={() => setShowList(false)}></div>
          <ul onClick={(e) => handleItemClick(e)} className="list-items">
            {
              listItems?.map((value: string, idx: number) => (
                <li key={`${value}-${idx}`}>{value}</li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default Automcomplete;