'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'; 
import { firestore } from "@/firebase";
import { Box, Typography } from "@mui/material";
import { collection, deleteDoc, getDocs, query } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

  const updateInventory = async () => {
    const snapshot= query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc)=> {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
  }

  const removeItems = async () => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, {quantity: quantity - 1})
      }
    }

    await updateInventory()
  }

  const addItem = async () => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)

    if(docSnap.exists()){
      const {quantity} = docSnap.data()
      await setDoc(docRef, {quantity: quantity + 1})
    }else{
      await setDoc(docRef, {quantity: 1})
    }

    await updateInventory()
  }

  // model function
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(close)

  //update when page load
  useEffect(() => {
    updateInventory()
  }, [])

  return (
    <Box>
      <Typography variant="h1"> inventory Management</Typography>
      {
        inventory.forEach((item) =>{
          return(
            <>
            {item.name}
            {item.quantity}
            </>
          )
        })
      }
    </Box>
  );
}
