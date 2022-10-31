import axios from 'axios'
import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

export class InputElm extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentWillReceiveProps() {
        // console.log('ss');
    }

    render() {
        // console.log(this.props);
        const { type, name, placeholder, errormessage, onChange, onBlur } = this.props
        return (
            <div>
                <input autoComplete='off' type={type} name={name} placeholder={placeholder} onChange={onChange} onBlur={onBlur} {...this.props} />
                <span>{errormessage}</span>
            </div>
        )
    }
}


export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.submit_btn = React.createRef()
        this.state = {
            formData: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                confirm_password: ''
            },
            messages: {
                first_name: 'must be More than 2 char.',
                last_name: 'must be More than 2 char.',
                email: 'Only gmail or yahoo with .co or .com',
                password: 'Minimum eight characters, at least one letter, one number and one special character',
                confirm_password: 'Must be matched'
            },
            errors: {},
            user: false,
            formState: "unchanged"
        }
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.handler, { capture: true });
    }

    componentDidUpdate(_, prevState) {
        [...document.querySelectorAll('[required]')].map(input => {
            if (this.state.formData[input.name] && !this.state.errors[input.name]) {
                this.submit_btn.current.disabled = false
            } else {
                this.submit_btn.current.disabled = true
            }
        })
    }

    isValueValid = (name, value, pattern) => {
        if (!RegExp(pattern).test(value)) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
            return false
        } else {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
            return true
        }
    }

    handleInputChange = (e) => {
        const { name, value, pattern } = e.target
        const isvalid = this.isValueValid(name, value, pattern)

        if (name === 'confirm_password' && this.state.formData.password !== value) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
        } else if (name === 'confirm_password' && this.state.formData.password === value) {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
        }
        if (name === 'password') {
            this.setState(state => {
                state.formData.confirm_password = ''
                return state
            })
        }

        console.log(this.state.formData);
        this.setState((state) => {
            state.formData[name] = value.trim()
            state.formState = 'modified'
            return state
        })

    }


    handleInputBlur = (e) => {
        const { name, value, pattern, required, ...arg } = e.target

        if (!value && required) {
            // console.log('null val');
            this.setState(state => {

                state.errors[name] = 'required field'
                return state
            })
            return false
        }
        console.log(name, this.state.formData.password === value);
        if (name === 'confirm_password' && this.state.formData.password !== value) {
            this.setState(state => {
                state.errors[name] = state.messages[name]
                return state
            })
        } else if (name === 'confirm_password' && this.state.formData.password === value) {
            this.setState(state => {
                state.errors[name] = null
                return state
            })
        }
    }

    handleFormSubmit = async (e) => {
        const { first_name, last_name, email, password } = this.state.formData
        try {
            const profiles = await (await axios.get('http://localhost:3001/profiles')).data
            const isUserExists = profiles.find(profile => profile.email = email)
            if (isUserExists) {
                this.setState(state => {
                    state.user = true
                    return state
                })
                throw new Error('User alredy existes.')
            }
            const res = await axios.post('http://localhost:3001/profiles', {
                first_name, last_name, email, password
            })
            localStorage.setItem('profile', JSON.stringify(res.data))
        }
        catch (err) {
            alert(err)
        }
    }

    handler = (e) => {
        e.preventDefault();
        return e.returnValue = "Are you sure you want to exit?";
        // console.log(e.returnValue);
        // if (window.confirm('Are you sure?')) {
        //     return e.returnValue = ''
        // }
        // return e.returnValue = ''
    };

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.handler, { capture: true });
    }

    render() {
        const { formData, errors, user } = this.state
        return (
            <>
                <div className='formWrapper'>
                    {user && (
                        <Navigate to="/signin" replace={true} />
                    )}
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        this.handleFormSubmit(e)
                    }}>
                        <InputElm
                            type={'text'}
                            name="first_name"
                            value={formData.first_name}
                            placeholder='First name'
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            errormessage={errors['first_name']}
                            pattern='(^.{2,})([A-Za-z])(?![^\n\r])'
                        />
                        <InputElm
                            type={'text'}
                            name="last_name"
                            value={formData.last_name}
                            placeholder='Last name'
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            errormessage={errors['last_name']}
                            pattern='(^.{2,})([A-Za-z])(?![^\n\r])'
                        />
                        <InputElm
                            type={'text'}
                            name="email"
                            value={formData.email}
                            placeholder='Email'
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            errormessage={errors['email']}
                            pattern='^[a-z0-9._]+(@gmail|@yahoo)\.([+co]{2}|[+com]{3})$'
                            required
                        />
                        <InputElm
                            type={'text'}
                            name="password"
                            value={formData.password}
                            placeholder='Password'
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            errormessage={errors['password']}
                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                            required
                        />
                        <InputElm
                            type={'text'}
                            value={formData.confirm_password}
                            name="confirm_password"
                            placeholder='Confirm Password'
                            onChange={this.handleInputChange}
                            onBlur={this.handleInputBlur}
                            errormessage={errors['confirm_password']}
                            pattern='^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
                            required
                        />
                        <button type='submit' ref={this.submit_btn} disabled>Submit</button>
                    </form>
                </div >
            </>
        )
    }
}

export default SignUp


// ✅ blur, ✅ chnageEvent,✅ RegEx,✅ DisableBTn



// signin, signup, home redirect, post per user, details post with comments, add comment

//