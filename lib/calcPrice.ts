const calcPrice = (price: number, disc: number) =>{
    return Math.round((100-disc) * price /100)
  
}

export default calcPrice