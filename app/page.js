'use client'
import Image from "next/image";
import { useState, useEffect } from 'react'; 
import { firestore } from "@/firebase";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { collection, deleteDoc, getDocs, query, getDoc, setDoc, doc } from "firebase/firestore";

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

  const removeItems = async (item) => {
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

  const addItem = async (item) => {
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
    <Box width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center" gap={2} flexDirection="column">

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{ transform:"translate(-50%, -50%)", }}>
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField variant="outlined" fullWidth value={itemName} onChange={(e) => {setItemName(e.target.value)}} />
              <Button variant="outlined" 
                      onClick={() =>{
                        addItem(itemName)
                        setItemName('')
                        handleClose()
                      }}>
              Submit
              </Button>
          </Stack>
        </Box>
      </Modal>

      <Button variant="contained" onClick={() =>{ handleOpen()}}>Add New Item</Button>
      <Box border="1px solid #333">
        <Box width="800px" height="100px" justifyContent="center" alignItems="center" display="flex" bgColor="#333">
          <Typography variant="h2" color="#333">Inventory Item</Typography>
        </Box>

        <Stack width="800px" height="300px" spacing={2} overflow="auto">
          {
            inventory.map(({name, quantity}) => {
              return (
                <Box key={name} width="100%" minHeight="150px" alignItems="center" display="flex" justifyContent="space-between" bgColor="f0f0f0" p={5}>
                  <Typography variant="h3" color="#333" textAlign="center">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                  <Typography variant="h3" color="#333" textAlign="center">{quantity}</Typography>
                  <Button variant="contained" onClick={() =>{ addItem(name) }}>Add</Button>
                  <Button variant="contained" onClick={() =>{ removeItems(name) }}>Remove</Button>
                </Box>
              )
            })
          }
        </Stack>
      </Box>

    </Box>
  );
}
