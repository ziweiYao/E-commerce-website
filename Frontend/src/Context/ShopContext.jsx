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
//这就是最开始cart，所有的物品其实都在里面，但是他们的数量都为0，其实更好的方式是让他为空对象，然后用？？来识别undefined，
// 这样就可以做到在完全空的cart里一个一个字典的加，缺点是如果id起乱套了，那这个cart的修改也乱套了，好处是如果你有超过一万的商品的话
//不用自动生成一个一万长度的字典，而是一个一个加
//const [cartItems,setCartItems] = useState(getDefaultCart());
//const addToCart = (itemId) =>{
//    setCartItems( (prev) => (
//    {  ...prev, [itemId]: (prev[itemId] ?? 0) + 1}
//    )); 
//}


//const [cartItems,setCartItems] = useState(getDefaultCart());
//const addToCart = (itemId) =>{
//    setCartItems( (prev) => (
//    {  ...prev, [itemId]: (prev[itemId] - 1 ?? 0)}
//    )); 

//就像这样，利用空值合并运算符 ??，“如果左边是 null/undefined，就用右边的替代值”。将之前没有创建的key生成并赋值1，然后给它加1   1
//const removeFromCart = (itemId) => {
//  setCartItems(prev => {
//    const nextQty = (prev[itemId] ?? 0) - 1;
//    if (nextQty > 0) {
//      return { ...prev, [itemId]: nextQty };
//    } else {
//      const { [itemId]: originalQty, ...rest } = prev; // 删除该键
//      return rest;
//    }
//  });
//};
//同理我们也可以搓出更好的removeFromCart，如果nextQty 小于等于0，那么我们就删除此键， 
//const { [itemId]: originalQty, ...rest } = prev; 可以改为
//const { [itemId]: _, ...rest } = prev;  因为orginalQty只是我为了方便记录javaScript的pattern matching功能的演示。

const ShopContextProvider = (props) => {
    
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const addToCart = (itemId) =>{
        setCartItems((prev)=>{
            return {...prev, [itemId]:prev[itemId]+1 }
        })
    }

    const removeFromCart = (itemId) =>{
        setCartItems( (prev) => ( 
            {...prev, [itemId]:prev[itemId]-1}
        ))
    }
    /*
    在这里，...prev是作为旧对象的展开拷贝，注意他们都在一个{}里，也就是说，我把旧的数据都先拷贝到新创建的一个对象也就是这个{}，
    并且在后面加了 key 为[itemId], 内容为prev[itemId]（对象名[key]格式，等于 对象名.key，
    但是这里是更新,itemId作为key不固定，必须用 对象名[key]的格式。） 如果 prev[itemId]已经存在,就会被覆盖，如果不在就会新加，
    但是我们的代码的value prev[itemId]被-1了，所以我们可能会有报错风险，不过不要紧 因为在getDefaultCart我们已经把每个item
    都给生成在cart里了并且赋值为0了 所以 prev[itemId] 100%有值，除非输入的itemId本来就是虚构的，不来自于alldata
    */    
    const getToltalCartAmount = () =>{
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let currentItem = all_product.find((product)=> product.id === Number(item));
                totalAmount += currentItem.new_price * cartItems[item];
            }
        }
        return totalAmount
    }

    const getTotalCartItems = React.useMemo(() => {
        let count = 0;
        for(let item in cartItems){
        if(cartItems[item] > 0 ){
            count += cartItems[item]
        }}
        return count;
    },[cartItems]);


    const contextValue= { all_product, cartItems, addToCart, removeFromCart, getToltalCartAmount,getTotalCartItems};

        return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;