import { render } from "react-dom"
import { CreateUser } from "./CreateUser"
import { fireEvent, screen } from "@testing-library/dom"
import React from "react"

it('should render the form', () => {
    render(<CreateUser />, null)
    
    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()
})

it('should take input from input fields', () => {
    render(<CreateUser />, null)
    const form = document.querySelector("form")
    const nameInput = screen.getByTestId("nameInput")
    const passwordInput = screen.getByTestId("passwordInput")
    expect(nameInput).toHaveValue("")
    expect(passwordInput).toHaveValue("")
    
    fireEvent.change(nameInput, {target: {value: "Mathias Ratdal"}})
    fireEvent.change(passwordInput, {target: {value: "1234"}})
    expect(form).toHaveFormValues({
        nameInput: "Mathias Ratdal",
        passwordInput: "1234"
    })
})

it('should not take numbers as input', () => {
    render(<CreateUser />, null)
    const nameInput = screen.getByLabelText("nameInput")
    const passwordInput = screen.getByLabelText("passwordInput")

    fireEvent.change(nameInput, {target: {value: 1}})
    expect(nameInput).toHaveValue("")
    fireEvent.change(passwordInput, {target: {value: 2}})
    expect(passwordInput).toHaveValue("")
})

it('should update the user array', () => {
    const setUsers = jest.fn();
    jest.spyOn(React, 'useState')
        .mockImplementationOnce(users => [users, setUsers]);  
    render(<CreateUser />, null)
    const nameInput = screen.getByTestId("nameInput")
    const passwordInput = screen.getByTestId("passwordInput")
    expect(nameInput).toHaveValue("")
    expect(passwordInput).toHaveValue("")
    
    fireEvent.change(nameInput, {target: {value: "Mathias Ratdal"}})
    fireEvent.change(passwordInput, {target: {value: "1234"}})
    fireEvent.click(screen.getByText('Register'))
    
    // Endelig test til å sjekke state
})