import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "../shadcnComponents/ui/form";
import { Button } from "../shadcnComponents/ui/button";
import { Input } from "../shadcnComponents/ui/input";
import {Popover, PopoverTrigger, PopoverContent} from "../shadcnComponents/ui/popover"
import {
    Card,
    CardContent,
  } from "../shadcnComponents/ui/card"
  
import { useForm } from "react-hook-form";
import { db } from "../firebase/Firebase";
import { collection,addDoc,getDocs,deleteDoc, doc,updateDoc} from "firebase/firestore";
import { useState,useEffect } from "react";

function AddTransactions() {
    const reactForm = useForm();
    const updateForm = useForm();
    const [expenses,setExpenses] = useState([])
    const [submissionCount,setSubmissionCount] = useState(0)
    const [currentExpense,setCurrentExpense] = useState(null)


    const onFormSubmission = async (expenseData) => {
        if (!expenseData) {
            throw new Error("expenseData did not receive")
        }
        
            try {
                
                const docRef = await addDoc(collection(db,"expenses"),{
                    
                    expense: expenseData.Name,
                    amount: expenseData.Price,
                    date: expenseData.Date,
                    
                })

                setSubmissionCount(submissionCount + 1)
            } catch (error) {
                console.log(error.message)

            } 
        

    };

    const onUpdateSubmission = async (expenseData) => {
        try {
            if (!expenseData || !currentExpense) {
                throw new Error("Expenses could not found")
            }
            const docRef = doc(db,"expenses",currentExpense.id)
            console.log(docRef);
            await updateDoc(docRef,{
                    expense: expenseData.Name,
                    amount: expenseData.Price,
                    date: expenseData.Date
            })
            setCurrentExpense(null)
            setSubmissionCount(submissionCount + 1)
        } catch (error) {
            console.log(error.message)
        }
    }

    async function handleDelete(id) {
        
        try {
            
            await deleteDoc(doc(db,"expenses",id));
            setSubmissionCount(submissionCount + 1)


        } catch (error) {
            console.log(error.message)
        }

    }

    async function handleUpdate(expense){
        setCurrentExpense(expense)
        updateForm.reset({
                    
            Name: expense.expense,
            Price: expense.amount,
            Date: expense.date
        })

    }

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allExpensesData = []
                const getAllExpenses = await getDocs(collection(db,"expenses"))
                getAllExpenses.forEach((expense) => {
                    allExpensesData.push({id:expense.id,...expense.data()})
                })
                setExpenses(allExpensesData)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    },[submissionCount])

    
    return (
        <Form {...reactForm}>
            <form onSubmit={reactForm.handleSubmit(onFormSubmission)} className="bg-gray-600 flex gap-8 items-center justify-evenly m-4 p-4">
                <FormField
                    control={reactForm.control}
                    name="Name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-center items-center text-xl">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Expense" {...field}  />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={reactForm.control}
                    name="Price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-center items-center text-xl">Price</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Price" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={reactForm.control}
                    name="Date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex justify-center items-center text-xl">Date</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Date" {...field} type="date"  />
                            </FormControl>
                        </FormItem>
                    )}
                />
            <br />
                <Button type="submit" className="flex justify-center items-center mt-6">Add Transaction</Button>

                
            </form>
            {expenses.map((expense,index) => (
                    <div key={index} className="bg-gray-400 flex gap-1 items-center justify-around text-xl m-2 p-2">
                    
                    <h3>Expense: {expense.expense}</h3>
                    <h3>Amount: {expense.amount}</h3>
                    <h3>Date: {expense.date}</h3>
                    <Button type="button" 
                    onClick={() => handleDelete(expense.id)}>Remove Expense</Button>
                    <Popover>
                <PopoverTrigger>

                    <Button type="button" onClick={() => handleUpdate(expense)}>Update Expense</Button>
                </PopoverTrigger>
                <PopoverContent className="w-full max-w-3xl p-6">
                    <Card>
                        <CardContent>
                <Form {...updateForm}>
                                <form onSubmit={updateForm.handleSubmit(onUpdateSubmission)} className="bg-gray-600 flex gap-8 items-center justify-evenly m-4 p-4">
                                    <FormField
                                        control={updateForm.control}
                                        name="Name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-center items-center text-xl">Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Expense" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updateForm.control}
                                        name="Price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-center items-center text-xl">Price</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Price" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={updateForm.control}
                                        name="Date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex justify-center items-center text-xl">Date</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Date" {...field} type="date" />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" className="flex justify-center items-center mt-6">Update Transaction</Button>
                                </form>
                            </Form>
                            </CardContent>
                            </Card>
                </PopoverContent>
                    </Popover>
                
                    </div>
                ))}
        </Form>
        
    );
}

export default AddTransactions;























