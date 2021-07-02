import React from 'react'
import {
    Card, CardBody,
    CardTitle, CardSubtitle, Button,
  } from 'reactstrap';

function HomeView(props){
    const{
        dataCurr,
        inputAmount,
        onChangeAmount,
        onSelectedCurrency,
        currencyAlias,
        currencyDelete,
        addButton,
        currList,
        submitButton,
        add,
        dispSelectedCurrency,
        changeCurrency,
        currencyList,
        submit

    } = props

    //---Declare variable---//
    var usd_amount, converted_amount, converted_rate

    //---Make function to handle real-time update of converted currency based on exhcange rate from API and input amount in USD
    function handleUpdateCurrency (index) {
        usd_amount = inputAmount / dataCurr.rates[`USD`]
        converted_amount = (usd_amount * dataCurr.rates[`${index}`]).toFixed(2)

        converted_rate = ((1 / dataCurr.rates[`USD`]) * dataCurr.rates[`${index}`]).toFixed(2)
        

        // console.log(usd_amount)
        // console.log(converted_amount)
    }

    //---Return JSX to HomePage---//
    return(
        <div>
            <div className="container-sm my-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                    <Card>
                    <CardBody>
                    <CardTitle tag="h3">Currencify</CardTitle>
                    <CardSubtitle tag="h6" className="text-muted">Online Foreign Exchange Currency<br></br>From USD</CardSubtitle>
                    
                        <div className="row" style={{marginTop:"50px"}}>
                                <div className="col-md">
                                    <div className="text" style={{fontSize:"14px",float:"left"}}><i>USD - United State Dollars</i></div>
                                </div>
                        </div>
                        <div className="row">
                            <div className="col"> 
                                    <h5 style={{float:"left"}}>USD</h5>
                            </div>
                            <div className="col">
                                {/* Input amount of USD */}
                                <input type="number" className="input" value={inputAmount} min="1"  onChange={onChangeAmount} />
                            </div>

                        </div>
                        
                    <div className="row" style={{marginTop:"50px"}}>
                        <div className="col">

                            { onSelectedCurrency.map( (selected) => {


                                  handleUpdateCurrency(selected)

                                return (
                                    currencyAlias.map((alias) => {
                                        if(alias.includes(selected)){
      
                                            return (
                                                
                                                <div className="card gedf-card mt-3">
                                                    <div className="card-header">
                                                                <div className="mr-2">
                                                                    <div className="row" style={{marginTop:"50px"}}>
                                                                        <div className="col">
                                                                        
                                                                            <h5 style={{float:"left"}}>{selected}</h5>
                                                        
                                                                        </div>
                                                                    <div className="col">
                                                                        {/* Output amount of converted amount in form of several currencies */}
                                                                        <input type="number" className="input" value={converted_amount} disabled/>
                                                                    </div>
                                                                        
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            {/* Alias of currencies, ex: Indonesian Rupiah */}
                                                                            <div className="text" style={{fontSize:"14px",float:"left"}}><i>{alias}</i></div>
            
                                                                        </div>
                                                                    </div>  
                                                                    <div className="row">
                                                                        <div className="col">
                                                                            {/* Exchange rate of selected currency */}
                                                                            <div className="text" style={{fontSize:"14px",float:"left"}}><i>1 USD = {selected} {converted_rate}</i></div>

                                                                        </div>
                                                                        <div className="col">
                                                                            {/* Delete converted currency */}
                                                                            <Button type="submit" className="btn btn-danger" onClick={ () => currencyDelete(selected) } style={{marginTop:"10px"}} >Delete</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                    
                                                    </div>
                                                </div>
                                            )

                                        }
                                    
                                    }) 
                                )

                                }) 
                            }
                            {/* Add More Currencies Button */}
                                { addButton ? <Button  className="btn btn-info" onClick={add} style={{marginTop:"30px"}}><b>Add More Currencies</b></Button> : null }

                            {/* Dropdown list of currencies */}
                                { currList ? 
                                <div>
                                    <div className="row" style={{marginTop:"30px"}}>
                                        <div className="text">Please choose the currency</div>
                                    </div>
                                    <div className="row container">
                                        <select className="custom-select" value={dispSelectedCurrency} onChange={changeCurrency} style={{marginTop:"15px"}}> {currencyList} </select> 
                                    </div>
                                </div> : null }    
                                    
                            {/* Add Button */}
                                { submitButton ? <Button type="submit" className="btn btn-success" onClick={submit} style={{marginTop:"10px"}}>Add</Button> : null }

                   
                            </div>
                        </div>
                    </CardBody>
                        
                </Card>

            </div>
            </div>
            </div>
            </div>
        );
}

export default HomeView;