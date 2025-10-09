import React, {createContext, useState} from 'react'
import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null)

// 这是一个箭头function，getDefaultCart是名字， 因为他= 右边的function（）为输入， 箭头后{... return （值）}为内容
// 如果箭头函数使用圆括号，如下 const 函数名 = () => () 而不是 => {}的话，就不需要 return，默认读取最后一个值，
// 如果使用花括号{}那必须有一个return在里面
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_product.length+1; index++){
        cart[index] = 0;
        //要注意一点，cart[index]并不是array的index，而是用index这个数字作为键key，创建了一个字典属性
        //也就是运行到 index = 1 的时候， 那么之前cart {0：0}里就变成 {0：0, 1 ：0}这个样子了 而不是 cart的第一个index 赋值为0
        //注意 假如 index = 1，cart[1]是对象 cart.1的同义，但是index是一个持续变化的value, 不能直接说“cart.index”
        //不然cart里其实没有 index，只有 0，1，2，3，4 这些id 就像 person.name一样 cart.index会去尝试寻找index这个键
        //所以我们只能使用 “cart[index]= （内容）” 来覆盖，或者添加键和它的值。cart，不是array
    }
    return cart
}


const ShopContextProvider = (props) => {
    
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const addToCart = (itemId) =>{
        setCartItems((prev)=>{
            return {...prev, [itemId]:prev[itemId]+1 }
        })
    }
    /*
    在这里，...prev是作为旧对象的展开拷贝，注意他们都在一个{}里，也就是说，我把旧的数据都先拷贝到新创建的一个对象也就是这个{}，
    并且在后面加了 key 为[itemId], 内容为prev[itemId]（对象名[key]格式，等于 对象名.key，
    但是这里是更新,itemId作为key不固定，必须用 对象名[key]的格式。） 如果 prev[itemId]已经存在,就会被覆盖，如果不在就会新加，
    但是我们的代码的value prev[itemId]被-1了，所以我们可能会有报错风险，不过不要紧 因为在getDefaultCart我们已经把每个item
    都给生成在cart里了并且赋值为0了 所以 prev[itemId] 100%有值，除非输入的itemId本来就是虚构的，不来自于alldata
    */
    const reomveFromCart = (itemId) =>{
        setCartItems( (prev) => ( 
            {...prev, [itemId]:prev[itemId]-1}
        ))
    }
    

    const contextValue= { all_product , cartItems, addToCart, reomveFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;