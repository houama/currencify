import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeView from './HomeView';

function HomePage() {

    //--Make State--//

    const [dataCurrency, setDataCurrency] = useState([])
    const [optionCurrency, setOptionCurrency] = useState([])
    const [displaySelectedCurrency, setDisplaySelectedCurrency] = useState()
    const [selectedCurrency, setSelectedCurrency] = useState([])
    const [amount, setAmount] = useState(1)
    const [displayButton, setDisplayButton] = useState(false)
    const [displayAddButton, setDisplayAddButton] = useState(true)
    const [displayCurrList, setDisplayCurrList] = useState(false)


    //---Get API---//

    useEffect(() => {
    
        async function getAPI(){
            await axios.get(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_API_KEY}&symbols=USD,CAD,IDR,GBP,CHF,SGD,INR,MYR,JPY,KRW`)
            .then(res => {
                const data = res.data;
                Object.keys(data.rates).map((datas) => {
                    if(datas != 'USD'){
                        setOptionCurrency(optionCurrency => [...optionCurrency, datas])
                    }
                })
                
                    setDataCurrency(data)
            })
            .catch(err => {
                console.log(err)
            })
            }
            getAPI();
    }, [])

    
    //---FUNCTION---//

    function handleChange (e) {
        setDisplaySelectedCurrency(e.target.value)
        // console.log(e.target.value)
    }

    function handleSubmit () {
        setSelectedCurrency(selectedCurrency => [...selectedCurrency,displaySelectedCurrency])
        setDisplayButton(false)
        setDisplayCurrList(false)
        setDisplayAddButton(true)
        
        setOptionCurrency(optionCurrency.filter(optionDelete =>(optionDelete !== displaySelectedCurrency)))
    }

    function handleChangeAmount(e) {
        if(e.target.value >= 0){
            setAmount(e.target.value)
        }
    }


    function handleDelete (index){
        setSelectedCurrency(selectedCurrency.filter(currDelete =>(currDelete !== index)))
        setOptionCurrency(optionCurrency => [...optionCurrency,index])
    }

    function handleAdd(){
        setDisplayAddButton(false)
        setDisplayCurrList(true)
        setDisplayButton(true)

        setDisplaySelectedCurrency(optionCurrency[0])

    }

    //---Declare Variable to Accomodate Currency Option---//
    let curr_list

    //---If all currency option have been selected, user will get "No more options"---//
    if(optionCurrency.length != 0){
        curr_list = optionCurrency.map(currencies => (<option value={currencies}>{currencies}</option>))
    }else{
        curr_list = (<option>No more options</option>)
    }

    //---Declare variable and save currency alias---//
    const curr_alias = ['CAD - Canadian Dollars', 'IDR - Indonesian Rupiah', 'GBP - Pound Sterling', 'CHF - Swiss Franc', 'SGD - Singapore Dollars', 'INR - Indian Rupee', 'MYR - Malaysian Ringgit', 'JPY - Japanese Yen', 'KRW - South Korean Won']
    
    //---Return---//
        return (
                <HomeView
                    dataCurr = { dataCurrency }
                    inputAmount = { amount }
                    onChangeAmount = { handleChangeAmount }
                    onSelectedCurrency = { selectedCurrency }
                    currencyAlias = { curr_alias }
                    currencyDelete = { handleDelete }
                    addButton = { displayAddButton }
                    currList = { displayCurrList }
                    submitButton = { displayButton }
                    add = { handleAdd }
                    dispSelectedCurrency = { displaySelectedCurrency }
                    changeCurrency = { handleChange }
                    currencyList = { curr_list }
                    submit = { handleSubmit }
                />

        );
}

export default HomePage;