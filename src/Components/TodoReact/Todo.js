import './style.css'
import React, { useState,useEffect } from 'react'

   // get local data back 
const getLocalData=()=>{
    const lists = localStorage.getItem("mytodoList");
    if(lists){
        return JSON.parse(lists);
    }else{
        return [];
    }
}


const Todo = () => {
    
    const [inputData,setInputData]=useState('');
    const [items,setItems]=useState(getLocalData());
    const [isEditItem,setIsEditItem]=useState('');
    const [toggleButton, setToggleButton] = useState(false);
    
    // add the items function
    const addItem=()=>{
        if(!inputData){
            alert("plz fill the data")
        }else if(inputData && toggleButton){
            setItems(
                items.map((currElem)=>{
                 if(currElem.id===isEditItem){
                    return{...currElem,name:inputData}
                 }
                 return currElem;
                })
            );
            setInputData([])
            setIsEditItem();
            setToggleButton(false);
        }
        else{
            const myNewInputData={
                id:new Date().getTime().toString(),
                name:inputData,
            }
            setItems([...items,myNewInputData])
            setInputData('')
        }
    };
    // how to edit 
    const editItem=(index)=>{
     const item_edit=items.find((currElem)=>{
      return currElem.id===index;
     });
    setInputData(item_edit.name)
    setIsEditItem(index);
    setToggleButton(true);
    }

    // Hoe to delete Items 
    const deleteItem=(index)=>{
      const updatedItem=items.filter((currElem)=>{
        return currElem.id!==index;
      });
      setItems(updatedItem)
    }

    // delete ALL 
    const removeAll=()=>{
        setItems([]);
    };

    // add localStorage 
    useEffect(()=>{
    localStorage.setItem('mytodoList',JSON.stringify(items));
    },[items]);

  return (
    <>
     <div className='main-div'>
        <div className='child-div'>
            <figure>
            <figcaption>Add your List Here</figcaption> 
            </figure>
            <div className='addItems'>
             <input type='text' placeholder='Add Items'
             className='form-control' value={inputData}
             onChange={(e)=>setInputData(e.target.value)}/>
             {toggleButton?( <i className="far fa-edit add-btn" onClick={addItem}></i>)
             :( <i className="fa fa-plus add-btn" onClick={addItem}></i>)}
            </div>
             {/* shows our items */}
             <div className='showItems'>
                {items.map((currElem,index)=>{
                    return (
                        <div className='eachItem' key={currElem.id}>
                        <h3>{currElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add-btn" onClick={()=>editItem(currElem.id)}></i>
                        <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                        </div>
    
                    </div>
                    )
                })}
              

             </div>

            {/* Remove all btn */}
            <div className='showItems'>
                <button className='btn' onClick={removeAll}>
                  Remove All
            </button>

            </div>
        </div>

     </div>
    </>
  )
}

export default Todo