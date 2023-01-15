import Head from 'next/head'
// remove unused imports
import Image from 'next/image'
import {Inter} from '@next/font/google'
import React, {useEffect, useState} from "react";
import styled from "styled-components";


// When you are finished with going through this code you can ask them what else they can do to make the project better
// Things like linters, stricter typescript rules, tests and project conventions for like git would be good answers
// You can ask them how long it would take them to refactor everything
// I would say between 8 and 12 hours would be normal if they say anything under 4 hours it would be a sign that they are overselling themselves

// This is not a good naming convention
// It would be good to great a component like Heading or Title
// Components should be in a separate folder and not in the /pages folder, but like in src/components
// Create variables for colors
const StyledH1 = styled.h1`
  font-family: serif;
  font-size: 2rem;
  color: #22262b;
`

const SubTitle = styled.h1`
  font-family: serif;
  font-size: 1.5rem;
  color: #1b304a;
`

// It would be best to create a Form component that can change styles and items based on props
const StyledProductForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;

  // with styled components it's not best practice to select items like this but you need to create another styled component
  button {
    background-color: aqua;
    margin-top: 1rem;
  }
`;


const StyledAboutForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: auto;
  background-color: cornsilk;

  // with styled components it's not best practice to select items like this but you need to create another styled component
  button {
    background-color: cornflowerblue;
    margin-top: 1rem;
  }
`

// the candidate doesn't have this but it would be best practice
type States = 'New' | 'Used' | 'Broken';

interface Products {
    id: number;
    title: string;
    price: number;
    // this can be made more specific with a type like above
    state: 'string'
    // like this:
    // state: States
}

// this data will probably come from the backend but if they want to improve it in a different way then it should go to its own file
const productList = [
    {
        id: 1,
        title: 'Car',
        price: 393929,
        state: 'New'
    },
    {
        id: 2,
        title: 'Plane',
        price: 32423424232,
        state: 'Used'
    },
    {
        id: 3,
        title: 'Helicopter',
        price: 4443,
        state: 'New'
    },
    {
        id: 4,
        title: 'Sail boat',
        price: 3554334,
        state: 'Broken'
    },
    {
        id: 5,
        title: 'Motor Cycle',
        price: 7655,
        state: 'New'
    },
    {
        id: 6,
        title: 'Bicycle',
        price: 786,
        state: 'New'
    },
    {
        id: 7,
        title: 'Scooter',
        price: 22,
        state: 'Broken'
    },
]

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;

  li {
    margin-right: 10px;
    // this is very bad practice with styled components, unless you have to style a library never use classes
    // if someone doesnt catch this they probably dont know best practices with styled components
    .about-link {
      font-weight: bold;
    }
  }
`;

interface UserInfoProps {
    firstName: string;
    lastName: string;
    password: string;
    notes: string;
    // in typescript, we need to prevent using 'any' a more practiced react developer would use ReactNode here or create a component with the React.FC type (see below)
    children?: any;
    // the question mark is to make a prop optional, they should know that
    color?: string;
}

// We only need the color prop from the UserInfoProps so they can solve this in a better way
// Either by doing this <{color: string}> or more advanced: Pick<UserInfoProps, "color">
const StyledList = styled.ul<UserInfoProps>`
  color: ${props => props.color ? props.color : 'green'}
`

// they could create a return type here like React.FC, which has children included. or :ReactElement
const UserInfo = ({children, notes, password, lastName, firstName, color}: UserInfoProps) => {
    return (
        <div>
            <StyledList notes={notes} password={password} lastName={lastName} firstName={firstName} color={color}>
                <li>{firstName}</li>
                <li>{lastName}</li>
                <li>{notes}</li>
                <li>{password}</li>
            </StyledList>
            {children}
        </div>
    )
}


type routes = 'home' | 'products' | 'about'

export default function Home() {
    // this is a very bad way to handle routing, in nextjs we create routing based on folder/file structure
    // so they need to put new pages in the /pages folder
    const [currentPage, setCurrentPage] = useState<routes>('home');

    // both these useState can be replaced with a useReducer and be placed in a separate Form component
    const [productFormInputs, setProductFormInputs] = useState({
        productName: '',
        productPrice: '',
        productNumber: '',
        notes: ''
    });

    const [aboutFormInputs, setAboutFormInputs] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
        notes: ''
    });


    return (

        // this div should be replaced with an empty tag like so <>
        <div>
            {/*this head will very likely be used on every page so it can be made into a component */}
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                {/* This image needs to be replaced with a nextjs Image tag and it's missing an alt */}
                <img src='/images/logo.png' style={{'width': '200px', 'height': '100px'}}/>
                <StyledH1>Company</StyledH1>
                {/* mentioned above that this routing is bad */}
                <StyledMenu>
                    <li>
                        <a onClick={() => setCurrentPage('home')}>Home</a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentPage('products')}>Products</a>
                    </li>
                    <li>
                        <a className={'about-link'} onClick={() => setCurrentPage('about')}>About</a>
                    </li>
                </StyledMenu>
            </div>

            {
                currentPage === 'home' && (
                    // replace div with section
                    <div>
                        {/* If they had noticed above this is an h1 tag and there should only be 1 h1 on any page */}
                        {/* If you create a component for this then you can decide with a prop if it should be an h1, h2 etc */}
                        <SubTitle>Home</SubTitle>
                        <UserInfo firstName={'John'} lastName={'Doe'}
                                  notes={'This is a note'} password={'password'} color={'pink'}/>
                        {/* in nextjs it's best practice to use the nextjs Link component */}
                        <a href='/about'>Go to about page</a>
                    </div>
                )
            }

            {
                currentPage === 'products' && (
                    <div>
                        <SubTitle>Products</SubTitle>
                        <StyledProductForm>
                            <label>Product name</label>
                            {/* if they would use a useReducer the onChange wouldn't look so messy */}
                            {/* if they dont know about the useReducer hook then atleast the function in onChange needs to be extracted and made reusable */}
                            <input name='productName' value={productFormInputs.productName}
                                   onChange={(e) => setProductFormInputs({
                                       ...productFormInputs,
                                       [e.target.name]: e.target.value
                                   })}/>
                            {/*All these labels need an `htmlFor` and the input needs to have an id that matched the htmlFor */}
                            <label htmlFor={'productPrice'}>Product price</label>
                            <input id={'productPrice'} name='productPrice' value={productFormInputs.productPrice}
                                   onChange={(e) => setProductFormInputs({
                                       ...productFormInputs,
                                       [e.target.name]: e.target.value
                                   })}/>
                            <label>Product number</label>
                            <input name='productNumber' value={productFormInputs.productNumber}
                                   onChange={(e) => setProductFormInputs({
                                       ...productFormInputs,
                                       [e.target.name]: e.target.value
                                   })}/>
                            <label>Notes</label>
                            <input name='notes' value={productFormInputs.notes} onChange={(e) => setProductFormInputs({
                                ...productFormInputs,
                                [e.target.name]: e.target.value
                            })}/>
                            <button>Submit</button>
                        </StyledProductForm>

                        <div>
                            {productList.map((product, index) => {
                                    return (
                                        // it's very bad practice to use the index as a key
                                        // if they dont catch this they are probably juniors, even the console will give you warnings when you do this
                                        // you should use a unique identifier coming from the data, in this case product.id
                                        <div key={index}>
                                            <h1>{product.title}</h1>
                                            <div>{product.state}</div>
                                            <div>{product.price}</div>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>
                )
            }

            {
                currentPage === 'about' && (
                    //  this is basically the same as above but I wanted to show all this extra repeated code so they know for sure to create a component
                    <div>
                        <SubTitle>About</SubTitle>
                        <StyledAboutForm>
                            <label>First name</label>
                            <input name={'firstName'} value={aboutFormInputs.firstName}
                                   onChange={(e) => setAboutFormInputs({
                                       ...aboutFormInputs,
                                       [e.target.name]: e.target.value
                                   })}/>
                            <label>Last name</label>
                            <input name={'lastName'} value={aboutFormInputs.lastName} onChange={(e) => setAboutFormInputs({
                                ...aboutFormInputs,
                                [e.target.name]: e.target.value
                            })}/>
                            <label>Email</label>
                            <input name={'email'} value={aboutFormInputs.email} onChange={(e) => setAboutFormInputs({
                                ...aboutFormInputs,
                                [e.target.name]: e.target.value
                            })}/>
                            <label>Password</label>
                            <input name={'password'} value={aboutFormInputs.password} onChange={(e) => setAboutFormInputs({
                                ...aboutFormInputs,
                                [e.target.name]: e.target.value
                            })}/>
                            <label>Notes</label>
                            <input name={'notes'} value={aboutFormInputs.notes} onChange={(e) => setAboutFormInputs({
                                ...aboutFormInputs,
                                [e.target.name]: e.target.value
                            })}/>
                            <button>Submit</button>
                        </StyledAboutForm>
                        {/*
                            If this user component where to be common in a lot of places we would want to store it in the state
                            That can be done with for example useContext, or a library like Redux, Recoil
                            But if this is the only piece of state to keep track of then a library would be overkill
                         */}
                        <UserInfo firstName={aboutFormInputs.firstName} lastName={aboutFormInputs.lastName}
                                  notes={aboutFormInputs.notes} password={aboutFormInputs.password}/>
                    </div>
                )
            }
        </div>
    )
}
